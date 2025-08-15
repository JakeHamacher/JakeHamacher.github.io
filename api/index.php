<?php
require __DIR__ . '/../config/db.php';
require __DIR__ . '/../models/User.php';
require __DIR__ . '/../models/Video.php';

header('Content-Type: application/json');
session_start();

// Helper function to send JSON response
function jsonResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    echo json_encode($data);
    exit;
}

// Authentication Check Endpoint
if ($_SERVER['REQUEST_METHOD'] === 'GET' && $_SERVER['REQUEST_URI'] === '/api/auth/check') {
    $isAuthenticated = isset($_SESSION['user']);
    $isAdmin = $isAuthenticated && $_SESSION['user']['isAdmin'];
    
    jsonResponse([
        'isAuthenticated' => $isAuthenticated,
        'isAdmin' => $isAdmin
    ]);
}

// Login Endpoint
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_SERVER['REQUEST_URI'] === '/api/auth/login') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $userModel = new User();
    $user = $userModel->findByEmail($data['email']);
    
    if (!$user || !$userModel->verifyPassword($user, $data['password'])) {
        jsonResponse(['message' => 'Invalid credentials'], 401);
    }
    
    $_SESSION['user'] = [
        'id' => (string)$user['_id'],
        'email' => $user['email'],
        'isAdmin' => $user['isAdmin']
    ];
    
    jsonResponse(['success' => true]);
}

// Logout Endpoint
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_SERVER['REQUEST_URI'] === '/api/auth/logout') {
    session_destroy();
    jsonResponse(['success' => true]);
}

// Video Endpoints
$videoModel = new Video();

// Get All Videos
if ($_SERVER['REQUEST_METHOD'] === 'GET' && $_SERVER['REQUEST_URI'] === '/api/videos') {
    $videos = $videoModel->getAll();
    
    // Convert MongoDB objects to arrays
    $result = array_map(function($video) {
        return [
            '_id' => (string)$video['_id'],
            'title' => $video['title'],
            'description' => $video['description'],
            'youtubeId' => $video['youtubeId'],
            'createdAt' => $video['createdAt']->toDateTime()->format('Y-m-d H:i:s')
        ];
    }, $videos);
    
    jsonResponse($result);
}

// Create Video (Admin only)
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_SERVER['REQUEST_URI'] === '/api/videos') {
    if (!isset($_SESSION['user']) || !$_SESSION['user']['isAdmin']) {
        jsonResponse(['message' => 'Unauthorized'], 401);
    }
    
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (empty($data['title']) || empty($data['youtubeId'])) {
        jsonResponse(['message' => 'Title and YouTube ID are required'], 400);
    }
    
    $video = $videoModel->create(
        $data['title'],
        $data['youtubeId'],
        $data['description'] ?? ''
    );
    
    jsonResponse([
        '_id' => (string)$video['_id'],
        'title' => $video['title'],
        'description' => $video['description'],
        'youtubeId' => $video['youtubeId']
    ], 201);
}

// Delete Video (Admin only)
if ($_SERVER['REQUEST_METHOD'] === 'DELETE' && strpos($_SERVER['REQUEST_URI'], '/api/videos/') === 0) {
    if (!isset($_SESSION['user']) || !$_SESSION['user']['isAdmin']) {
        jsonResponse(['message' => 'Unauthorized'], 401);
    }
    
    $videoId = str_replace('/api/videos/', '', $_SERVER['REQUEST_URI']);
    
    try {
        $videoModel->delete($videoId);
        jsonResponse(['success' => true]);
    } catch (Exception $e) {
        jsonResponse(['message' => 'Error deleting video'], 500);
    }
}

// 404 for undefined routes
jsonResponse(['message' => 'Not Found'], 404);
