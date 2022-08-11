var menuButton = document.getElementById("nav-Button");
var Sidebar = document.getElementById("nav-links");
var navButtons = document.querySelectorAll("#nav-links button");

menuButton.onclick = function nav() {
    //menuButton.src.match
    if(menuButton.getAttribute('src') =="images/close.svg"){
        closeNav();
        
    } else {
        openNav();
        
    }
   
}


function openNav(){
    menuButton.src = "images/close.svg";
    Sidebar.classList.add("nav-bar-active");


    //showing nav buttons
    navButtons.forEach(menuButtonToggle);
    
}
  
function closeNav() {
    menuButton.src = "images/menu.svg";
    Sidebar.classList.remove("nav-bar-active");

    //hiding nav buttons
    Array.from(navButtons).reverse().forEach(menuButtonToggle);
    
} 

function menuButtonToggle(button,index){
    setTimeout(() => {
        button.classList.toggle("nav-buttons-active");
    }, index*150);
    

}




