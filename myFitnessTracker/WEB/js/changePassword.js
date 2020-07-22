$(document).ready(function () {

    let changePW = document.getElementById("changePW");

    changePW.onclick = function() {
        let pwForm = document.getElementById("pwForm");
        pwForm.style.display = "block";
        pwForm.style.zIndex = '4';
        document.getElementById("whiteMenuCover").style.display = 'block';
    }

    let cancelPW = document.getElementById("cancelPW");
    cancelPW.onclick = function() {
        closeForm();
    }

    function closeForm() {
        let pwForm = document.getElementById("pwForm");
        pwForm.style.display = "none";
        pwForm.style.zIndex = '4';
        document.getElementById("whiteMenuCover").style.display = 'none';
    }

    let submitPW = document.getElementById("submitPW");
    submitPW.onclick = function() {
        if (submitPW.style.opacity == "0.25") {
            return;
        }

        let opw = document.getElementById("opw").value;
        let npw = document.getElementById("npw").value;

        let data = [opw, npw];
        
       
        $.ajax({
            type: "POST",
            url: "../ServerSidePHP/changePassword.php",
            data: JSON.stringify(data),
            success: function(msg){
                console.log(msg);
                if (msg == "true") {
                    alert("Password Changed");
                    closeForm();
                }
                else {
                    alert("Something went wrong. Check your password to make sure you typed it in correctly.")
                }
            }
        });
    }

    document.addEventListener("keyup", someListener );

    function someListener(){
       
        let opw = document.getElementById("opw").value;
        let npw = document.getElementById("npw").value;
        let rnpw = document.getElementById("rnpw").value;

        
       
        if (npw != rnpw || opw.length == 0){
            submitPW.style.opacity = "0.25";
        }
        else {
            submitPW.style.opacity = "1";
        }

        
        
    }
















});