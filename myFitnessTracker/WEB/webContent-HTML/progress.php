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
<link href = "../css/progress.css" rel = "stylesheet">


<head>  
        
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <script src="../js/Chart.js"></script>
        <script src="../js/graph.js"></script>
        <script src="../js/progress.js"></script>
        <script src="../js/test.js"></script>
        <script src="../js/changePassword.js"></script>
        
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
    <div id = "overlay"></div>
    <div id = "sideMenu">
        <div id= "menuTitle">Menu</div>
        <a href ="goals.php"><li id = "goals">Goals</li></a>
        <a href = "data.php"><li id = "data">Data</li></a>
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


    <div id = "pageDescription">Progress</div>
    <div class="main">
       


        <div id = "graphArea">

           
            
            <button id = "closeGraph">Close Graph</button>
            <div id = "circleContainer">
                <div id = "circle">
                    <div class = "smallCircle" id ="weight">Bodyweight</div>
                    <div class = "smallCircle" id="cardioDUR">Cardio Duration</div>
                    <div class = "smallCircle" id="liftingDUraiton">Lifting Duration</div>
                    <div class = "smallCircle" id="cardioType">Type of Cardio</div>
                    <div class = "smallCircle" id="liftingSplit">Type of Lifting</div>
                    <div class = "smallCircle" id="liftingIntensity">Intensity of Lifting</div>

                    <button id = "graphChoiceSubmit">Graph</button>
                </div>
            </div>



            
            <div id="graphContainer">
                <canvas id = "graph"></canvas>
            </div>
            

            
        </div>

        <div id = "bottomm"></div>

    </div>

    
</body>
</html>