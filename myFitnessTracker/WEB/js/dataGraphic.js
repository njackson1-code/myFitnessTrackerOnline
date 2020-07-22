$(document).ready(function () {

    //avg cardio
    //avg lifting
    //last recorded bodyweight (is it an increase decrease or roughly same)
    let weightChange;
    let checkedNames = {};
    graphicCreator();
    
    
    graphicParts = {}
    function graphicCreator() {
        var ajax = new XMLHttpRequest();
        var method = "GET";
        var url = "../ServerSidePHP/graphicData.php";

        //send ajax request
        ajax.open(method,url,true);
        ajax.send();

        

        

        //retrieve table data
        ajax.onreadystatechange = function(){
            if (this.readyState== XMLHttpRequest.DONE && this.status == 200){
                //convert data to array

                
                
                
                
                //initialize variables
                const tableBody = document.getElementById("graphicBox");
                newHTML = ""
             

                try {
                    var data = JSON.parse(this.responseText);

                    let keys = Object.keys(data);
                    //loop through array
                    for (i = 0; i < keys.length; i ++){
                        let key = keys[i];
                        //increment id and tablelength
                

                        if (key == "weightChange"){
                            weightChange = data[key];
                            newHTML += '<div class = "cube" id = "box' + i +  '"><div class = "back"></div></div>';
                            continue;
                        }
                        
                        //compile data into HTML
                        if (data[key] == 0){
                            newHTML += '<div class = "cube" id = "box' + i + '"><div class = "noData" contenteditable = "false" id = "avgCardio"><td>Not Enough Data To Show</div></div>';
                        }
                        else {
                            checkedNames[key] = 1;
                            newHTML += '<div class = "cube" id = "box' + i +  '"><div class = "front" contenteditable = "false" id = "' + key + '"><td>' + Math.round(data[key] * 100)/100 + '</div></div>';
                        }

                    }
                    for (let i =  keys.length; i < 6; i ++){
                        if (i == 0){
                            newHTML += '<div class = "cube" id = "box' + i + '"><td>No Data<div class = "back"></div></div>';
                        }
                        else {
                            newHTML += '<div class = "cube" id = "box' + i + '"><div class = "back"></div></div>';
                        }
                    
                    }
                }
                catch (err){
                    for (let i =  0; i < 6; i ++){
                        if (i == 0){
                            newHTML += '<div class = "cube" id = "box' + i + '"><div class = "noData" contenteditable = "false" id = "avgCardio"><td>Not Enough Data To Show</div></div>';
                        }
                        else {
                            newHTML += '<div class = "cube" id = "box' + i + '"><div class = "back"></div></div>';
                        }
                    
                    }
                }
                //newHTML += '<div class = "cube" id = "box4"><div class = "back"></div></div>'
                //newHTML += '<div class = "cube" id = 5><div></div></div>'
                //newHTML += '<div class = "cube" id = "box5"><div class = "back"></div></div>'
                //set new inner HTML
                tableBody.innerHTML =  tableBody.innerHTML + newHTML;

            
                //fix layout
                graphicLayout();
            }
        }
    }




    function graphicLayout(){
        let names = ['avgLifting', 'avgCardio', 'lastWeight'];
        let descriptions = ['Avg Lifting Time: ', 'Avg Cardio Time: ', 'Previous Weight: '];

        for (let i = 0; i < names.length; i ++){
            let name = names[i];
           
            let description = descriptions[i];

            

            
         
            
            let grid = document.getElementById(name);
            grid.innerHTML = description + grid.innerHTML;

            graphicParts[name] = '<div class = "front" contenteditable = "false" class = "' + i +  '" id = "' + name + '"><td>' + grid.innerHTML + '</div>'

            if (i == names.length - 1){
                let grid = document.getElementById('lastWeight');

                let addHTML = '<img id = "weightArrow" src = "../images/weightArrow.png">';
                

                grid.innerHTML = grid.innerHTML + addHTML;

                
            }


        }

        if (weightChange == '1'){
          
            document.getElementById('weightArrow').setAttribute("style", "transform: rotate(" + -90 + "deg)");
        }
        else if (weightChange == '-1') {
            
            document.getElementById('weightArrow').setAttribute("style", "transform: rotate(" + 90 + "deg)");
        }
        else {
           
            document.getElementById('weightArrow').setAttribute("style", "transform: rotate(" + 0 + "deg)");
        }

    }









    function flip() {
        let names = ['avgLifting', 'avgCardio', 'lastWeight', 'weightChange'];


        
        let firstNum = Math.floor(6 * Math.random());
        let secondNum = Math.floor(6 * Math.random());

        while (secondNum == firstNum){
            secondNum = Math.floor(6 * Math.random());
        }

        let first = names[firstNum];
        let second = names[secondNum];

       
        let firstClone = document.getElementById("box" + firstNum.toString()).innerHTML;
        let secondClone = document.getElementById("box" + secondNum.toString()).innerHTML;

        //document.getElementById(secondNum.toString()).setAttribute("style", "transform: rotateX(" + 360 + "deg)");
        //document.getElementById(firstNum.toString()).setAttribute("style", "transform: rotateX(" + 360 + "deg)");

        

        $('#box' + firstNum.toString() + ' div').fadeOut("slow");
        $('#box' + secondNum.toString() + ' div').fadeOut("slow");



        setTimeout(function(){
            
            document.getElementById('box' +secondNum.toString()).innerHTML = firstClone;
            document.getElementById('box' +firstNum.toString()).innerHTML = secondClone;
            $('#box' + firstNum.toString() + ' div').css('display', 'none');
            $('#box' + secondNum.toString() + ' div').css('display', 'none');
            $('#box' + firstNum.toString() + ' div').fadeIn("slow");
            $('#box' + secondNum.toString() + ' div').fadeIn("slow");


            setTimeout(function(){ flip()}, 1500);
            

        }, 1000);

     
        
        
        

      
        
        
     }
    //setInterval(flip, 3000);
     let time = setTimeout(function(){ flip()}, 1000);
     













});