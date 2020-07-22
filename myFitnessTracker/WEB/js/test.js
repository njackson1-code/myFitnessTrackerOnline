$(document).ready(function () {

    let menubar = document.getElementById("menubaricon");
    menubar.onclick = function () {
        let whiteCover = document.getElementById("whiteMenuCover").style.display;
        if (whiteCover == "block") {
            document.getElementById("whiteMenuCover").style.display = "none";
            document.getElementById("sideMenu").style.width = "0";
            menubar.setAttribute("style", "transform: rotate(" + 0 + "deg)");
        }
        else {
            document.getElementById("whiteMenuCover").style.display = "block";
            document.getElementById("sideMenu").style.width = "15%";
            menubar.setAttribute("style", "transform: rotate(" + 90 + "deg)");
        }
    }



 

























});