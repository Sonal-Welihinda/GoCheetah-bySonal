

var tabs = document.querySelectorAll("#TabsContent Div");
var submenus = document.getElementsByClassName("sidebar-Submenu");
var navButtons = document.querySelectorAll("#nav-bar > button");
var subMenuButton = document.querySelectorAll("#nav-bar .sidebar-Submenu button");

var driversLDropdown = document.querySelector("#driversListContainer .drivers-List-checkbox");
var driverslist = document.querySelectorAll(".drivers-List-checkbox label");

var SalesPiechart = document.getElementById("salesPieCharts");
var IsgoogleChartsLoad = false;

// Api call
const url = "http://localhost:8080/GoCheeta-Server/admin"; 



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

function switchTabs2(ActiveTab){
    // show selected tab 
    tabs.forEach(tab=> {
        if(tab.id == ActiveTab){
          
            tab.classList.add("Active-Tab");
        }else{
           
            tab.classList.remove("Active-Tab");
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

function driversDropdown(){
    driversLDropdown.classList.toggle("Active");
}

// Add admin form branch drop down 
function addAdmin_Branchs(){
    
    
    if(document.getElementById("addAdminAccType").value == "BranchAdmin"){
        document.getElementById("addAdminFormBranchBox").classList.add("Active");
       
    }else{
        document.getElementById("addAdminFormBranchBox").classList.remove("Active");
    }

}

// Update admin form branch drop down 
function updateAdmin_Branchs(){
    
    
    if(document.getElementById("updateAdminAccType").value == "BranchAdmin"){
        document.getElementById("updateAdminFormBranchBox").classList.add("Active");
       
    }else{
        document.getElementById("updateAdminFormBranchBox").classList.remove("Active");
    }

}


function genPassword(inpuutID){
    var genPass = "";
    var PassLen = 10;
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$&%*!+=<>()[]";

    for (let i = 1; i <= PassLen; i++) {
        var Pchar = Math.floor(Math.random()
                    * chars.length+1 );
          
        genPass += chars.charAt(Pchar);
    }

    document.getElementById(inpuutID).value = genPass;

}

// document.addEventListener('click' , (event) => {
//    // closeModal(event);
// });


function openModal(ModalID){
    var modal = document.getElementById(ModalID);
    modal.classList.add("Active");

    modal.addEventListener('click' , (event) => {
       
        if(modal.isSameNode(event.target) || document.querySelector("#"+ModalID+" .close").isSameNode(event.target) || document.querySelector("#"+ModalID+" input[type='reset']").isSameNode(event.target)){
            modal.classList.remove("Active");
            modal.removeEventListener('click', this);
           
        }
    });

}


function FAQModal_Set(FAQItem){
    document.getElementById("UpdateFAQModalQip").value = FAQItem.children[0].children[1].innerText;
    document.getElementById("UpdateFAQModalAip").value = FAQItem.children[1].children[1].innerText;
}



// pie chart gen


function ShowSales(){
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);

    new ResizeObserver( function(){ 
        if(IsgoogleChartsLoad){
            drawChart();
        }
        
    }).observe(SalesPiechart);
}

function drawChart() {
    IsgoogleChartsLoad = true;
    var data = google.visualization.arrayToDataTable([
        ['Task', 'Hours per Day'],
        ['Work', 3238],
        ['Eat', 22323],
        ['TV', 4323],
        ['Gym', 233],
        ['Sleep', 8]
    ]);

    var options = {'title':'My Average Day',
                    width: SalesPiechart.clientWidth,
                    height: SalesPiechart.clientHeight,
                    axisTitlesPosition: 'out',
                    sliceVisibilityThreshold:0,
                    tooltip: { trigger: 'selection' },
                    legend: 
                    {
                        position: 'left',
                        labeledValueText: 'both',
                        textStyle: 
                            {
                            color: 'blue',
                            fontSize: 16
                            },
                        alignment:'center'
                    },
                    chartArea: {
                       
                        height: "96%",
                        width: "96%"
                    }
  };

  var chart = new google.visualization.PieChart(SalesPiechart);


    function mouseOverHandler(selection) {
        chart.setSelection([{row: selection.row}]);
    }

    function mouseOutHandler() {
        chart.setSelection();
    }

    google.visualization.events
      .addListener(chart, 'onmouseover', mouseOverHandler);
    google.visualization.events
      .addListener(chart, 'onmouseout', mouseOutHandler);


   chart.draw(data, options);
}






// Backend

var Admins;



//Set admin update data
function setAdminData(id){
    var admin; 
    for(adm of Admins) {
        if(adm.id == id){
            admin = adm;
        }    
    }
    
    document.getElementById("updateAdminFormID").innerHTML = id;
    document.getElementById("updateAdminFormName").value = admin.name;
    document.getElementById("updateAdminFormEmail").value = admin.email;
    document.getElementById("updateAdminFormPNum").value = admin.phoneNumber;
    document.getElementById("updateAdminFormAddress").value = admin.address;
    document.getElementById("updateAdminFormDOB").value = admin.DOB;
    document.getElementById("updateAdminAccType").value = admin.AccType;
    document.getElementById("updateAdminAccType").onchange();
    document.getElementById("updateAdminBranch").value = admin.branch;
    
    if(admin.gender == "Male"){
        document.getElementById("updateAdminFormMale").checked = true;
    }else{
        document.getElementById("updateAdminFormFemale").checked = true;
    }
    document.getElementById("updateAdminFormUsername").value = admin.username;
    
    
    
    
    console.log(admin);
}



function ValidateForm(form){
   return form.reportValidity();
}


// Add Admin 
function addAdmin(){
    var form = document.getElementById("addAdminForm");

    var Simplevalid = ValidateForm(form);

    if(!Simplevalid){
        return;
    }

    var name = document.getElementById("addAdminFormName");
    var email = document.getElementById("addAdminFormEmail");
    var pNumber = document.getElementById("addAdminFormName");
    var address = document.getElementById("addAdminFormAddress");
    var DOB = document.getElementById("addAdminFormDOB");
    var AccType = document.getElementById("addAdminAccType");
    var branch = document.getElementById("addAdminBranch");
    var genderRB = document.getElementById("addAdminFormMale");
    var username = document.getElementById("addAdminFormUsername");
    var password = document.getElementById("addAdminFormPassword");
    var gender;
    
    if(AccType.value !="BranchAdmin"){
        branch = "";
        
    }
    
    if(genderRB.checked){
        gender = "Male";
    }else{
        gender = "Female"
    }
    

    const admin = {
        "name" : name.value,
        "email" : email.value,
        "phoneNumber" : pNumber.value,
        "address" : address.value,
        "DOB" : DOB.value,
        "AccType" : AccType.value,
        "branch" : branch,
        "gender": gender,
        "username" : username.value,
        "password" : password.value
        
    };
    
    const options = {
        method: "POST",
        headers: {
            "content-type" : "application/json"
        },
        body: JSON.stringify(admin)
    };


    fetch(url, options);
    
    

}




async function getAdmins(){
    var data = await fetch(url);
    Admins = await data.json();
    document.querySelector("#adminTable tbody").innerHTML = "";
    Array.prototype.forEach.call(Admins,(admin => {
        document.querySelector("#adminTable tbody").innerHTML += 
                        "<tr onclick=\"switchTabs2('updateAdminTab');\" >\n" +
                            "<td>"+admin.id+"</td>\n" +
                            "<td>"+admin.name+"</td>\n" +
                            "<td>"+admin.username+"</td>\n" +
                            "<td>"+admin.email+"</td>\n" +
                            "<td>"+admin.phoneNumber+"</td>\n" +
                            "<td>"+admin.address+"</td>\n" +
                            "<td>"+admin.DOB+"</td>\n" +
                            "<td>"+admin.AccType+"</td>\n" +
                            "<td>"+admin.branch+"</td>\n" +
                            "<td>"+admin.gender+"</td>\n" +
                            
                        "</tr>";
                console.log(admin);;
    }));
    
    setAdminData(1);
    
}


async function UpdateAdmin(){
    var data = await fetch(url);
    Admins = await data.json();
    document.querySelector("#adminTable tbody").innerHTML = "";
    Array.prototype.forEach.call(Admins,(admin => {
        document.querySelector("#adminTable tbody").innerHTML += 
                        "<tr onclick=\"switchTabs2('updateAdminTab');\" >\n" +
                            "<td>"+admin.id+"</td>\n" +
                            "<td>"+admin.name+"</td>\n" +
                            "<td>"+admin.username+"</td>\n" +
                            "<td>"+admin.email+"</td>\n" +
                            "<td>"+admin.phoneNumber+"</td>\n" +
                            "<td>"+admin.address+"</td>\n" +
                            "<td>"+admin.DOB+"</td>\n" +
                            "<td>"+admin.AccType+"</td>\n" +
                            "<td>"+admin.branch+"</td>\n" +
                            "<td>"+admin.gender+"</td>\n" +
                            
                        "</tr>";
    }));
    
}

