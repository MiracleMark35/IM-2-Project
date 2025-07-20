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

// Include database connection config
include_once __DIR__ . '/../../config.php';

// Get user ID from query string
$userId = $_GET['user_id'] ?? null;

if (!$userId) {
    http_response_code(400);
    echo json_encode(['error' => 'User ID is required']);
    exit();
}

try {
    // Fetch driver verification application data from driver_verifications table
    $stmt = $conn->prepare("
        SELECT 
            user_id,
            license_number,
            license_image,
            secondary_id_image,
            profile_photo,
            mobile,
            address,
            created_at,
            status
        FROM driver_verifications
        WHERE user_id = :user_id
    ");

    $stmt->bindParam(':user_id', $userId, PDO::PARAM_INT);
    $stmt->execute();

    $verification = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($verification) {
        echo json_encode($verification);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'No pending verification found']);
    }

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
