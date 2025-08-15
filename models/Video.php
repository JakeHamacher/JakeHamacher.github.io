<?php
require_once __DIR__ . '/../config/db.php';

class Video {
    private $collection;

    public function __construct() {
        $db = DB::getInstance()->getDB();
        $this->collection = $db->videos; // High-level collection object
    }

    public function create($title, $youtubeId, $description = '') {
        $document = [
            'title' => $title,
            'description' => $description,
            'youtubeId' => $youtubeId,
            'createdAt' => new MongoDB\BSON\UTCDateTime()
        ];

        $this->collection->insertOne($document);
        return $document;
    }

    public function getAll() {
        return $this->collection->find()->toArray();
    }

    public function delete($id) {
        $this->collection->deleteOne(['_id' => new MongoDB\BSON\ObjectId($id)]);
    }
}
