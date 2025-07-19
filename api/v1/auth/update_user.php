<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once __DIR__ . '/../../config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$id = $_POST['id'] ?? null;
$mobile = $_POST['mobile'] ?? '';
$address = $_POST['address'] ?? '';

if (!$id) {
    http_response_code(400);
    echo json_encode(['error' => 'User ID is required']);
    exit;
}

$licenseImageName = null;
if (isset($_FILES['license_image'])) {
    $fileTmpPath = $_FILES['license_image']['tmp_name'];
    $fileName = basename($_FILES['license_image']['name']);
    $destination = __DIR__ . '/../../uploads/' . $fileName;

    if (move_uploaded_file($fileTmpPath, $destination)) {
        $licenseImageName = $fileName;
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to upload license image']);
        exit;
    }
}

try {
    if ($licenseImageName) {
        $stmt = $conn->prepare("UPDATE users SET mobile = :mobile, address = :address, license_image = :license_image WHERE id = :id");
        $stmt->bindParam(':license_image', $licenseImageName);
    } else {
        $stmt = $conn->prepare("UPDATE users SET mobile = :mobile, address = :address WHERE id = :id");
    }

    $stmt->bindParam(':mobile', $mobile);
    $stmt->bindParam(':address', $address);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);

    if ($stmt->execute()) {
        echo json_encode(['message' => 'User updated successfully']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to update user']);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
