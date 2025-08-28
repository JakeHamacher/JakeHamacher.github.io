<?php
require_once 'config/db.php';
require_once 'models/User.php';
require_once 'models/Video.php';

try {
    // Test database connection
    $pdo = DB::getInstance()->getPDO();
    echo "Database connection successful!<br>";
    
    // Test User table creation
    $userModel = new User();
    echo "User table ready!<br>";
    
    // Test Video table creation
    $videoModel = new Video();
    echo "Video table ready!<br>";
    
    echo "All setup complete!<br>";
    
    // Optionally create a default admin user
    $userModel = new User();
    $adminEmail = 'justin@integrityfirsthomeloans.com';
    $adminPassword = 'Justin.IFHL.2025pw';
    
    // Check if admin exists
    $existingAdmin = $userModel->findByEmail($adminEmail);
    if (!$existingAdmin) {
        $userModel->create($adminEmail, $adminPassword, true);
        echo "Default admin user created!<br>";
        echo "Email: $adminEmail<br>";
        echo "Password: $adminPassword<br>";
    } else {
        echo "Admin user already exists!<br>";
    }
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
