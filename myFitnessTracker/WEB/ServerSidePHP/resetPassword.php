<?php

require_once('../../connectSQL.php');
session_start();

$json = file_get_contents("php://input");
$json = trim($json);
$email = json_decode($json);

$query = "SELECT * FROM users WHERE email ='$email';";

$response = @mysqli_query($dbc, $query);

if ($response->num_rows > 0){
    //correct
    require_once("forgot-password-recovery-mail.php");
}
else {
    echo "No account registered under that email. Please check that you have entered it correctly.";
}


?>