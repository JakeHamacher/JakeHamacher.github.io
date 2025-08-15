<?php
require __DIR__ . '/../vendor/autoload.php';

class DB {
    private static $instance = null;
    private $db;

    private function __construct() {
        try {
            $client = new MongoDB\Client(
                getenv('MONGODB_URI') ?: 'mongodb://localhost:27017',
                [
                    'connectTimeoutMS' => 3000,
                    'socketTimeoutMS' => 5000
                ]
            );
            $this->db = $client->selectDatabase('integrity-loans');
        } catch (Exception $e) {
            error_log('Database connection failed: ' . $e->getMessage());
            throw $e;
        }
    }

    public static function getInstance() {
        if (!self::$instance) {
            self::$instance = new DB();
        }
        return self::$instance;
    }

    public function getDB() {
        return $this->db;
    }
}
