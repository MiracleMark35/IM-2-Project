<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

include_once __DIR__ . '/../../config.php';

try {
    $stmt = $conn->query("
        SELECT dv.*, u.first_name, u.last_name 
        FROM driver_verifications dv
        JOIN users u ON dv.user_id = u.id
        WHERE dv.status IS NULL OR dv.status = 'pending'
        ORDER BY dv.id DESC
    ");

    $verifications = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($verifications);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
