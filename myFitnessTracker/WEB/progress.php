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
<link href="../css/teststyle.css" rel="stylesheet">
<link href = "../css/progress.css" rel = "stylesheet">


<head>  
        
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <script src="../js/Chart.js"></script>
        <script src="../js/graph.js"></script>
        <script src="../js/progress.js"></script>
        <script src="../js/test.js"></script>
        
</head>

<body>
    <div id = "whiteMenuCover"></div>
    <div id = "sideMenu">
        <div id= "menuTitle">Menu</div>
        <a href = "data.php"><li id = "data">Data</li></a>
        <a href="progress.php"><li id = "progress">Progress</li></a>
    </div>
    <div class="topBorder">
        <div id = "topleft"><img id = "menubaricon" src = "images/bars.png"></div>
        <div id ="topmiddle"><a href="index.php">myFitnessTracker</a></div>  
        <div id="topright">
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
       


        <div id = "graphArea">

            <select id="graphChoices" name="cars" place>
                <option value="" disabled selected>Select your option</option>
                <option value="weight">Bodyweight</option>
                <option value="cardioDUR">Cardio Duration</option>
                <option value="liftingDUraiton">Lifting Duration</option>
                <option value="cardioType">Type of Cardio</option>
                <option value="liftingSplit">Type of Lifting</option>
                <option value="liftingIntensity">Intensity of Lifting</option>
            </select>
            
            <button id = "closeGraph">Close Graph</button>
            <div id = "circle">
                <div id = "weight">Bodyweight</div>
                <div id="cardioDUR">Cardio Duration</div>
                <div id="liftingDUraiton">Lifting Duration</div>
                <div id="cardioType">Type of Cardio</div>
                <div id="liftingSplit">Type of Lifting</div>
                <div id="liftingIntensity">Intensity of Lifting</div>

                <button id = "graphChoiceSubmit">Graph</button>
            </div>

            
            
            

            
        </div>

    </div>

    
</body>
</html>