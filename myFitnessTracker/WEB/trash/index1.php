<?php
   include('session.php');

   if(!isset($_SESSION["loggedIn"]) || $_SESSION["loggedIn"] !== true){
    header("location: login.html");
    exit;
}
?>

<!DOCTYPE html>


<title>myFitnessTracker</title>



<html>
<link href="style.css" rel="stylesheet">

<body>
    <div class="topBorder">
        
        <a href="index.php"><div id ="title">myFitnessTracker</div> </a> 
        <div class="settings">
            <div id = "user">
                <li>User</li>
                <img src="images/social.png">
                <div id = "userbar">
                    <li> <?php echo htmlspecialchars($_SESSION["loggedInUser"]); ?> <li>
                    <li>Stats</li>
                    <li>Goals</li>
                    <li id = "logout"><a href = "logout.php">Logout</a></li>
                </div>
            </div>
            
            <div id = "setting">
                <li>Settings</li>
                <img src="images/symbol.png">
                <div id = "settingsbar">
                        <li>Stats</li>
                        <li>Goals</li>
                        <li>Logout</li>
                </div>
            </div>
        </div>
    </div>


    <div class="main">
        <div class = "menu"> 
        <a href = "data.php"><li id = "data">Data</li></a>
        <a href = "progress.php"><li id = "progress">Progress</li></a>
         
            <p id = "rock">"Success isn't always about 'Greatness', it's about consistency. Consistent, hard work gains success. Greatness will come." - The Rock</p>
     
        </div>

        <div id="graphic">
           <img src="images/running.jpg">
        </div>
    </div>


    <script src="main.js"></script>
</body>
</html>