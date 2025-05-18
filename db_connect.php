<?php
$servername = "localhost"; // Replace with your server name
$username = "dani"; // Replace with your MySQL username
$password = "123456"; // Replace with your MySQL password
$dbname = "blood_pressure_tracker"; // Replace with your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Set response content type to JSON(can be done here or in the individual API files )
header('Content-Type: application/json');
?>