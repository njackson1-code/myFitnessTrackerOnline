$(document).ready(function () {

   

    let loginBtn = document.getElementById("loginBTN");

    loginBtn.onclick = function () {loginAttempt();}
    

    function loginAttempt(){
       
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;

        if (username.length == 0 || password.length == 0){
            console.log("Password or Username is empty");
            return;
        }

        let send = [username, password];

        //seding username and password
        $.ajax({
            type: "POST",
            url: "../ServerSidePHP/login.php",
            data: JSON.stringify(send),
            success: function(msg){
             
                if (msg == "true") {
                    window.location.href = "../webContent-HTML/index.php";
                }
                else {
                    
                    alert(msg);
                }
            }
        });

     

    }



    let createForm = document.getElementById("createAcc");

    createForm.onclick = function() { 
        document.getElementById("createForm").style.display = 'block';
    }

    let backtologin = document.getElementById("loginBack");

    backtologin.onclick = function() { 
        document.getElementById("createForm").style.display = 'none';
    }

    let sendForm = document.getElementById("sendForm");
    //listener for buttons that haven't been clicked yet
    document.addEventListener("keyup", someListener );

    function someListener(){
        let fname = document.getElementById("fname").value;
        let lname = document.getElementById("lname").value;
        let uname = document.getElementById("uname").value;
        let pw = document.getElementById("pw").value;
        let rpw = document.getElementById("rpw").value;

        let data = [fname, lname, uname, pw, rpw];
        
        let dontchangeColor = false;
        for (let i = 0; i < data.length; i ++){
           
            if (data[i].length == 0){
                dontchangeColor = true;
            }
        }
        //alert(dontchangeColor)
        if (pw != rpw){
            sendForm.style.backgroundColor = "#cccccc";
            return;
        }

        if (!dontchangeColor){
            sendForm.style.backgroundColor = "white";
        }
        
    }


    sendForm.onclick = function () {
        if (sendForm.style.backgroundColor == "white"){
            createAccount();
        }
    }

    function createAccount(){
        let fname = document.getElementById("fname").value;
        let lname = document.getElementById("lname").value;
        let uname = document.getElementById("uname").value;
        let pw = document.getElementById("pw").value;
        let rpw = document.getElementById("rpw").value;

        let data = [fname, lname, uname, pw, rpw];
        console.log(data);

        $.ajax({
            type: "POST",
            url: "../ServerSidePHP/createAccount.php",
            data: JSON.stringify(data),
            success: function(msg){
                console.log(msg);
                if (msg == "true") {
                   
                    window.location.href = "../webContent-HTML/index.php";
                }
                else {
                    alert("Something went wrong")
                }
            }
        });
    }


    //forgot password
    let showReset = document.getElementById("showReset");
    showReset.onclick = function() {
        document.getElementById("forgotPassword").style.display = "block";
    }

    let reset = document.getElementById("reset");

    reset.onclick = function (){
        let email = document.getElementById("recoveryEmail").value;
       
        $.ajax({
            type: "POST",
            url: "../ServerSidePHP/resetPassword.php",
            data: JSON.stringify(email),
            success: function(msg){
                alert(msg);
            }
        });
    }
    
    //back to signin

let back = document.getElementById("back");
back.onclick = function() {
    document.getElementById("forgotPassword").style.display = "none";
}








});