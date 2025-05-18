<?php
require 'db_connect.php';

if ($conn) {
    echo "Successfully connected to the database!";
} else {
    echo "Failed to connect to the database. Error: " . mysqli_connect_error();
}

$conn->close(); // Close the connection in the test script as well
?>