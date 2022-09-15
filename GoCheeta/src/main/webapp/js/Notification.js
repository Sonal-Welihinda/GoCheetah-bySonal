var timer;

function ShowNotification (type, Msg){
    clearTimeout(timer);
    timer = "";
    if(type=="error"){
        document.getElementById("AlertIcon").src = "images/red-alert-icon.svg";
        document.getElementById("AlertMsg").innerHTML = Msg;
        document.getElementById("AlertBox").style.backgroundColor = "#fd6161";
    }else{
        document.getElementById("AlertIcon").src = "images/green-checkmark-icon.svg";
        document.getElementById("AlertMsg").innerHTML = Msg;
        document.getElementById("AlertBox").style.backgroundColor = "#e5ffbd";
    }

    document.getElementById("AlertBox").classList.add("Active");

    timer = setTimeout(() => {
        document.getElementById("AlertBox").classList.remove("Active");
    },3000);


    
}

function mouseOverAlert(){
    clearTimeout(timer);
}

function mouseOutAlert(){
    
    timer = "";
    timer = setTimeout(() => {
        document.getElementById("AlertBox").classList.remove("Active");
    },2000);
}
