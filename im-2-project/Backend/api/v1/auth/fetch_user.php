<?php
// Allow requests from your frontend running at localhost:5173 (React Vite dev server)
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// DB connection
include_once __DIR__ . '/../../config.php';

// Get user ID from query string
$id = $_GET['id'] ?? null;

if (!$id) {
    http_response_code(400);
    echo json_encode(['error' => 'User ID is required']);
    exit();
}

try {
    // FIX: Removed license_number from the SELECT list
    $stmt = $conn->prepare("
        SELECT 
            id, 
            email, 
            mobile, 
            address, 
            balance, 
            status, 
            profile_photo, 
            secondary_id_image, 
            license_image, 
            created_at, 
            verified_at, 
            first_name, 
            middle_name, 
            last_name, 
            date_of_birth
        FROM users 
        WHERE id = :id
    ");

    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();

    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        echo json_encode($user);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'User not found']);
    }

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
