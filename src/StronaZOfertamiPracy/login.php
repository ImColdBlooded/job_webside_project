<?php

header('Access-Control-Allow-Origin: *');
    
$conn = new mysqli('localhost', 'root', '', 'bazadanychpraca');

if ($conn->connect_error) {
    echo json_encode(array("error" => "Connection error"));
    exit();
} else {
    $email = $_POST['email'];
    $password = $_POST['password'];

    $query = "SELECT * FROM users WHERE email = '$email'";

    $results = $conn->query($query);

    if ($results->num_rows > 0) {
        $row = $results->fetch_assoc();

        $hashedPassword = $row['password_hash'];

        if (password_verify($password, $hashedPassword)) {
            echo json_encode(array("successLog" => "Login successful", "userData" => array(
                "imie" => $row['name'],
                "email" => $row['email']
            )));
            exit();
        } else {
            echo json_encode(array("errorPassLog" => "Login denied. Incorrect password"));
            exit();
        }
    } else {
        echo json_encode(array("errorUserLog" => "User not found"));
    }
}

$conn->close();

?>
