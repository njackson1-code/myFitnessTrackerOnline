$(document).ready(function () {

    let ids = ["weight", "cardioDUR", "liftingDUraiton", "cardioType", "liftingSplit", "liftingIntensity"];

    let clickedCircle = {};
    let selected = false;
    let link = "";
    
    design();

    function design(){
        let r = 250;
        for (let i = 0; i < ids.length; i ++){
            id = ids[i];
            let element = document.getElementById(id);

            
            let rotation =  2 * i * Math.PI/(6);
            
            console.log(rotation)

            let x = Math.cos(rotation) * 250;
            let y = Math.sin(rotation) * 250;

            //console.log(x + ',' + y);

            
            element.style.right = 250-x - 100+ "px";
            element.style.top = 250-y - 100+ "px";
        }

        let weight = document.getElementById("weight");
        weight.onclick = function(){
            weight.style.border = "6px solid orange";
        }


        let element = document.getElementById("graphChoiceSubmit");
        element.style.right = '200px';
        element.style.top = '200px';
    }

    
    //circle.style.marginLeft = .50 * 


    //children = $(circle).children();

    //listener for buttons that haven't been clicked yet
    //let circle = document.getElementById('circle');
    document.addEventListener( "click", circleClicked );
    

    function circleClicked(event){
        var element = event.target;
        if(element.classList.contains("smallCircle")){

            if (element.id in clickedCircle) {
                
                if (clickedCircle[element.id] == 1){
                    selected = false;
                    element.style.border = "0px solid black";
                    clickedCircle[element.id] = 0;
                }
                else {
                    selected = true;
                    undoOtherClick(element.id);
                    link = element.id;
                    element.style.border = "6px solid orange";
                    clickedCircle[element.id] = 1;

                }
            }
            else {
                selected = true;
                undoOtherClick(element.id);
                link = element.id;
                element.style.border = "6px solid orange";
                clickedCircle[element.id] = 1;
            }
            console.log(element.id);
            
        }

        if (selected == true){
            let submitBTN = document.getElementById('graphChoiceSubmit');
            submitBTN.style.opacity = 1;
        }
        else {
            let submitBTN = document.getElementById('graphChoiceSubmit');
            submitBTN.style.opacity = 0.1;
        }

    }

    function undoOtherClick(newClick){
        for (pastClick in clickedCircle){
            if (pastClick != newClick){
                clickedCircle[pastClick] = 0;
                let element = document.getElementById(pastClick);
                element.style.border = "0px solid black";

            }
        }
    }

    





    //BUTTON -- generate graph
    let graphChoiceSubmit = document.getElementById("graphChoiceSubmit");

    //BUTTON -- close graph
    let closeGraph = document.getElementById("closeGraph");

    //click generate graph
    graphChoiceSubmit.onclick = function(){
        if (!selected){
            return;
        }
        let graphChoice = link;//document.getElementById("graphChoices").value;
        window.scrollTo(0, 0);
        document.getElementById("overlay").style.display = "block";
        document.getElementById("overlay").style.zIndex = "8";
        document.getElementById("graph").style.zIndex = "9";
        document.getElementById("closeGraph").style.zIndex ="10";
        document.getElementById("closeGraph").style.display = "block";

    
        if (graphChoice == "cardioType" || graphChoice == "liftingSplit"){
            barData(graphChoice);
        } 
        else {
            lineData(graphChoice);
        }
    }

    //click close graph
    closeGraph.onclick = function(){
        console.log("here");
        document.getElementById("overlay").style.display = "none";
        document.getElementById("overlay").style.zindex = -1;
        document.getElementById("graph").style.display = "none";
        document.getElementById("graph").style.zindex = -1;
        document.getElementById("closeGraph").style.display = "none";

        document.getElementById("graphContainer").innerHTML = '&nbsp;';
        document.getElementById("graphContainer").innerHTML = '<canvas id="graph"></canvas>';
    }

    //generating graph
    function lineData(graphChoice){
        
        let monthData = [];
        let graphData = [];

        //loading data from mysql table
        var ajax = new XMLHttpRequest();
        var method = "GET";
        var url = "../ServerSidePHP/createTable.php";

        //send ajax request
        ajax.open(method,url,true);
        ajax.send();

        //retrieve table data
        ajax.onreadystatechange = function(){
            
            if (this.readyState== XMLHttpRequest.DONE && this.status == 200){
                //convert data to array
                

                var data = JSON.parse(this.responseText);
                
                //initialize variables
                const tableBody = document.getElementById("tableData");
                newHTML = ""

                //loop through array
                let index = 0;
                for (i = 0; i < data.length; i ++){
                    
                    if (graphChoice == 'weight' && parseInt(data[i][graphChoice]) == 1){
                        continue;
                    }
                    monthData[index] = data[i].date;

                    
                    
                    if (data[i][graphChoice] == null){
                        graphData[index] = 0;
                    }
                    else {
                        graphData[index] = parseInt(data[i][graphChoice]);
                    }
                    index ++;
                    //increment id and tablelength
                }
                
                console.log(graphData);
                var ctx = document.getElementById('graph').getContext('2d');
                ctx.height = 200;
                
                let graphLabel = choiceIDtoMYSQLIS(graphChoice);
                var myLine = new Chart(ctx, {type: 'line', data: {
                    scaleOverride : true,
                    scaleSteps : 10,
                    scaleStepWidth : 50,
                    scaleStartValue : 0 ,
                        labels: monthData,//['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17'],
                        datasets :[{
                           label: graphLabel,
                           borderColor: "white",
                           backgroundColor: "blueviolet",//"#d9455f",
                           data: graphData
                        }],
                        
                        options: {
                            legend: {
                                labels: {
                                    fontColor: 'black',
                                }
                                ,
                                fontColor: 'black'
                            }  
                        } 
                }

                });
                
               //monthData = ["2020-04-01", "2020-04-02", "2020-04-03", "2020-04-04", "2020-04-05", "2020-04-06", "2020-04-07", "2020-04-08", "2020-04-09", "2020-04-10", "2020-04-11", "2020-04-12", "2020-04-13", "2020-04-14", "2020-04-15", "2020-04-16", "2020-04-17", "2020-04-18"];
            }
        }
        //monthData = ["2020-04-01", "2020-04-02", "2020-04-03", "2020-04-04", "2020-04-05", "2020-04-06", "2020-04-07", "2020-04-08", "2020-04-09", "2020-04-10", "2020-04-11", "2020-04-12", "2020-04-13", "2020-04-14", "2020-04-15", "2020-04-16", "2020-04-17", "2020-04-18"];

    }


    //function for visualizing number of times 
    function barData(graphChoice){
        //loading data from mysql table
        var ajax = new XMLHttpRequest();
        var method = "GET";
        var url = "../ServerSidePHP/createTable.php";

        //send ajax request
        ajax.open(method,url,true);
        ajax.send();

        //retrieve table data

        graphData = {};

        ajax.onreadystatechange = function(){
            
            if (this.readyState== XMLHttpRequest.DONE && this.status == 200){
                //convert data to array
                var data = JSON.parse(this.responseText);

                
                
                //initialize variables
                const tableBody = document.getElementById("tableData");
                newHTML = ""
               
                //loop through array
                for (i = 0; i < data.length; i ++){
                   // alert(data[i][graphChoice]);
                   
                    let strg = data[i][graphChoice];

                    
                    if (strg == null || strg == '') continue;
                    strg = strg.split(", ");

                   

                    for (let index = 0; index < strg.length; index ++){
                        str = strg[index];
                        console.log(str);
                        if (str == "null" || str == null || str == ""){
                            str == "Something";
                        }
                        else {
                            str = str.split('/').join('');
                        }

                        if (str in graphData){
                            graphData[str] = graphData[str] + 1;
                        }
                        else {
                            graphData[str] = 1;
                        }
                    }

                }
                console.log(graphData)
              
                var ctx = document.getElementById('graph').getContext('2d');
                
                //ctx.height = 200;
                
                let graphLabel = choiceIDtoMYSQLIS(graphChoice);

                let answer = [];
                let answerLabel = [];

                const keys = Object.keys(graphData);
                console.log(keys)
                let index = 0;
                for (const key of keys){
                    answer[index] = graphData[key];
                    answerLabel[index] = key;
                    index ++;
                }
                console.log(answerLabel)
                var myBarChart = new Chart(ctx, {type: 'bar',
                    data: {
                        scaleOverride : true,
                        //scaleSteps : 10,
                        //scaleStepWidth : 50,
                        scaleStartValue : 0 ,
                        labels: answerLabel,
                        datasets :[{
                            
                            label: graphLabel,
                            borderColor: "white",
                           backgroundColor: "#d9455f",
                            data: answer
                        }],
                    },
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                       
                    }
            
                });
               
            }
        }
       
    }

    function choiceIDtoMYSQLIS(choiceID){
        switch (choiceID){
            case "weight":
                return "Bodyweight (lbs)";
            case "cardioDUR":
                return "Cardio Duration (minutes)";
            case "liftingDUraiton":
                return "Duration of Lifting (minutes)";
            case "cardioType":
                return "Type of Cardio";
            case "liftingSplit":
                return "Type of Lifting";
            case "liftingIntensity":
                return "Intensity of Lifting";
        }
        return "no english keyword";
    }





















});