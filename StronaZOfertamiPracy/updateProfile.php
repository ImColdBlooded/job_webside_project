<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

$conn = new mysqli('localhost', 'root', '', 'bazadanychpraca');

if($conn->connect_error){
    echo json_encode(array("error" => "Connection error"));
    exit();
}else{
    $user_id = $_GET['user_id'];
    $name = mysqli_real_escape_string($conn, $_POST['name']);
    $surname = mysqli_real_escape_string($conn, $_POST['surname']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $birth_date = mysqli_real_escape_string($conn, $_POST['birth_date']);
    $phone = mysqli_real_escape_string($conn, $_POST['phone']);
    $country = mysqli_real_escape_string($conn, $_POST['country']);
    $position = mysqli_real_escape_string($conn, $_POST['position']);
    $positionDescr = mysqli_real_escape_string($conn, $_POST['positionDescr']);
    $career_summary = mysqli_real_escape_string($conn, $_POST['career_summary']);

    $workExperienceList = json_decode($_POST['workExperienceList'], true);
    $educationList = json_decode($_POST['educationList'], true);
    $languageList = json_decode($_POST['languageList'], true);
    $skillsList = json_decode($_POST['skillsList'], true);
    var_dump($workExperienceList);

    $courseList = json_decode($_POST['courseList'], true);
    $linkList = json_decode($_POST['linkList'], true);

    $query = "UPDATE users SET 
    name='$name', 
    surname='$surname', 
    birth_date='$birth_date', 
    email='$email', 
    tel_number='$phone', 
    prof_image=NULL, 
    curr_position='$position', 
    curr_position_description='$positionDescr',
    career_summary='$career_summary'
    WHERE user_id=$user_id";

    if($conn->query($query)){
        echo json_encode(array("success" => 'User updated successfully'));
    }else{
        echo json_encode(array("error" => 'User update error: ' . $conn->error));
    }
    
    // skills
    foreach ($skillsList as $skill) {
        /*$checkSkillQuery = "SELECT skills_id FROM skills WHERE skill_name = '$skill'";
        $result = $conn->query($checkSkillQuery);
    
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $skills_id = $row['skills_id'];
        } else {
            $insertSkillQuery = "INSERT INTO skills (skill_name) VALUES ('$skill')";
            $conn->query($insertSkillQuery);
    
            $skills_id = $conn->insert_id;
        }

        $insertUserSkillQuery = "INSERT INTO user_skills (user_id, skills_id) VALUES ($user_id, $skills_id)";
        $conn->query($insertUserSkillQuery);*/
    }

    
}
?>
