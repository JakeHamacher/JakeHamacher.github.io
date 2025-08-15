<?php
require_once '../config/db.php';

class Video {
    private $collection = 'integrity-loans.videos';

    public function create($title, $youtubeId, $description = '') {
        $db = DB::getInstance()->getManager();
        $bulk = new MongoDB\Driver\BulkWrite;
        
        $document = [
            'title' => $title,
            'description' => $description,
            'youtubeId' => $youtubeId,
            'createdAt' => new MongoDB\BSON\UTCDateTime()
        ];
        
        $bulk->insert($document);
        $db->executeBulkWrite($this->collection, $bulk);
        
        return $document;
    }

    public function getAll() {
        $db = DB::getInstance()->getManager();
        $query = new MongoDB\Driver\Query([]);
        
        $cursor = $db->executeQuery($this->collection, $query);
        return $cursor->toArray();
    }

    public function delete($id) {
        $db = DB::getInstance()->getManager();
        $bulk = new MongoDB\Driver\BulkWrite;
        
        $bulk->delete(['_id' => new MongoDB\BSON\ObjectId($id)]);
        $db->executeBulkWrite($this->collection, $bulk);
    }
}
