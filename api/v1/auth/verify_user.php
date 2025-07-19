<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once __DIR__ . '/../../config.php';

$id = $_POST['id'];
$mobile = $_POST['mobile'];
$license_number = $_POST['license_number'];
$address = $_POST['address'];

$uploadDir = "../../uploads/";
$profilePath = '';
$licensePath = '';

if (!file_exists($uploadDir)) mkdir($uploadDir, 0777, true);

// Save profile photo
if (!empty($_FILES['profile_photo']['tmp_name'])) {
    $profilePath = 'uploads/' . uniqid() . '_' . $_FILES['profile_photo']['name'];
    move_uploaded_file($_FILES['profile_photo']['tmp_name'], "../../" . $profilePath);
}

// Save license image
if (!empty($_FILES['license_image']['tmp_name'])) {
    $licensePath = 'uploads/' . uniqid() . '_' . $_FILES['license_image']['name'];
    move_uploaded_file($_FILES['license_image']['tmp_name'], "../../" . $licensePath);
}

try {
    $stmt = $conn->prepare("UPDATE users SET 
        mobile = :mobile, 
        license_number = :license_number, 
        address = :address,
        status = 'verified',
        license_image = :license_image
        WHERE id = :id");

    $stmt->bindParam(':mobile', $mobile);
    $stmt->bindParam(':license_number', $license_number);
    $stmt->bindParam(':address', $address);
    $stmt->bindParam(':license_image', $licensePath);
    $stmt->bindParam(':id', $id);

    $stmt->execute();
    echo json_encode(['message' => 'Verification submitted successfully']);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
