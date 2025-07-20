<?php
// CORS headers
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

// Collect input data
$user_id = $_POST['id'] ?? null;
$mobile = $_POST['mobile'] ?? '';
$license_number = $_POST['license_number'] ?? '';
$address = $_POST['address'] ?? '';

// Basic validation
if (!$user_id || !$mobile || !$address) {
    http_response_code(400);
    echo json_encode(['error' => 'Required fields are missing']);
    exit;
}

// Helper function to upload image
function uploadImage($fieldName) {
    if (isset($_FILES[$fieldName]) && $_FILES[$fieldName]['error'] === UPLOAD_ERR_OK) {
        $fileTmpPath = $_FILES[$fieldName]['tmp_name'];
        $originalName = $_FILES[$fieldName]['name'];
        $ext = pathinfo($originalName, PATHINFO_EXTENSION);
        $newFileName = uniqid($fieldName . "_") . '.' . $ext;
        $destination = __DIR__ . '/../../uploads/' . $newFileName;

        if (!is_dir(__DIR__ . '/../../uploads')) {
            mkdir(__DIR__ . '/../../uploads', 0755, true);
        }

        if (move_uploaded_file($fileTmpPath, $destination)) {
            return $newFileName;
        }
    }
    return null;
}

// Upload files
$profile_photo = uploadImage('profile_photo');
$license_image = uploadImage('license_image');
$secondary_id_image = uploadImage('secondary_id_image');

try {
    $stmt = $conn->prepare("
        INSERT INTO driver_verifications (
            user_id, mobile, license_number, address,
            profile_photo, license_image, secondary_id_image
        ) VALUES (
            :user_id, :mobile, :license_number, :address,
            :profile_photo, :license_image, :secondary_id_image
        )
    ");

    $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
    $stmt->bindParam(':mobile', $mobile);
    $stmt->bindParam(':license_number', $license_number);
    $stmt->bindParam(':address', $address);
    $stmt->bindParam(':profile_photo', $profile_photo);
    $stmt->bindParam(':license_image', $license_image);
    $stmt->bindParam(':secondary_id_image', $secondary_id_image);

    $stmt->execute();

    echo json_encode([
        'success' => true,
        'message' => 'Driver verification submitted successfully.'
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Database error: ' . $e->getMessage()
    ]);
}
