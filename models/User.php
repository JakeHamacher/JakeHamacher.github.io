<?php
require_once __DIR__ . '/../config/db.php';

class User {
    private $pdo;

    public function __construct() {
        $this->pdo = DB::getInstance()->getDB();
    }

    public function create($email, $password, $isAdmin = false) {
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
        $createdAt = date('Y-m-d H:i:s');
        
        $stmt = $this->pdo->prepare("INSERT INTO users (email, password, isAdmin, createdAt) VALUES (?, ?, ?, ?)");
        $stmt->execute([$email, $hashedPassword, $isAdmin ? 1 : 0, $createdAt]);
        
        return [
            'id' => $this->pdo->lastInsertId(),
            'email' => $email,
            'password' => $hashedPassword,
            'isAdmin' => $isAdmin,
            'createdAt' => $createdAt
        ];
    }

    public function findByEmail($email) {
        $stmt = $this->pdo->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch();
        
        if ($user) {
            return [
                'id' => $user['id'],
                'email' => $user['email'],
                'password' => $user['password'],
                'isAdmin' => (bool)$user['isAdmin'],
                'createdAt' => $user['createdAt']
            ];
        }
        return null;
    }

    public function verifyPassword($user, $password) {
        return password_verify($password, $user['password']);
    }
}
