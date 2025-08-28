<?php

class DB {
    private static $instance = null;
    private $pdo;

    private function __construct() {
        try {
            // Get environment variables or use defaults
            $host = getenv('MYSQL_HOST') ?: 'localhost';
            $dbname = getenv('MYSQL_DATABASE') ?: 'integrity-loans';
            $username = getenv('MYSQL_USERNAME') ?: 'root';
            $password = getenv('MYSQL_PASSWORD') ?: '';
            $port = getenv('MYSQL_PORT') ?: '3306';
            $charset = 'utf8mb4';
            
            $dsn = "mysql:host=$host;port=$port;dbname=$dbname;charset=$charset";
            $options = [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ];
            
            $this->pdo = new PDO($dsn, $username, $password, $options);
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
        return $this->pdo;
    }

    public function getPDO() {
        return $this->pdo;
    }
}
