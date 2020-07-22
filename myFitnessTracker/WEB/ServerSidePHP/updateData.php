<?php

//connect to MYSQL
require_once('../../connectSQL.php');

//file for printing out errors
$myfile = fopen("updateData.txt", "w");
fwrite($myfile, mysqli_connect_error());

//base query
$updateQuery = 'UPDATE fitness SET';


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
//$newquery = $query . "VALUES ('" . $index->date . "', '" . $index->cardioType . "', " . $index->cardioDUR . ", '" . $index->liftingSplit . "', " . $index->liftingDUraiton . ", " . $index->liftingIntensity . ", " . $index->weight . ");";
fwrite($myfile, $json);
fwrite($myfile, $newupdateQuery);
$newupdateQuery = $updateQuery . " date = '" . $index->date . "', cardioType = '" . $index->cardioType . "', cardioDUR = " . $index->cardioDUR . ", liftingSplit = '" . $index->liftingSplit . "', liftingDUraiton = " . $index->liftingDUraiton . ", liftingIntensity = " . $index->liftingIntensity . ", weight = " . $index->weight . " ";
$newupdateQuery = $newupdateQuery . "WHERE fitness_ID = " . $index->fitness_ID . ";"; 
fwrite($myfile, $newupdateQuery);
$response = @mysqli_query($dbc, $newupdateQuery);


//close connection and file
fclose($myfile);
mysqli_close($dbc);



?>
