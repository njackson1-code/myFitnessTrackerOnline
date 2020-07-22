
$(document).ready(function () {

    

    let tableLength = $('#tableData tr').length;

    //load data from database first thing
    loadData();

    //listener for buttons that haven't been clicked yet
    document.addEventListener( "click", someListener );

    
    let slider = document.getElementById("liftingIntensity");
    document.getElementById("rangeValue").innerHTML = slider.value;
    slider.oninput = function() {
        document.getElementById("rangeValue").innerHTML = this.value;
    }
    

    function someListener(event){
        var element = event.target;

        if(element.classList.contains("optionsCardio")){
            
                drop(element, 'cardio');
        }
        else if (element.classList.contains("optionsLift")) {
                drop(element, 'lift');
            
        }

        if(element.classList.contains("editbutton")){
            //let currentTD = element.parents('tr').find('td');
            let currentTD = $(element).parents('tr').find('td');
            if ($(element).html() == 'EDIT'){
                $.each(currentTD, function () {
                    $(this).prop('contenteditable', true);
                    $(this).css('background-color', 'black');
                    $(this).css('color', 'white');
                    //$(this).css('opacity', '0.5');
                });
            }
            else {
                $.each(currentTD, function () {
                    $(this).prop('contenteditable', false);
                    $(this).css('background-color', 'white');
                    $(this).css('color', 'black');
                    //$(this).css('opacity', '1');
                });
            }
    
            //$('.editbutton').html($('.editbutton').html() == 'EDIT' ? 'Save' : 'EDIT');
            if (element.innerHTML == "EDIT"){
                element.innerHTML = 'Save'
            } else {
                //update data
                
                let fitness_ID = $(element).closest('tr').attr('id');
              
                updateData(fitness_ID);
                element.innerHTML = 'EDIT'
            }
        }
    }
    
    function dataset(date, cardioType, cardioDur, liftingSplit, liftingDuration, liftingIntensity, weight){
        let obj = {}
        obj.date = date;
        obj.cardioType = cardioType;
        obj.cardioDur = cardioDur;
        obj.liftingDuration = liftingDuration;
        obj.liftingIntensity = liftingIntensity;
        obj.liftingSplit = liftingSplit;
        obj.weight = weight;
        return obj;
    }
    
    let addData = document.getElementById("addData");
    
    addData.onclick = function() { 
        if (document.getElementById("addData").innerHTML == "Add Data") {
            document.getElementById("myForm").style.width = '25%';
            document.getElementById("addData").style.marginRight = "25%";
            document.getElementById("addData").innerHTML = "Close";
            document.getElementById("addDataCover").style.display = "block";
            document.getElementById("addDataCover").style.height = "'" + document.getElementById("myForm").style.height+ "'" + "px";
        }
        else {

            document.getElementById("myForm").style.width = '0%';
            document.getElementById("addData").style.marginRight = '0%';
            document.getElementById("addDataCover").style.display = "none";
            document.getElementById("addData").innerHTML = "Add Data";
        }
    }
    
    let newData = document.getElementById("submitData");
    let cancelData = document.getElementById("cancelData");
    
    
    
    newData.onclick = function(){
        //sends new data to the database
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        let date = document.getElementById("date").value;

        
        let cardioType = document.getElementById("cardioType").value;
        let cardioDur = document.getElementById("cardioDur").value;
        let liftingDuration = document.getElementById("liftingDuration").value;
        let liftingIntensity = document.getElementById("liftingIntensity").value;
        let liftingSplit = document.getElementById("liftingSplit").value;
        let weight = document.getElementById("bw").value;
        
        let data = dataset(date, cardioType, cardioDur, liftingSplit, liftingDuration, liftingIntensity, weight);
        
        let fitness_ID = add_Data(data);
        if (fitness_ID != -1){
            sendData(fitness_ID);
        }
    }
    
   

    function loadData(){
        //loading data from mysql table
        var ajax = new XMLHttpRequest();
        var method = "GET";
        var url = "http://localhost:8000/ServerSidePHP/createTable.php";
        url = '../ServerSidePHP/createTable.php';
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
                for (i = 0; i < data.length; i ++){
                    //increment id and tablelength
                    tableLength = tableLength + 1;
                    let id = tableLength;
                    
                    //compile data into HTML
                    newHTML += '<tr contenteditable = "false" id = "' + data[i].fitness_ID + '"><td>' + data[i].date + '</td>'
                    newHTML += '<td>' + data[i].cardioType + '</td>'
                    newHTML += '<td>' + data[i].cardioDUR + '</td>'
                    newHTML += '<td>' + data[i].liftingSplit + '</td>'
                    newHTML += '<td>' + data[i].liftingDUraiton + '</td>'
                    newHTML += '<td>' + data[i].liftingIntensity + '</td>'
                    if (data[i].weight == 1){
                        newHTML += '<td></td>'
                    }
                    else {
                        newHTML += '<td>' + data[i].weight + '</td>'
                    }
                    
                    newHTML += '<td>' + '<button class=' + 'editbutton' + '>' + 'EDIT' + '</button>' + '</td><tr>'
                }
                
                //set new inner HTML
                tableBody.innerHTML = newHTML;
            }
        }
    }

    function isNumber(str){
        
        for (let i = 0; i < str.length; i ++){
            if (isNaN(str[i])){
                
                return false;
            }
        }
        return true;
    }
    
    function add_Data(day){
        //adding data from form
        const tableBody = document.getElementById("tableData");
        tableLength = tableLength + 1;
        let id = tableLength;

        
        if (!isNumber(day.cardioDur) || !isNumber(day.liftingDuration)){
            alert("Please make sure duration of workouts is entered as a number (eg 45)");
            return -1;
        }
        if (day.liftingDuration.length == 0){
            day.liftingDuration = 0;
        }
        
        if (day.cardioDur.length == 0){
            day.cardioDur = 0;
        }

        //compiling data
        let newHTML = tableBody.innerHTML;
        newHTML += '<tr contenteditable = "false" id = "' + id + '"><td>' + day.date + '</td>'
        newHTML += '<td>' + day.cardioType + '</td>'
        newHTML += '<td>' + day.cardioDur + '</td>'
        newHTML += '<td>' + day.liftingSplit + '</td>'
        newHTML += '<td>' + day.liftingDuration + '</td>'
        newHTML += '<td>' + day.liftingIntensity + '</td>'
        newHTML += '<td>' + day.weight + '</td>'
        newHTML += '<td>' + '<button class=' + 'editbutton' + '>' + 'EDIT' + '</button>' + '</td></tr>'
        
        //set new HTML
        tableBody.innerHTML = newHTML;
        
        //hide form
        //document.getElementById("myForm").style.display = 'none';
        document.getElementById("myForm").style.width = '0%';
        document.getElementById("addData").style.marginRight = '0%';
        document.getElementById("addDataCover").style.display = "none";
        document.getElementById("addData").innerHTML = "Add Data";
        
        let height = $("table").height();
        
        if (document.getElementById("showTableText").innerHTML == "Hide Past Days"){
            document.getElementById("table").style.height = JSON.stringify(height) + "px";
        }
        

        return id;
    }

    function sendData(fitness_ID) {
        //sending data to mysql
        var $headers = $("th");
        
        let id = '#tabledata ' + '#' + fitness_ID + ' td';
        //$(id).each(function);

        let arr = ['date', 'cardioType', 'cardioDUR', 'liftingSplit', 'liftingDUraiton', 'liftingIntensity', 'weight'];

        let row = document.getElementById(fitness_ID.toString());
        
        $cells = $(row).find("td");

        let tableData = {};

        $cells.each(function(cellIndex){
            
            if (cellIndex < arr.length){
                tableData[arr[cellIndex]] = $(this).html();
            }
        });

        tableData["fitness_ID"] = fitness_ID;
        if (tableData['weight'] == ''){
            tableData['weight'] = 1;
        }

        var myObj = {}
        myObj = tableData;
       
       // alert(JSON.stringify(tableData));
        //ajax request
        $.ajax({
            type: "POST",
            url: url = '../ServerSidePHP/processData.php',
            data: JSON.stringify(tableData),
            success: function(msg){
                
            }
        });

    }

    function updateData(fitness_ID) {
        //sending data to mysql
        let id = '#tabledata ' + '#' + fitness_ID + ' td';
        //$(id).each(function);

        let arr = ['date', 'cardioType', 'cardioDUR', 'liftingSplit', 'liftingDUraiton', 'liftingIntensity', 'weight'];

        let row = document.getElementById(fitness_ID);
        //alert(fitness_ID);
        
        $cells = $(row).find("td");

        let tableData = {};


        $cells.each(function(cellIndex){
            
            if (cellIndex < arr.length){
                tableData[arr[cellIndex]] = $(this).html();
            }
        });

        tableData["fitness_ID"] = fitness_ID;

        if (tableData["weight"].length == 0){
            tableData["weight"] = 1;
        }
        
        if (!isNumber(tableData["cardioDUR"]) || !isNumber(tableData["liftingDUraiton"]) || !isNumber(tableData["weight"])){
            alert("Please make sure duration of workouts is entered as a number (eg 45)");
            return -1;
        }

        var myObj = {}
        myObj = tableData;
        
       // alert(JSON.stringify(tableData));url = '../ServerSidePHP/createTable.php';
        //ajax request
        $.ajax({
            type: "POST",
            url: "../ServerSidePHP/updateData.php",
            data: JSON.stringify(tableData),
            success: function(msg){
                //alert("good")
            }
        });

    }



    let dropbox = document.getElementById("cardioType");



    let cardio = ["running", "biking"];

    


    function drop(element, type){
        //event.preventDefault();
        //var data = event.dataTransfer.getData("text");
        let data = element.id;
        

        let more = "";
        if (dropbox.value.length > 0){
            more = ", ";
        } 
        
        
        let img = document.getElementById(data);

       
        
        ////////////////
        //could just get element by id of data
            let box = dropbox;
            
            if (type == "lift"){
                if (img in cardio){
                    return false;
                }
                box = liftbox;
            }
            
            let value = box.value;
            if (value.length == 0){
                value = []
            }
            else {
                value = value.split(", ");
            }

            let newValue = []
            for (let i = 0; i < value.length; i ++){
                if (value[i] == data){
                    img.style.backgroundColor = "white";
                }
                else {
                    newValue.push(value[i]);
                }
            }
            

            if (newValue.length == value.length){
                newValue.push(data);
                img.style.backgroundColor = "gray";
            }
            

            let result = "";
            for (let i = 0; i <newValue.length; i ++){
                if (i>0){
                    result = result + ", " + newValue[i];
                } else {
                    result = result + newValue[i];
                }
            }
            
         
            if (newValue.length == 0){
                result = "";
            }

            
            box.value = result;
    }


   



   

    let liftbox = document.getElementById("liftingSplit");



    
    //showing table data
    let showTable = document.getElementById("showTable");
    showTable.onclick = function() {
       
        if (document.getElementById("table").style.height != "0px" && document.getElementById("table").style.height != ""){
            document.getElementById("table").style.height = "0px";
            document.getElementById("showTableText").innerHTML = "Show Past Days";
            let pointer = document.getElementById("pointer");
            pointer.setAttribute("style", "transform: rotate(" + 0 + "deg)");
        }
        else {
            let height = $("table").height();
            document.getElementById("showTableText").innerHTML = "Hide Past Days";
            document.getElementById("table").style.height = JSON.stringify(height) + "px";
            let pointer = document.getElementById("pointer");
            pointer.setAttribute("style", "transform: rotate(" + 180 + "deg)");
        }
    }


    //lifting/cardio forms
    let liftingButton = document.getElementById("liftingButton");
    liftingButton.onclick = function () {
        document.getElementById("liftingSlide").style.display = 'block';
        document.getElementById("cardioSlide").style.display = 'none';
        document.getElementById("weightSlide").style.display = 'none';


        
        document.getElementById("cardioButton").style.backgroundColor = '#999999';
        document.getElementById("cardioButton").style.opacity = '0.5';

        document.getElementById("liftingButton").style.backgroundColor = 'white';
        document.getElementById("liftingButton").style.opacity = '1';

        document.getElementById("weightButton").style.backgroundColor = '#999999';
        document.getElementById("weightButton").style.opacity = '0.5';

    }

    let cardioButton = document.getElementById("cardioButton");
    cardioButton.onclick = function () {
        document.getElementById("cardioSlide").style.display = 'block';
        document.getElementById("liftingSlide").style.display = 'none';
        document.getElementById("weightSlide").style.display = 'none';



        document.getElementById("liftingButton").style.backgroundColor = '#999999';
        document.getElementById("liftingButton").style.opacity = '0.5';
        
        document.getElementById("cardioButton").style.backgroundColor = 'white';
        document.getElementById("cardioButton").style.opacity = '1';
        
        document.getElementById("weightButton").style.backgroundColor = '#999999';
        document.getElementById("weightButton").style.opacity = '0.5';
    }

    let weightButton = document.getElementById("weightButton");
    weightButton.onclick = function (){
        document.getElementById("cardioSlide").style.display = 'none';
        document.getElementById("liftingSlide").style.display = 'none';
        document.getElementById("weightSlide").style.display = 'block';



        document.getElementById("liftingButton").style.backgroundColor = '#999999';
        document.getElementById("liftingButton").style.opacity = '0.5';
        
        document.getElementById("cardioButton").style.backgroundColor = '#999999';
        document.getElementById("cardioButton").style.opacity = '0.5';
        
        document.getElementById("weightButton").style.backgroundColor = 'white';
        document.getElementById("weightButton").style.opacity = '1';
    }



    let dateInput = document.getElementById('date');
    var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        let date = yyyy + '-' + mm + '-' + dd;

    dateInput.value = date;
    
    


});


