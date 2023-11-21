<?php

    header('Access-Control-Allow-Origin: *');
    
    $conn = new mysqli('localhost','root','','bazadanychpraca');

    if($conn->connect_error){
        echo "wystapil blad".$conn->connect_error;
        echo "kod bledu".$conn->connect_errno;
        exit();
    }
    else
    {
        $name = $_POST['name'];
        $surname = $_POST['surname'];
        $email = $_POST['email'];
        $password = $_POST['password'];
    
        $password_hash = password_hash($password, PASSWORD_DEFAULT);
        
        $query = "INSERT INTO `users` (`user_id`, `name`, `surname`, `birth_date`, `email`, `tel_number`, `residence_place`, `curr_position`, `curr_position_description`, `career_summary`, `work_experience`, `education`, `language_skills`, `skills`, `courses`, `password_hash`, `links`) 
        VALUES (NULL, '$name', '$surname', NULL, '$email', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '$password_hash', NULL)";

    
        $conn->query($query);
    }

    $conn->close();
?>