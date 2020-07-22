<?php

//connect to MYSQL
require_once('../../connectSQL.php');
include('session.php');

//file for printing out errors
$myfile = fopen("saveGoals.txt", "w");
//fwrite($myfile, mysqli_connect_error());

//base query
$updateQuery = 'UPDATE goals SET';


//validJson function
function isValidJSON($str) {
    json_decode($str);
    return json_last_error() == JSON_ERROR_NONE;
 }

//convert json to PHP object
$json = file_get_contents("php://input");
$json = trim($json);
$data = json_decode($json);



//make MYSQL query
$index = $data;//[i];
//$newquery = $query . "VALUES ('" . $index->date . "', '" . $index->cardioType . "', " . $index->cardioDUR . ", '" . $index->liftingSplit . "', " . $index->liftingDUraiton . ", " . $index->liftingIntensity . ", " . $index->weight . ");";

//fwrite($myfile, $newupdateQuery);
$newupdateQuery = $updateQuery . " goal = '" . $data[1];// . "', cardioType = '" . $index->cardioType . "', cardioDUR = " . $index->cardioDUR . ", liftingSplit = '" . $index->liftingSplit . "', liftingDUraiton = " . $index->liftingDUraiton . ", liftingIntensity = " . $index->liftingIntensity . ", weight = " . $index->weight . " ";
$newupdateQuery = $newupdateQuery . "' WHERE user_id = " . $_SESSION['user_id'] . " and row_id = " .$data[0] .";"; 
fwrite($myfile, $newupdateQuery);
$check = @mysqli_query($dbc, "SELECT * from goals WHERE user_id = " . $_SESSION['user_id'] . " and row_id = " .$data[0] .";");

if ($check->num_rows == 0){
    $query = "INSERT into goals(user_id, row_id, goal) VALUES (". $_SESSION['user_id'] . ", " .$data[0] . ", '" . $data[1] ."');";
    $response = @mysqli_query($dbc, $query);
    fwrite($myfile, $query);
}
else {
    $response = @mysqli_query($dbc, $newupdateQuery);
}

echo $response;
//close connection and file
fclose($myfile);
mysqli_close($dbc);










?>