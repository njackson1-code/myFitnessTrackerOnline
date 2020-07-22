<?php
   include('../ServerSidePHP/session.php');

   if(!isset($_SESSION["loggedIn"]) || $_SESSION["loggedIn"] !== true){
    header("location: login.html");
    exit;
}
?>

<!DOCTYPE html>
<title>myFitnessTracker</title>

<html>
<link href="../css/teststyle.css" rel="stylesheet">
<link href="../css/graphicMain.css" rel="stylesheet">
<link href="../css/goals.css" rel="stylesheet">

<head>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="../js/test.js"></script>
    
    <script src="../js/changePassword.js"></script>
    <script src="../js/goals.js"></script>
</head>
<body>
    <div id = "whiteMenuCover"></div>
    <div id = "pwForm">
        <div>Change Password</div>
        <input type = "password" placeholder = "Old Password" id = "opw">
        <input type = "password" placeholder = "New Password" id = "npw">
        <input type = "password" placeholder = "Repeat New Password" id = "rnpw">
        <button id = "submitPW">Change Password</button>
        <button id = "cancelPW">Cancel</button>
    </div>


    <div id = "sideMenu">
        <div id= "menuTitle">Menu</div>
        <a href ="goals.php"><li id = "goals">Goals</li></a>
        <a href ="data.php"><li id = "data">Data</li></a>
        <a href="progress.php"><li id = "progress">Progress</li></a>
    </div>
    <div class="topBorder">
        <div id = "topleft"><img id = "menubaricon" src = "../images/bars.png"></div>
        <div id ="topmiddle"><a href="index.php">myFitnessTracker</a></div>  
        <div id="topright">
            <div id = "user">
                <li>User</li>
                <img src="../images/social.png">
                <div id = "userbar">
                    <li> <?php echo htmlspecialchars($_SESSION["loggedInUser"]); ?> </li>
                    <li id = "changePW">Change Password</li>
                    <li id = "logout"><a href = "../ServerSidePHP/logout.php">Logout</a></li>
                </div>
            </div>
            
            <div id = "setting">
                <li>Settings</li>
                <img src="../images/symbol.png">
                <div id = "settingsbar">
                        <li>Stats</li>
                        <li>Goals</li>
                        <li>Logout</li>
                </div>
            </div>
        </div> 
    </div>


    <div id = "pageDescription">Goals</div>

    <div class="main" id ="mainS">
      <div id = "row1" class = "row">
        <input class = "goalText" id = "goalText1" ></input><div id = "mover1" class = "mover"><img src = "../images/icons8-add-64.png" id = "addGoal1" class = "addGoal"></div>
        </div>


    </div>
    
   
</body>
</html>