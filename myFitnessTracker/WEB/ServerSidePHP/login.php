<?php 

//connect to MYSQL
require_once('../../connectSQL.php');
session_start();

//file for printing out errors
$myfile = fopen("login.txt", "w");


ini_set("allow_url_fopen", true);

$json = file_get_contents("php://input");
$json = trim($json);
$data = json_decode($json);



$username = $data[0];
$password = $data[1];

$newupdateQuery = "SELECT id FROM users WHERE email ='$username' AND password='$password';";

$response = @mysqli_query($dbc, $newupdateQuery);



if ($response->num_rows > 0){
    //session_register("username");
    //session_register("password");
    while ($row = mysqli_fetch_assoc($response)){
        $_SESSION['user_id'] = (int) $row['id'];
        fwrite($myfile, json_encode($row['id']));
        $_SESSION['loggedInUser'] = $username;
        $_SESSION['loggedIn'] = true;
        
        $_SESSION['loggedInPassword'] = $password;
        //header("Location: index.php");
    }
    echo "true";
}
else {
    echo mysqli_error($dbc);
}

fclose($myfile);
mysqli_close($dbc);

?>