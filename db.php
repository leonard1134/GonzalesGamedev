<?php
$servername = "localhost";
$username = "root";  // Default user in XAMPP
$password = "";      // Default password in XAMPP is empty
$dbname = "notes_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>