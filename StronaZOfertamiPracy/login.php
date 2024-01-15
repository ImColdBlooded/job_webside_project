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
                'user_id' => $row['user_id'],
                'name' => $row['name'],
                'surname' => $row['surname'],
                'birth_date' => $row['birth_date'],
                'email' => $row['email'],
                'tel_number' => $row['tel_number'],
                'prof_image' => $row['prof_image'],
                'residence_place' => $row['residence_place'],
                'curr_position' => $row['curr_position'],
                'curr_position_description' => $row['curr_position_description'],
                'career_summary' => $row['career_summary'],
                'work_experience' => $row['work_experience'],
                'education' => $row['education'],
                'language_skills' => $row['language_skills'],
                'skills' => $row['skills'],
                'courses' => $row['courses'],
                'links' => $row['links'],
                'isAdmin' => $row['isAdmin'],
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
