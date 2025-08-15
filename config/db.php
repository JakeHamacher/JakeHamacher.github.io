<?php
require 'vendor/autoload.php';

class DB {
    private static $instance = null;
    private $manager;

    private function __construct() {
        $this->manager = new MongoDB\Driver\Manager(
            getenv('MONGODB_URI') ?: 'mongodb://localhost:27017/integrity-loans'
        );
    }

    public static function getInstance() {
        if (!self::$instance) {
            self::$instance = new DB();
        }
        return self::$instance;
    }

    public function getManager() {
        return $this->manager;
    }
}
