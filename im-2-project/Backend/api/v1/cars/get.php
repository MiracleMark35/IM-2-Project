<?php
include_once '../../../config.php';

try {
    // Get query parameters
    $type = isset($_GET['type']) ? $_GET['type'] : null;
    $minPrice = isset($_GET['min_price']) ? (float)$_GET['min_price'] : null;
    $maxPrice = isset($_GET['max_price']) ? (float)$_GET['max_price'] : null;
    
    // Base query
    $query = "SELECT * FROM cars WHERE 1=1";
    $params = [];
    
    // Add filters
    if ($type) {
        $query .= " AND type = :type";
        $params[':type'] = $type;
    }
    if ($minPrice) {
        $query .= " AND price >= :min_price";
        $params[':min_price'] = $minPrice;
    }
    if ($maxPrice) {
        $query .= " AND price <= :max_price";
        $params[':max_price'] = $maxPrice;
    }
    
    $stmt = $conn->prepare($query);
    
    // Bind parameters
    foreach ($params as $key => $value) {
        $stmt->bindValue($key, $value);
    }
    
    $stmt->execute();
    $cars = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Add image URLs
    foreach ($cars as &$car) {
        if ($car['image_path']) {
            $car['image_url'] = "http://localhost/car-rental-api/uploads/cars/" . $car['image_path'];
        }
    }
    
    echo json_encode([
        'success' => true,
        'data' => $cars,
        'count' => count($cars)
    ]);
    
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>