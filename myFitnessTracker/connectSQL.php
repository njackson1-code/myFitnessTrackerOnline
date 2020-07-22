<?php
//define user
DEFINE ('DB_USER', 'basicuser');
DEFINE ('DB_PASSWORD', 'Bingo1999');
DEFINE ('DB_HOST', 'mysql.myfitnesstracker.online');
DEFINE ('DB_NAME', 'myfitnesstracker');

//connect to MYSQL
$dbc = @mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME) OR die('Couldnt Connect');
?>