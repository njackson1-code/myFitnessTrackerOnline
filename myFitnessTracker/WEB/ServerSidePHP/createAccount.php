<?php


$query = "INSERT into users(firstname, middleinitial, lastname, email, password) VALUES (";


//connect to MYSQL
require_once('../../connectSQL.php');
session_start();

//file for printing out errors
$myfile = fopen("login.txt", "w");




$json = file_get_contents("php://input");
$json = trim($json);
$data = json_decode($json);



$fname = $data[0];
$lname = $data[1];
$uname = $data[2];
$pw = $data[3];


$newupdateQuery = $query."'$fname', 'D', '$lname', '$uname', '$pw');";

$response = @mysqli_query($dbc, $newupdateQuery);

fwrite($myfile, $json);

if ($response){
    //session_register("username");
    //session_register("password");
    $_SESSION['user_id'] = @mysqli_query($dbc, "SELECT * FROM users")->num_rows;
    $_SESSION['loggedInUser'] = $uname;
    $_SESSION['loggedIn'] = true;
    $_SESSION['loggedInPassword'] = $pw;
    //header("Location: index.php");
    echo "true";
}
else {
    echo "false";
}

fclose($myfile);
mysqli_close($dbc);


?>