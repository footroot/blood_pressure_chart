<?php
require 'db_connect.php'; // Include the database connection

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT id, systolic, diastolic, pulse, timestamp, notes FROM blood_pressure_readings ORDER BY timestamp DESC";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $readings = [];
        while ($row = $result->fetch_assoc()) {
            $readings[] = $row;
        }
        echo json_encode($readings);
    } else {
        echo json_encode([]); // Return an empty array if no readings found
    }
} else {
    $response = ['success' => false, 'message' => 'Invalid request method'];
    echo json_encode($response);
}

$conn->close();
?>
