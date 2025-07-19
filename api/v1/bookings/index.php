<?php
header("Content-Type: application/json");
require_once '../../config.php';

$user_id = $_POST['user_id'] ?? null;
$car_id = $_POST['car_id'] ?? null;
$start_date = $_POST['start_date'] ?? null;
$end_date = $_POST['end_date'] ?? null;
$pickup_location = $_POST['pickup_location'] ?? 'main_branch';
$return_location = $_POST['return_location'] ?? 'main_branch';
$total_price = $_POST['total_price'] ?? 0.00;

$license_image = $_FILES['license_image'] ?? null;
$id_image = $_FILES['id_image'] ?? null;

if (!$user_id || !$car_id || !$start_date || !$end_date) {
  echo json_encode(['status' => 'error', 'message' => 'Missing fields']);
  exit;
}

try {
  $uploadPath = '../../uploads/documents/';
  if (!is_dir($uploadPath)) {
    mkdir($uploadPath, 0777, true);
  }

  $licensePath = null;
  $idPath = null;

  if ($license_image && $license_image['error'] === 0) {
    $licenseName = uniqid('license_') . '_' . basename($license_image['name']);
    $licensePath = 'uploads/documents/' . $licenseName;
    move_uploaded_file($license_image['tmp_name'], $uploadPath . $licenseName);

    // ✅ Update license image path in users table
    $stmt = $conn->prepare("UPDATE users SET license_image = ? WHERE id = ?");
    $stmt->execute([$licensePath, $user_id]);
  }

  if ($id_image && $id_image['error'] === 0) {
    $idName = uniqid('id_') . '_' . basename($id_image['name']);
    $idPath = 'uploads/documents/' . $idName;
    move_uploaded_file($id_image['tmp_name'], $uploadPath . $idName);
    // Optional: store in DB if you add a field for it
  }

  // Insert booking record
  $stmt = $conn->prepare("INSERT INTO bookings 
    (user_id, car_id, start_date, end_date, pickup_location, return_location, total_price)
    VALUES (?, ?, ?, ?, ?, ?, ?)");
    
  $stmt->execute([$user_id, $car_id, $start_date, $end_date, $pickup_location, $return_location, $total_price]);

  echo json_encode(['status' => 'success', 'message' => 'Booking created']);
} catch (PDOException $e) {
  echo json_encode(['status' => 'error', 'message' => 'DB error: ' . $e->getMessage()]);
}
