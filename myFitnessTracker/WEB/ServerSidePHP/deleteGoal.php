<?php
//connect to MYSQL
require_once('../../connectSQL.php');

//include session
include('session.php');

//convert json to PHP object
$json = file_get_contents("php://input");
$json = trim($json);
$data = json_decode($json);


//query
$result = mysqli_query($dbc, 'DELETE FROM goals where user_id = '. $_SESSION['user_id'].' AND row_id = '. $data .';');



//file for printing out errorsd
$myfile = fopen("createGoals.txt", "w");
fwrite($myfile, 'SELECT * FROM goals where user_id = '. $_SESSION['user_id'].';');

//adds data to array
$to_encode = array();
while ($row = mysqli_fetch_assoc($result)){
    $to_encode[] = $row;
}

echo json_encode($to_encode);

mysqli_close($dbc);
fclose($myfile);




?>