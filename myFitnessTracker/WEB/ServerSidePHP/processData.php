<?php

include('session.php');

//connect to MYSQL
require_once('../../connectSQL.php');

//file for printing out errors
$myfile = fopen("../newfile.txt", "w");
fwrite($myfile, mysqli_connect_error());

//base query
$query = 'INSERT INTO fitness (date, cardioType, cardioDUR, liftingSplit, liftingDUraiton, liftingIntensity, weight, user_id)';
$endquery = 'WHERE ';

$updateQuery = 'UPDATE fitness SET';
$newudpateQuery = $updateQuery . "date = '" . $index->date . "', cardioType = '" . $index->cardioType . "', cardioDUR = " . $index->cardioDur . ", liftingSplit = '" . $index->liftingSplit . "', liftingDUraiton = " . $index->liftingDuration . ", liftingIntensity = " . $index->liftingIntensity . ", weight = " . $index->weight . ", user_id= ". $_SESSION['user_id'] . ")";
$newudpateQuery = $newudpateQuery . "WHERE fitness_ID = " . 'a';

//validJson function
function isValidJSON($str) {
    json_decode($str);
    return json_last_error() == JSON_ERROR_NONE;
 }

//convert json to PHP object
$json = file_get_contents("php://input");
$json = trim($json);
//$json = '{"date":"2020-05-11","cardioType":"Bike","cardioDur":"80","liftingSplit":"Chest/Shoulders","liftingDuration":"50","liftingIntensity":"3","weight":"165"}';
$data = json_decode($json);

//make MYSQL query
$index = $data;//[i];
$newquery = $query . "VALUES ('" . $index->date . "', '" . $index->cardioType . "', " . $index->cardioDUR . ", '" . $index->liftingSplit . "', " . $index->liftingDUraiton . ", " . $index->liftingIntensity . ", " . $index->weight . ", " . $_SESSION['user_id'] . ");";
$response = @mysqli_query($dbc, $newquery);
fwrite($myfile, $newquery);

//close connection and file
fclose($myfile);
mysqli_close($dbc);



?>
