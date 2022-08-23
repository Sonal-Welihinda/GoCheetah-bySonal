function toggleFAQ(item){

    var answer = item.nextElementSibling;
    var img = item.children[1];

    answer.classList.toggle("FAQ-Awnser-active");

    if(img.src == window.location.origin+"/images/arrow-down-icon.svg"){
        img.src = window.location.origin+"/images/arrow-up-icon.svg";
    }else{
        img.src = window.location.origin+"/images/arrow-down-icon.svg";
    }

}