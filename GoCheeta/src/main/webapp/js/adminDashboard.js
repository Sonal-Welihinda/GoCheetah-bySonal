var tabs = document.querySelectorAll("#TabsContent Div");

function switchTabs(ActiveTab){

    console.log("running");
    tabs.forEach(tab=> {
        if(tab.id == ActiveTab){
          
            tab.classList.add("Active-Tab");
        }else{
           
            tab.classList.remove("Active-Tab");
        }
    })


}