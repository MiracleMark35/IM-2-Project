<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once __DIR__ . '/../../config.php';

$id = $_POST['id'];
$uploadDir = __DIR__ . '/../../uploads/';
$profileFilename = '';

if (!empty($_FILES['profile_photo']['tmp_name'])) {
    $profileFilename = uniqid() . '_' . basename($_FILES['profile_photo']['name']);
    $targetPath = $uploadDir . $profileFilename;
    move_uploaded_file($_FILES['profile_photo']['tmp_name'], $targetPath);
}

try {
    $stmt = $conn->prepare("UPDATE users SET profile_photo = :photo WHERE id = :id");
    $stmt->bindParam(':photo', $profileFilename); // ✅ Only filename
    $stmt->bindParam(':id', $id);
    $stmt->execute();

    echo json_encode(['message' => 'Profile photo updated', 'photo' => $profileFilename]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>
