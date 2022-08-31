var tabs = document.querySelectorAll("#TabsContent Div");
var submenus = document.getElementsByClassName("sidebar-Submenu");
var navButtons = document.querySelectorAll("#nav-bar > button");
var subMenuButton = document.querySelectorAll("#nav-bar .sidebar-Submenu button");

function switchTabs(ActiveTab,button){
    var IsSubMenu = false;
    
    // show selected tab 
    tabs.forEach(tab=> {
        if(tab.id == ActiveTab){
          
            tab.classList.add("Active-Tab");
        }else{
           
            tab.classList.remove("Active-Tab");
        }
    })

    // finding sub menu button and adding navActive class and removing from other sub menu buttons
    subMenuButton.forEach(sMenu => {

        if(sMenu == button){
            sMenu.classList.add("navActive");
            IsSubMenu = true
        }else{
            sMenu.classList.remove("navActive");
        }
        
    });


    // if submenu is true stop the function
    if(IsSubMenu){
        return;
    }


    // highlight nav button
    navButtons.forEach(nBtn => {
        if(nBtn == button){
            nBtn.classList.add("navActive");
            // for main menus disabling all sub menus
            submenuEnable("null");
        }else{
            nBtn.classList.remove("navActive");
        }
    })


    

}

function subMenuActive(mainMenu){

    var subMenu =  document.querySelector(`[data-SubMenu = ${mainMenu.getAttribute("subMenu")}]`);
    subMenu.firstElementChild.click();

    // finding main menu and adding navActive class 
    navButtons.forEach(nBtn => {

        if(nBtn == mainMenu){
            nBtn.classList.add("navActive");
            
        }else{
            nBtn.classList.remove("navActive");
        }
    })
    
    
    
    


}


function submenuEnable(submenu){

    [...submenus].forEach(sMenu => {
        if(sMenu.getAttribute("data-SubMenu") == submenu){
            sMenu.classList.add("sidebar-Submenu-Active");
        }else{
            sMenu.classList.remove("sidebar-Submenu-Active");
        }
    })
}