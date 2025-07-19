<?php
// Allow CORS for development
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    exit(0);
}
//pls canle
require_once '../../config.php';

// Get JSON body
$data = json_decode(file_get_contents("php://input"), true);
$booking_id = $data['booking_id'] ?? null;

if (!$booking_id) {
  echo json_encode(['status' => 'error', 'message' => 'Missing booking_id']);
  exit;
}

try {
  $stmt = $conn->prepare("UPDATE bookings SET booking_status = 'cancelled' WHERE id = ?");
  $stmt->execute([$booking_id]);

  echo json_encode(['status' => 'success', 'message' => 'Booking cancelled']);
} catch (PDOException $e) {
  echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>
