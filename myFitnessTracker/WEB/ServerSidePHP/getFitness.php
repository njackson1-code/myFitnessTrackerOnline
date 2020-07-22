<?php

require_once('../../connectSQL.php');

$query = 'SELECT date, cardioType, cardioDur, liftingSplit, liftingDuration, liftingIntensity, weight';

$response = @mysqli_query($dbc, $query);

if ($response){
    echo '<table>';
}
else {
    echo 'Could not retrieve data';
}

mysqli_close($dbc);

?>