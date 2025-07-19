<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
require_once '../../config.php';

$user_id = $_GET['user_id'] ?? null;

if (!$user_id) {
  echo json_encode(['status' => 'error', 'message' => 'Missing user_id']);
  exit;
}

try {
  $stmt = $conn->prepare("
    SELECT 
      b.*, 
      c.name AS car_name, 
      c.make AS car_make, 
      c.year AS car_year, 
      c.image_path AS car_image_path,
      c.transmission,
      c.seats,
      c.description,
      c.price AS car_price
    FROM bookings b
    JOIN cars c ON b.car_id = c.id
    WHERE b.user_id = ?
    ORDER BY b.start_date DESC
  ");
  $stmt->execute([$user_id]);
  $bookings = $stmt->fetchAll(PDO::FETCH_ASSOC);

  echo json_encode(['status' => 'success', 'bookings' => $bookings]);
} catch (PDOException $e) {
  echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
