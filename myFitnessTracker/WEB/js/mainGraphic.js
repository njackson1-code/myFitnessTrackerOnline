$(document).ready(function () {

   
   
    let ids = ['goalsGraphic', 'workGraphic','progressGraphic'];
    let fontS = ['goalsF', 'workF','progressF'];
    
    

    let clickedCircle = {};
    let selected = false;
    let link = "";

    let positions = {};
    let top = "goalsGraphic";
    let amount = 1;
    let last = "progressGraphic";
    let xs = [];
    let ys = [];
    
    //design();

    function design(){
        let r = 250;
        for (let i = 0; i < ids.length; i ++){
            id = ids[i];
            let element = document.getElementById(id);

            
            let rotation =  2 * i * Math.PI/(ids.length) + Math.PI/2 - 2*Math.PI/3;
            top = id;
            
            console.log(rotation)

            let x = Math.cos(rotation) * 250;
            let y = Math.sin(rotation) * 250;

            //console.log(x + ',' + y);

            
            element.style.right = 250-x - 25+ "px";
            element.style.top = 250-y - 25+ "px";

            positions[id] = [x,y];

            
        }

        let newFirst = ids[2];
        for (let i = 1; i < 3; i ++){
            ids[i] = ids[i-1];
        }
        ids[0] = newFirst;
    }


    let time = setInterval(rotate, 4000);
    
    document.getElementById("graphicContainer").style.height = document.getElementById("graphicContainer").style.width + "px";
     ///clearTimeout(time);

    const cssrotfn = a=>`transform: rotate(${a}deg) translate(250px) rotate(${-a}deg)`
    const cssrotbyidx = (idx, len)=>cssrotfn(idx * 360/len + 30) 

    
    document.getElementById("box1").setAttribute("style", "transition: all 1.75s ease-in");
    document.getElementById("box2").setAttribute("style", "transition: all 1.75s ease-in");
    document.getElementById("box3").setAttribute("style", "transition: all 1.75s ease-in");
    let shrink = -2;
    rotate();

     function rotate(){
         if (shrink == 2){
             shrink = -1;
         }

        shrink = shrink + 1;
        let growth = shrink + 1;
        if (shrink == 2){
            growth = 0;
        }
        
        if (shrink != -1){
            let shrinkID = ids[shrink];
            document.getElementById(shrinkID).style.width = "50px";
        document.getElementById(shrinkID).style.height = "auto"; 
        document.getElementById(shrinkID).style.marginTop = "0px";
        document.getElementById(fontS[shrink]).style.fontSize = "12px";
        document.getElementById(shrinkID).style.marginLeft = "-25%";
        
        }
        
        let growthID = ids[growth];

        //document.getElementById("graphicContainer").setAttribute("style", "background: radial-gradient("+ colors[growth] + ", white)");
       // background: radial-gradient(blueviolet, white);

        document.getElementById(growthID).style.width = "250px";
        document.getElementById(growthID).style.height = "auto";
        document.getElementById(growthID).style.marginTop = "125px";
        document.getElementById(fontS[growth]).style.fontSize = "25px";
        document.getElementById(growthID).style.marginLeft = "-50%";


        //document.getElementById("graphicContainer").setAttribute("style", "transform: rotate(" + amount*2*Math.PI/(ids.length).toString() + "rad)");
        
       
        document.getElementById("box1").setAttribute("style", cssrotbyidx(1+amount,3));
        document.getElementById("box3").setAttribute("style", cssrotbyidx(2+amount,3));
        document.getElementById("box2").setAttribute("style", cssrotbyidx(3+amount,3));

        amount = amount + 1;
        last = top;

        //setTimeout(rotate, 3000);

     }





     // Handle page visibility change events
    function handleVisibilityChange() {
        if (document.visibilityState == "hidden") {
            clearTimeout(time)
        } else {
            rotate();
            time = setInterval(rotate, 4000);
        }
    }
  
    document.addEventListener('visibilitychange', handleVisibilityChange, false);























});