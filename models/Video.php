<?php
require_once __DIR__ . '/../config/db.php';

class Video {
    private $pdo;

    public function __construct() {
        $this->pdo = DB::getInstance()->getDB();
    }

    public function create($title, $youtubeId, $description = '') {
        $createdAt = date('Y-m-d H:i:s');
        
        $stmt = $this->pdo->prepare("INSERT INTO videos (title, youtubeId, description, createdAt) VALUES (?, ?, ?, ?)");
        $stmt->execute([$title, $youtubeId, $description, $createdAt]);
        
        return [
            'id' => $this->pdo->lastInsertId(),
            'title' => $title,
            'youtubeId' => $youtubeId,
            'description' => $description,
            'createdAt' => $createdAt
        ];
    }

    public function getAll() {
        try {
            $stmt = $this->pdo->query("SELECT * FROM videos ORDER BY createdAt DESC");
            $videos = $stmt->fetchAll();
            return $videos ?: [];
        } catch (Exception $e) {
            error_log('Error fetching videos: ' . $e->getMessage());
            return [];
        }
    }

    public function delete($id) {
        try {
            $stmt = $this->pdo->prepare("DELETE FROM videos WHERE id = ?");
            $stmt->execute([$id]);
            return $stmt->rowCount() > 0;
        } catch (Exception $e) {
            error_log('Error deleting video: ' . $e->getMessage());
            return false;
        }
    }
}
