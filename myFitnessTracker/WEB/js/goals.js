$(document).ready(function () {


    let numGoals = 1;
    let btn = document.getElementById("mover1");
    //btn.onclick = function() {
       
        //btn.setAttribute("style", "transform: rotate(" + 1090 + "deg)");
        //btn.style.paddingLeft = "100%";
    //}

    //for storing in database will just need user id and row number (doesn't matter that is increasing)

    let linked = {};

    document.addEventListener( "click", clicked ); 

    function clicked(event) {
        let element = event.target;

        if (!element.classList.contains('addGoal')){
            return;
        }

        //deleterow
        if (element.backgroundColor == '#ffffff') {
            let num = numGoals;
            num = parseInt((element.id).split("addGoal")[1]);
            //console.log((element.id).split("addGoal"));
            //alert("row" + numGoals)
            //alert(num);
            deleteGoal(num);

            //pass in the one to delete
            setTimeout (function () {home(num)}, 1300);
            $(element).toggleClass('rotated');
            document.getElementById("mover" + (num)).style.paddingLeft = "0%";
            document.getElementById("row" + (num)).style.width = "10%";
            document.getElementById("row" + (num)).style.backgroundColor = "white";
            //document.getElementById("goalText" + number).style.width=  '0%';
            //numGoals = numGoals - 1;
        }
        //addrow
        else {
            let html = createHTML(numGoals+1, '');
           
            let num = numGoals;
            num = parseInt((element.id).split("addGoal")[1]);
            
            setTimeout (function () {stopSpinning(html,num,'',true)}, 1300);
            $(element).toggleClass('rotated');
            document.getElementById("mover" + num).style.paddingLeft = "100%";
            document.getElementById("row" + num).style.width = "100%";
            document.getElementById("row" +  num).style.backgroundColor = "blueviolet";
            //document.getElementById("mainS").setAttribute("style", "background-image: linear-gradient(right, red, white)");
            numGoals = numGoals + 1;
        }


    }


    function stopSpinning(html, number, value, check) {
        $('#addGoal' + number).toggleClass('rotated');
        //console.log("addGoal" + number);
        document.getElementById("addGoal" + number).setAttribute("style", "transform: rotate(" + 45 + "deg)");
        document.getElementById("addGoal" + number).backgroundColor = '#ffffff';
        //console.log(document.getElementById("mainS").innerHTML);
        //document.getElementById("mainS").innerHTML = document.getElementById("mainS").innerHTML +  '<button></button>';
        //console.log(document.getElementById("mainS").innerHTML);
        if (check){
            $("#mainS").append(html);
        }
        document.getElementById("addGoal" + number).style.pointerEvents = 'all';
        document.getElementById("goalText" + number).value = value;
        document.getElementById("goalText" + number).style.width=  '80%';
        
        
    }

    function home(number){
        $('#addGoal' + (number)).toggleClass('rotated');
        
        document.getElementById("addGoal" + (number)).backgroundColor = '#eeeeee';
        document.getElementById("row" + (number)).backgroundColor = '#eeeeee';
        document.getElementById("addGoal" + (number)).setAttribute("style", "transform: rotate(" + 90 + "deg)");
        //if (number == numGoals - 1){
            $('#row' + number).remove();
            
        //}
       // else {
       //     $('#row' + (number-1)).remove();
       // }

        
    }

    function createHTML(number, content) {
        let html = '<div id = "row' + number +  '" class = "row"><input class = "goalText" id = "goalText' + number + '"></input><div class = "mover" id = "mover' + number +  '"><img src = "../images/icons8-add-64.png" class = "addGoal" id = "addGoal' + number +  '"></div></div>';
        return html;
    }

    //setInterval( function () {console.log(document.getElementById("addGoal1"))}, 2000);

    function deleteGoal(number) {
        $.ajax({
            type: "POST",
            url: "../ServerSidePHP/deleteGoal.php",
            data: JSON.stringify(number),
            success: function(msg){
            }
        });
    }

    document.addEventListener('keyup', saveData);

    function saveData(event) {
        let rows = $('mainS').children();
        let element = event.target;
        let rowID = (element.id).split('goalText')[1]; 
        
        let send = [];
        send[0] = rowID;
        send[1] =  element.value;
        
        /* let send = {};
        for (let i = 0; i < row.length; i ++){
            rowID = (row[i].id).split('row')[1]; 
            send[rowID] = documnet.getElementById("goalText" + rowID).innerHTML;
        } */

        $.ajax({
            type: "POST",
            url: "../ServerSidePHP/saveGoals.php",
            data: JSON.stringify(send),
            success: function(msg){
            }
        });
    }

    setGoals();
    function setGoals() {
        //loading data from mysql table
        var ajax = new XMLHttpRequest();
        var method = "GET";
        var url = "../ServerSidePHP/createGoals.php";

        //send ajax request
        ajax.open(method,url,true);
        ajax.send();

        //retrieve table data
        ajax.onreadystatechange = function(){
            if (this.readyState== XMLHttpRequest.DONE && this.status == 200){
                //convert data to array
                var data = JSON.parse(this.responseText);
                
                //initialize variables
                const tableBody = document.getElementById("mainS");
                let newHTML = ""

                //loop through array
                if (data.length == 0){
                    
                    
                    
                    return;
                }
                $("#row1").remove();
                
              let first = parseInt(data[0].row_id);
              $("#mainS").append(createHTML(first, ''));

              
                for (let i = 0; i < data.length; i ++){
                   // console.log(data[i].goal)
                    //increment id and tablelength
                    
                    //$("#mainS").append(newHTML);
                    
                    let num = parseInt(data[i].row_id);
                    if (num > numGoals){
                        numGoals = num + 1;
                    }
                    let value = data[i].goal;

                    
                    
                    let next = num+1;
                    if (i < data.length - 1){
                        next = parseInt(data[i+1].row_id);
                    }
                  
                    newHTML = createHTML(next, data[i].goal);
                    $("#mainS").append(newHTML);
                    
                    setTimeout (function (){
                        let html = createHTML(next, '');
                        
                        //let num = numGoals;
                        //alert("row" + numGoals);
                        setTimeout (function () {stopSpinning(html,num,value,false)}, 1300);
                        
                        $(document.getElementById("addGoal" + num)).toggleClass('rotated');
                        document.getElementById("mover" + num).style.paddingLeft = "100%";
                        document.getElementById("row" + num).style.width = "100%";
                        document.getElementById("row" +  num).style.backgroundColor = "blueviolet";
                    }, 250+(i*100));
                    
                }
                numGoals = numGoals + 1;
                
                //set new inner HTML
                //tableBody.innerHTML = newHTML;
            }
        }
    }

    function postData(newHTML, num, value){
        console.log(num);
        console.log(value);
        stopSpinning(newHTML,num,value);
        $(document.getElementById("#addGoal" + num)).toggleClass('rotated');
        document.getElementById("mover" + numGoals).style.paddingLeft = "100%";
        document.getElementById("row" + numGoals).style.width = "100%";
        document.getElementById("row" +  numGoals).style.backgroundColor = "blueviolet";
}

});