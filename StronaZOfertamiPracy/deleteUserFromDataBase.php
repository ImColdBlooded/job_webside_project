<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

$conn = new mysqli('localhost', 'root', '', 'bazadanychpraca');

if ($conn->connect_error) {
    echo json_encode(array("error" => "Connection error"));
    exit();
} else {
    if (isset($_GET['user_id'])) {
        $userId = $_GET['user_id'];

        $deleteQuery = "DELETE FROM users WHERE user_id = $userId";
        $deleteResult = $conn->query($deleteQuery);

        if ($deleteResult) {
            echo json_encode(array("success" => "User deleted successfully"));
        } else {
            echo json_encode(array("error" => "Error deleting user", "sql_error" => $conn->error));
        }
    } else {
        echo json_encode(array("error" => "Missing user_id parameter"));
    }
}

$conn->close();

?>
