<?php
//connect to MYSQL
require_once('../../connectSQL.php');

//include session
include('session.php');

//query
$result = mysqli_query($dbc, 'SELECT * FROM fitness where user_id = '. $_SESSION['user_id'].';');

//file for printing out errors
$myfile = fopen("createTable.txt", "w");
fwrite($myfile, gettype($result));

//adds data to array
$to_encode = array();
while ($row = mysqli_fetch_assoc($result)){
    $to_encode[] = $row;
}

echo json_encode($to_encode);

mysqli_close($dbc);
fclose($myfile);
?>