<?php

header('Access-Control-Allow-Origin: *'); //zasób dostępny dla dowolnej domeny
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE'); //określenie dostępnych metod http 
header('Access-Control-Allow-Headers: Content-Type'); //zezwolenie na warunek Content-Type aby była możliwość używania POST i PUT do przesułania danych

$conn = new mysqli('localhost', 'root', '', 'bazadanychpraca');

if ($conn->connect_error) {
    echo json_encode(array("error" => "Connection error"));
    exit();
} else {
    if (isset($_GET['user_id']) && isset($_GET['isAdmin'])) {
        $userId = $_GET['user_id'];
        $isAdmin = $_GET['isAdmin'];

        $updateQuery = "UPDATE users SET isAdmin = $isAdmin WHERE user_id = $userId";
        $updateResult = $conn->query($updateQuery);

        if ($updateResult) {
            echo json_encode(array("success" => "Admin permission updated successfully"));
        } else {
            echo json_encode(array("error" => "Error updating admin permission", "sql_error" => $conn->error));
        }
    } else {
        echo json_encode(array("error" => "Missing user_id or isAdmin parameter"));
    }
}

$conn->close();

?>
