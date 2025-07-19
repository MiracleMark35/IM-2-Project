<?php
// CORS Headers
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header('Content-Type: application/json; charset=UTF-8');

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once __DIR__ . '/../../config.php';

// Set PDO error mode to exception (if not already set in config)
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

// Validate input
$required = ['firstName', 'lastName', 'email', 'password', 'dateOfBirth'];
foreach ($required as $field) {
    if (empty($data[$field])) {
        http_response_code(400);
        echo json_encode(['error' => "$field is required"]);
        exit;
    }
}

try {
    // Check if email exists
    $stmt = $conn->prepare("SELECT id FROM users WHERE email = :email");
    $stmt->bindParam(':email', $data['email']);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        http_response_code(409);
        echo json_encode(['error' => 'Email already exists']);
        exit;
    }

    // Use raw password (no hashing)
    $rawPassword = $data['password'];

    // Prepare insert statement
    $stmt = $conn->prepare("INSERT INTO users 
        (first_name, middle_name, last_name, email, password, date_of_birth, status, created_at) 
        VALUES (:firstName, :middleName, :lastName, :email, :password, :dateOfBirth, 'unverified', NOW())");

    // Bind parameters
    $stmt->bindParam(':firstName', $data['firstName']);

    // Middle name can be null or empty string, normalize it:
    $middleName = isset($data['middleName']) && trim($data['middleName']) !== '' ? $data['middleName'] : null;
    $stmt->bindParam(':middleName', $middleName);

    $stmt->bindParam(':lastName', $data['lastName']);
    $stmt->bindParam(':email', $data['email']);
    $stmt->bindParam(':password', $rawPassword);
    $stmt->bindParam(':dateOfBirth', $data['dateOfBirth']);

    $stmt->execute();

    $userId = $conn->lastInsertId();

    http_response_code(201);
    echo json_encode([
        'success' => true,
        'message' => 'User registered successfully',
        'user_id' => $userId
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>
