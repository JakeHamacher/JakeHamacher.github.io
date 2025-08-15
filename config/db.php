<?php
require __DIR__ . '/../vendor/autoload.php';

class DB {
    private static $instance = null;
    private $db;

    private function __construct() {
        $client = new MongoDB\Client(
            getenv('MONGODB_URI') ?: 'mongodb://localhost:27017'
        );
        $this->db = $client->selectDatabase('integrity-loans'); // DB name
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
