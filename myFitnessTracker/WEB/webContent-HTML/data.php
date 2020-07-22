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
<link href="../css/data.css" rel="stylesheet"> 

<head>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <script src="../js/data.js"></script>
        <script src="../js/test.js"></script>
        <script src="../js/dataGraphic.js"></script>
        <script src="../js/changePassword.js"></script>
</head>

<body>
<div id = "addDataCover"></div>
<div id = "pwForm">
        <div>Change Password</div>
        <input type = "password" placeholder = "Old Password" id = "opw">
        <input type = "password" placeholder = "New Password" id = "npw">
        <input type = "password" placeholder = "Repeat New Password" id = "rnpw">
        <button id = "submitPW">Change Password</button>
        <button id = "cancelPW">Cancel</button>
    </div>
<div id = "whiteMenuCover"></div>

<div id = "addData">Add Data</div>
       
        <div id = "wrapper"> 
            <div id = "myForm">
                <p> Date </p>
                <input type="text" id = "date">
                <hr>

                <div id = "formTop">
                    <div id = "cardioButton">Cardio</div>
                    <div id = "liftingButton">Lifting</div>
                    <div id = "weightButton">Weight</div>
                </div>

                <div id = "cardioSlide">
                    
                    
                    <div class = "group">
                        <input readonly="readonly" placeholder = "Type of Cardio" type = "text" id = "cardioType">
                        <img class = "optionsCardio"  id = "running" src= "../images/running.png"  height="30px">
                        <img class = "optionsCardio" id = "biking" src= "../images/biking.png"  height="30px">
                    </div>
                    
                    <div class = "group">
                        <input placeholder = "Duration of Cardio (minutes)" type = "text" id = "cardioDur">
                    </div>
             
                </div>

                <div id = "liftingSlide">
                    <!-- <div class = "text">Input Lifting Info</div> -->
                    <div class = "group">
                        <!-- <div>Body part lifted</div> -->
                        <input readonly="readonly" placeholder = "Type of lifting" type = "text" id = "liftingSplit">
                        <span class = "optionsLift" id = "legs" class = "typeLift">Legs</span>
                        <span class = "optionsLift" id = "arms" class = "typeLift">Arms</span>
                        <span class = "optionsLift" id = "back"  class = "typeLift">Back</span>
                        <span class = "optionsLift" id = "chest"  class = "typeLift">Chest</span>
                        <span class = "optionsLift" id = "shoulders"  class = "typeLift">Shoulders</span>
                        <span class = "optionsLift" id = "abs"  class = "typeLift">Abs</span>
                    </div>

                    <div class = "group">
                        <!-- <div>Duration of lifting (minutes)</div> -->
                        <input placeholder = "Duraiton of lifting (minutes)" type = "text" id = "liftingDuration">
                    </div>

                    <div class = "group">
                        <div>Intensity of lifting</div>
                        <input backgroundColor= "white" placeholder = "Intensity of lifitng" type = "range" id = "liftingIntensity" min = "1" max = "5">
                        <p id = "rangeValue"></p>
                    </div>
                </div>

                <div id = "weightSlide">
                        <input placeholder = "Bodyweight (lbs)" type = "text" id = "bw">
                </div>

                <div>
                    <div id = "submitData">Submit</div>
                </div>

            </div>
        </div> 

        

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

    <div id = "pageDescription">Data</div>
    <div class="main">
        <!--<img id = "mainIMG" src = "images/data.jpg">-->


        <div id = "graphicBox">
            
        </div>

        
        <div id = "datapoints">
            

       
        

            

            <div id = "tableSection">
                <button id = "showTable"><p id = "showTableText">Show Past Days</p><img id = "pointer" src = "../images/arrow.png"></button>


                <div id = "table">
                    <table>
                        <thread>
                            <tr>
                                <th>Date</th>
                                <th>Type of Cardio</th>
                                <th>Durating of Cardio</th>
                                <th>Type of Lifting</th>
                                <th>Duration of Lifting</th>
                                <th>Intensity of Lifting</th>
                                <th>Bodyweight (lbs)</th>
                            </tr>
                        </thread>
                        
                        <tbody id = "tableData"></tbody>
                    </table>
                </div>
            </div>


            
        </div>

    </div>

  
</body>
</html>