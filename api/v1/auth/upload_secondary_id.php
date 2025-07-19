<?php
// Allow from frontend
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// DB connection
include_once __DIR__ . '/../../config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$id = $_POST['id'] ?? null;

if (!$id || !isset($_FILES['secondary_id_image'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing ID or image']);
    exit;
}

$image = $_FILES['secondary_id_image'];
$ext = pathinfo($image['name'], PATHINFO_EXTENSION);
$filename = 'secondary_' . time() . '_' . uniqid() . '.' . $ext;
$uploadPath = __DIR__ . '/../../uploads/' . $filename;

if (move_uploaded_file($image['tmp_name'], $uploadPath)) {
    $stmt = $conn->prepare("UPDATE users SET secondary_id_image = :img WHERE id = :id");
    $stmt->execute([':img' => $filename, ':id' => $id]);
    echo json_encode(['message' => 'Secondary ID uploaded successfully', 'filename' => $filename]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to upload image']);
}
?>
