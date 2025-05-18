<?php
require 'db_connect.php'; // Include the database connection

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $systolic = $_POST['systolic'] ?? null;
    $diastolic = $_POST['diastolic'] ?? null;
    $pulse = $_POST['pulse'] ?? null;
    $notes = $_POST['notes'] ?? '';

    if ($systolic !== null && $diastolic !== null && is_numeric($systolic) && is_numeric($diastolic)) {
        $sql = "INSERT INTO blood_pressure_readings (systolic, diastolic, pulse, notes) VALUES (?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("iiis", $systolic, $diastolic, $pulse, $notes);
        if ($stmt->execute()) {
            $response = ['success' => true, 'message' => 'Reading added successfully'];
            echo json_encode($response);
        } else {
            $response = ['success' => false, 'message' => 'Error adding reading: ' . $conn->error];
            echo json_encode($response);
        }

        $stmt->close();
    } else {
        $response = ['success' => false, 'message' => 'Systolic and diastolic readings are required and must be numeric.'];
        echo json_encode($response);
    }
} else {
    $response = ['success' => false, 'message' => 'Invalid request method'];
    echo json_encode($response);
}

$conn->close();
?>