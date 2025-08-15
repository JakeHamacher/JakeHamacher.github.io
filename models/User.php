<?php
require_once '../config/db.php';

class User {
    private $collection = 'integrity-loans.users';

    public function create($email, $password, $isAdmin = false) {
        $db = DB::getInstance()->getManager();
        $bulk = new MongoDB\Driver\BulkWrite;
        
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
        
        $document = [
            'email' => $email,
            'password' => $hashedPassword,
            'isAdmin' => $isAdmin,
            'createdAt' => new MongoDB\BSON\UTCDateTime()
        ];
        
        $bulk->insert($document);
        $db->executeBulkWrite($this->collection, $bulk);
        
        return $document;
    }

    public function findByEmail($email) {
        $db = DB::getInstance()->getManager();
        $filter = ['email' => $email];
        $query = new MongoDB\Driver\Query($filter);
        
        $cursor = $db->executeQuery($this->collection, $query);
        return current($cursor->toArray());
    }

    public function verifyPassword($user, $password) {
        return password_verify($password, $user->password);
    }
}
