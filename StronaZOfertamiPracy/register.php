<?php

header('Access-Control-Allow-Origin: *');
    
$conn = new mysqli('localhost', 'root', '', 'bazadanychpraca');

if ($conn->connect_error) {
    echo json_encode(array("error" => "Connection error"));
    exit();
} else {
    $name = $_POST['name'];
    $surname = $_POST['surname'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    $queryAll = "SELECT * FROM users WHERE email = '$email'";

    $resultsAll = $conn->query($queryAll);

    if ($resultsAll->num_rows >= 1) {
        echo json_encode(array("errorExistReg" => "User already exists"));
    } else {
        $password_hash = password_hash($password, PASSWORD_DEFAULT);

        $query = "INSERT INTO `users` (`user_id`, `name`, `surname`, `birth_date`, `email`, `tel_number`, `curr_position`, `curr_position_description`, `career_summary`, `password_hash`) 
        VALUES (NULL, '$name', '$surname', NULL, '$email', NULL, NULL, NULL, NULL,'$password_hash')";

        if ($conn->query($query)) {
            echo json_encode(array("successReg" => "User registered successfully"));
        } else {
            echo json_encode(array("error" => "Registration error"));
        }
    }
    $conn->close();
}

?>
