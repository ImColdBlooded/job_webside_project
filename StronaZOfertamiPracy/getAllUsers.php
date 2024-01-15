<?php

header('Access-Control-Allow-Origin: *');

$conn = new mysqli('localhost', 'root', '', 'bazadanychpraca');

if ($conn->connect_error) {
    echo json_encode(array("error" => "Connection error"));
    exit();
} else {
    $query = "SELECT * FROM users";

    $results = $conn->query($query);

    if ($results->num_rows > 0) {
        $usersData = array();

        while ($row = $results->fetch_assoc()) {
            $userData = array(
                'user_id' => $row['user_id'],
                'name' => $row['name'],
                'surname' => $row['surname'],
                'email' => $row['email'],
                'tel_number' => $row['tel_number'],
                'isAdmin' => $row['isAdmin'],
            );

            $usersData[] = $userData;
        }

        echo json_encode(array("success" => "Data retrieved successfully", "usersData" => $usersData));
        exit();
    } else {
        echo json_encode(array("error" => "No users found"));
    }
}

$conn->close();

?>
