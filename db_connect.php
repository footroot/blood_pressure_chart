<?php
$servername = "srv1755.hstgr.io"; // Replace with your server name
$username = "u148878710_footroot"; // Replace with your MySQL username
$password = "@Xativa2025"; // Replace with your MySQL password
$dbname = "u148878710_kine_members"; // Replace with your database name


// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Set response content type to JSON(can be done here or in the individual API files )
header('Content-Type: application/json');
?>