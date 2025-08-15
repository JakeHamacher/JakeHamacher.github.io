<?php
require_once __DIR__ . '/../config/db.php';

class User {
    private $collection;

    public function __construct() {
        $db = DB::getInstance()->getDB();
        $this->collection = $db->users; // High-level collection object
    }

    public function create($email, $password, $isAdmin = false) {
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

        $document = [
            'email' => $email,
            'password' => $hashedPassword,
            'isAdmin' => $isAdmin,
            'createdAt' => new MongoDB\BSON\UTCDateTime()
        ];

        $this->collection->insertOne($document);
        return $document;
    }

    public function findByEmail($email) {
        return $this->collection->findOne(['email' => $email]);
    }

    public function verifyPassword($user, $password) {
        return password_verify($password, $user['password']);
    }
}
