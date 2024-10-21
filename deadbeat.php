<?php 
error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'db.php';
header('Content-Type: application/json');

// Admin credentials
$valid_admin_username = 'admin';
$valid_admin_password = 'password123';

// Add a new deadbeat
if (isset($_POST['add_deadbeat'])) {
    $name = filter_input(INPUT_POST, 'name', FILTER_DEFAULT);
    $children = filter_input(INPUT_POST, 'children', FILTER_VALIDATE_INT);
    $image = filter_input(INPUT_POST, 'image', FILTER_DEFAULT);

    if ($name && $children !== false && $image) {
        $stmt = $pdo->prepare("INSERT INTO deadbeat_dads (name, children, image) VALUES (?, ?, ?)");
        if ($stmt->execute([$name, $children, $image])) {
            echo json_encode(['message' => 'Deadbeat added successfully']);
        } else {
            echo json_encode(['error' => 'Failed to add deadbeat']);
        }
    } else {
        echo json_encode(['error' => 'Invalid input']);
    }
}

// Remove a deadbeat (with admin authentication)
if (isset($_POST['remove_deadbeat'])) {
    $id = filter_input(INPUT_POST, 'id', FILTER_VALIDATE_INT);
    $admin_username = $_POST['admin_username'];
    $admin_password = $_POST['admin_password'];

    // Check admin credentials
    if ($admin_username === $valid_admin_username && $admin_password === $valid_admin_password) {
        if ($id) {
            // Perform the delete operation
            $stmt = $pdo->prepare("DELETE FROM deadbeat_dads WHERE id = ?");
            if ($stmt->execute([$id])) {
                echo json_encode(['success' => true, 'message' => 'Deadbeat removed successfully']);
            } else {
                echo json_encode(['error' => 'Failed to remove deadbeat']);
            }
        } else {
            echo json_encode(['error' => 'Invalid ID']);
        }
    } else {
        // Invalid admin credentials
        echo json_encode(['error' => 'Invalid admin credentials']);
    }
}

// Get all deadbeats
if (isset($_GET['get_deadbeats'])) {
    $stmt = $pdo->query("SELECT * FROM deadbeat_dads");
    $deadbeats = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($deadbeats);
}
?>
