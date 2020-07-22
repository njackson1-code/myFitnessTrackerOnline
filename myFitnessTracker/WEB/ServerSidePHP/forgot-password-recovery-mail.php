<?php


use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../vendor/autoload.php';


//connect to MYSQL
require_once('../../connectSQL.php');

//file for printing out errors
$myfile = fopen("mailerror.txt", "w");

//include session
include('session.php');




$mail = new PHPMailer();

$newupdateQuery = "SELECT password FROM users WHERE email ='$email';";

$response = @mysqli_query($dbc, $newupdateQuery);

fwrite($myfile, $email);




$password;
if ($response->num_rows > 0){
    //session_register("username");
    //session_register("password");
    while ($row = mysqli_fetch_assoc($response)){
        $password = $row['password'];
    }
}
fwrite($myfile, $password);



//$mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->IsSMTP();
$mail->SMTPDebug = 0;
$mail->SMTPAuth = TRUE;
$mail->SMTPSecure = "tls";
$mail->SMTPSecure = false;
$mail->Port     = 587;  
$mail->Username = "do-not-reply@myfitnesstracker.online";
$mail->Password = "Bingo1999";
$mail->Host     = "smtp.dreamhost.com";
//$mail->Mailer   = MAILER;

$mail->SetFrom('do-not-reply@myfitnesstracker.online', 'Password Recovery');
//$mail->AddReplyTo(SERDER_EMAIL, SENDER_NAME);
//$mail->ReturnPath=SERDER_EMAIL;	
$mail->AddAddress($email);
$mail->Subject = "Forgot Password Recovery";		
$mail->Body = "You Password to myFitnessTracker is " . $password;
$mail->IsHTML(true);

/* if(!$mail->Send()) {
	$error_message = 'Problem in Sending Password Recovery Email';
} else {
	$success_message = 'Please check your email to reset password!';
} */


if(!$mail->send()) {
    echo 'Message could not be sent.';
    echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
    echo 'Message has been sent. Check your inbox.';
}
?>