<?php

//connect to MYSQL
require_once('../../connectSQL.php');

//include session
include('session.php');

//file for printing out errors
$myfile = fopen("changePassword.txt", "w");

$json = file_get_contents("php://input");
$json = trim($json);
$data = json_decode($json);



$opw = $data[0];
$npw = $data[1];

//query

$response = mysqli_query($dbc, "SELECT id FROM users WHERE id =".$_SESSION["user_id"]." AND password='$opw';");

if ($response->num_rows > 0){
    $updateQuery = 'UPDATE users SET';
    $updateQuery = $updateQuery . " password = '" . $npw . "' WHERE id = " .$_SESSION["user_id"]. ";"; 
    fwrite($myfile, $updateQuery);
    $result = mysqli_query($dbc, $updateQuery);
    echo "true";
}
else {
    echo $response;
}


?>