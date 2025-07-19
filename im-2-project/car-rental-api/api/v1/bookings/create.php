<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../objects/booking.php';

$database = new Database();
$db = $database->getConnection();

$booking = new Booking($db);

// Get posted data
$data = $_POST;
$files = $_FILES;

// Validate required fields
$required = ['user_id', 'car_id', 'start_date', 'end_date'];
foreach ($required as $field) {
    if (empty($data[$field])) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Missing required field: $field"]);
        exit;
    }
}

// Handle file uploads
$uploadDir = '../uploads/';
$licenseImagePath = '';
$idImagePath = '';

try {
    // Upload license image
    if (!empty($files['license_image'])) {
        $licenseExt = pathinfo($files['license_image']['name'], PATHINFO_EXTENSION);
        $licenseFileName = 'license_' . $data['user_id'] . '_' . time() . '.' . $licenseExt;
        $licenseImagePath = $uploadDir . $licenseFileName;
        move_uploaded_file($files['license_image']['tmp_name'], $licenseImagePath);
    }

    // Upload ID image
    if (!empty($files['id_image'])) {
        $idExt = pathinfo($files['id_image']['name'], PATHINFO_EXTENSION);
        $idFileName = 'id_' . $data['user_id'] . '_' . time() . '.' . $idExt;
        $idImagePath = $uploadDir . $idFileName;
        move_uploaded_file($files['id_image']['tmp_name'], $idImagePath);
    }

    // Set booking properties
    $booking->user_id = $data['user_id'];
    $booking->car_id = $data['car_id'];
    $booking->start_date = $data['start_date'];
    $booking->end_date = $data['end_date'];
    $booking->pickup_location = $data['pickup_location'] ?? 'main_branch';
    $booking->return_location = $data['return_location'] ?? 'main_branch';
    $booking->total_price = $data['total_price'] ?? 0;
    $booking->license_image_path = $licenseImagePath;
    $booking->id_image_path = $idImagePath;
    $booking->booking_status = 'pending';

    // Create the booking
    if ($booking->create()) {
        http_response_code(201);
        echo json_encode([
            "status" => "success",
            "message" => "Booking was created.",
            "booking_id" => $booking->id
        ]);
    } else {
        http_response_code(503);
        echo json_encode(["status" => "error", "message" => "Unable to create booking."]);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>