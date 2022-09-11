function EnableEditProfile(){
    
    var form = document.getElementById("profileForm");

    var IsReadonly = false;

    var readOnlyInput = form.querySelectorAll("input, textarea");
    
    IsReadonly = !readOnlyInput[0].hasAttribute('readonly');

    for(item of readOnlyInput){
        if(IsReadonly){
            item.readOnly = true;
        }else{
            item.readOnly = false;
        }
    }

    

    if(IsReadonly){
        document.getElementById("profileForGContainer").setAttribute("disabled","disabled");
    }else{
        document.getElementById("profileForGContainer").removeAttribute("disabled");
    }
    console.log(IsReadonly);
    
    document.getElementById("profileFormButtons").classList.toggle("Active");
    document.getElementById("profileTabEditBtn").classList.toggle("Active");


}