<?php
require_once('../../connectSQL.php');
include('session.php');
$myfile = fopen("graphicData.txt", "w");



//fwrite($myfile, $_SESSION['user_id']);


$query = 'SELECT  cardioDUR, liftingDUraiton, weight FROM fitness WHERE user_id ='.$_SESSION['user_id'].';';

$response = @mysqli_query($dbc, $query);


//file for printing out errors


$avgCardio = 0;
$avgLifting = 0;
$avgWeight = 0;
$lastWeight = 0;
$weightChange = '0';

$numCardio = 0;
$numLifting = 0;
$numWeight = 0;

//loop over rows




while ($row = mysqli_fetch_assoc($response)){
   
   
    if ($row['cardioDUR'] != null && $row['cardioDUR'] != '0'){
  
        $avgCardio = $avgCardio + (int) $row['cardioDUR'];
        $numCardio = $numCardio + 1;
    }

    if ($row['liftingDUraiton'] != null && $row['liftingDUraiton'] != '0'){
       
        $avgLifting = $avgLifting + (int) $row['liftingDUraiton'];
        $numLifting = $numLifting + 1;
    }

    if ($row['weight'] != null && $row['weight'] != '0' && $row['weight'] != '1'){
        
        $avgWeight = $avgWeight + (int) $row['weight'];
        $numWeight = $numWeight + 1;
        $lastWeight = (int) $row['weight'];
    }
}



if ($numLifting == 0){
    $avgLifting = 0;
}
else {
    $avgLifting = $avgLifting/$numLifting;
}

if ($numCardio == 0){
    $avgCardio = 0;
}
else {
    $avgCardio = $avgCardio/$numCardio;
}

if ($numWeight == 0){
    $avgWeight = 0;
}
else {
    $avgWeight = $avgWeight/$numWeight;
}






if ($lastWeight > $avgWeight){
    $weightChange = '1';
}
else if ($lastWeight < $avgWeight){
    
    $weightChange = '-1';
}

fwrite($myfile, $lastWeight);
fwrite($myfile, $avgWeight);
fwrite($myfile, $avgLifting);
fwrite($myfile, $avgCardio);






$result = new stdClass();
$result->avgLifting = $avgLifting;
$result->avgCardio = $avgCardio;
$result->lastWeight = $lastWeight;
$result->weightChange = $weightChange;


fwrite($myfile, json_encode($result));
echo json_encode($result);




fclose($myfile);
mysqli_close($dbc);




?>