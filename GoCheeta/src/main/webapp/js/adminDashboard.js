

var tabs = document.querySelectorAll("#TabsContent Div");
var submenus = document.getElementsByClassName("sidebar-Submenu");
var navButtons = document.querySelectorAll("#nav-bar > button");
var subMenuButton = document.querySelectorAll("#nav-bar .sidebar-Submenu button");

var driversLDropdown = document.querySelector(".drivers-List-Container .drivers-List-checkbox");
var driversLUpdateDropdown = document.querySelector("#UpdateVehicleDriverList .drivers-List-checkbox");
var driverslist = document.querySelectorAll(" .drivers-List-checkbox label");

var SalesPiechart = document.getElementById("salesPieCharts");
var IsgoogleChartsLoad = false;

// Api call
const admin_url = "http://localhost:8080/GoCheeta-Server/admin/"; 
const branch_Url ="http://localhost:8080/GoCheeta-Server/branch/"; 
const FileServerApi ="http://localhost:8080/GoCheeta-Server/FileService/"; 
const VehicleCategory_url ="http://localhost:8080/GoCheeta-Server/Vehicle/Category/";
const Vehicle_url ="http://localhost:8080/GoCheeta-Server/Vehicle/";
const Driver_url ="http://localhost:8080/GoCheeta-Server/Drtver/";
const Location_url ="http://localhost:8080/GoCheeta-Server/Location/";

// Backend
var Admins,Branches,VCategories,Vehicles,Drivers,Locations;



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

function VUpdatedriversDropdown(){
    document.querySelector("#UpdateVehicleDriverList .drivers-List-checkbox").classList.toggle("Active");
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
        
        if(modal.isSameNode(event.target) || event.target.isSameNode(document.querySelector("#"+ModalID+" .close")) || event.target.isSameNode(document.querySelector("#"+ModalID+" input[type='reset']"))){
            modal.classList.remove("Active");
            modal.removeEventListener('click', this);
           
        }
    });

}

function closeModal(ModalID){
    document.querySelector("#"+ModalID+" .close").click();
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
        ['Kandy', 3238],
        ['Galle', 22323],
        ['Nugegoda', 4323],
        ['Gampaha', 233],
        ['Kurunegala', 8]
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

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}


function SetupAdminPanel(){
    var AccType = getCookie("AdminType");

    if(AccType =="BranchAdmin"){
        document.getElementById("navAdminTabBtn").style.display = "none";

    }
}



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
    document.getElementById("updateAdminFormPassword").value = admin.password;
    if(admin.gender == "Male"){
        document.getElementById("updateAdminFormMale").checked = true;
    }else{
        document.getElementById("updateAdminFormFemale").checked = true;
    }
    document.getElementById("updateAdminFormUsername").value = admin.username;
    
    DropdownBranch('updateAdminBranch', true).then(()=>{
        document.getElementById("updateAdminBranch").value = admin.branch;
    });

    
    
    
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
    var pNumber = document.getElementById("addAdminFormPNum");
    var address = document.getElementById("addAdminFormAddress");
    var DOB = document.getElementById("addAdminFormDOB");
    var AccType = document.getElementById("addAdminAccType");
    var branchDropdown = document.getElementById("addAdminBranch");
    var genderRB = document.getElementById("addAdminFormMale");
    var username = document.getElementById("addAdminFormUsername");
    var password = document.getElementById("addAdminFormPassword");
    var gender, branch;
    
    if(AccType.value !="BranchAdmin"){
        branch = "";
    }else{
        branch = branchDropdown.value;
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


    fetch(admin_url, options).then((response) => {
        if(response.status == 201){
            ShowNotification("Success", "Admin was addeed");
        }else if(response.status == 501){
            ShowNotification("Success", response.statusText);
        }
    });
    
    

}




async function getAdmins(){
    var data = await fetch(admin_url);
    Admins = await data.json();
    document.querySelector("#adminTable tbody").innerHTML = "";
    Array.prototype.forEach.call(Admins,(admin => {
        document.querySelector("#adminTable tbody").innerHTML += 
                        "<tr onclick=\"switchTabs2('updateAdminTab'); setAdminData("+admin.id+");\" >\n" +
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


async function UpdateAdmin(){
    
    var form = document.getElementById("updateAdminForm");

    var Simplevalid = ValidateForm(form);

    if(!Simplevalid){
        return;
    }
    var id = document.getElementById("updateAdminFormID").innerText;
    var name = document.getElementById("updateAdminFormName");
    var email = document.getElementById("updateAdminFormEmail");
    var pNumber = document.getElementById("updateAdminFormPNum");
    var address = document.getElementById("updateAdminFormAddress");
    var DOB = document.getElementById("updateAdminFormDOB");
    var AccType = document.getElementById("updateAdminAccType");
    var branchDropdown = document.getElementById("updateAdminBranch");
    var genderRB = document.getElementById("updateAdminFormMale");
    var username = document.getElementById("updateAdminFormUsername");
    var password = document.getElementById("updateAdminFormPassword");
    var gender, branch;
    
    if(AccType.value !="BranchAdmin"){
        branch = null;
    }else{
        branch = branchDropdown.value;
    }
    
    if(AccType.value =="BranchAdmin"&&branchDropdown.value == ""){
        ShowNotification("error", "Please Selected Branch");
        return;
    }

    if(genderRB.checked){
        gender = "Male";
    }else{
        gender = "Female"
    }
    
    const admin = {
        "id" : id,
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


    fetch(admin_url+"update", options).then((response) => {
        if(response.status == 201){
            ShowNotification("Success", "Admin was Updated");
        }else if(response.status == 501){
            ShowNotification("error", response.statusText);
        }
    });
    
}


function deleteAdmin(){
    
    var id = document.getElementById("updateAdminFormID").innerText;
    const options = {
        method: "DELETE"
    };
    
    
    fetch(admin_url + id, options).then((response) => {
        
        if(response.status == 201){
            ShowNotification("Success", "Admin Deleted");
        }else if(response.status == 501){
            ShowNotification("error", response.statusText);
        }
        setDataAdminTab();
    });

}

async function FilterAdmins(){
    var branchDropdown = document.getElementById("adminBranchs");
    var AccTypeDropDown = document.getElementById("adminAccType");
    var AdminSearch = document.getElementById("AdminSearch").value;
    
    var branchID ="",AccType = "";

    if(branchDropdown.selectedIndex==0&&AccTypeDropDown.selectedIndex==0&&AdminSearch == ""){
        setDataAdminTab();
        return;
    }

    if(branchDropdown.selectedIndex>0){
        branchID = branchDropdown.value;
    }

    if(AccTypeDropDown.selectedIndex>0){
        AccType = AccTypeDropDown.value;
    }
    
    if(AdminSearch == ""){
        AdminSearch = "";
    }
    
    if(AccTypeDropDown.selectedIndex == 1){
        branchDropdown.value = "";
        branchID = "";
    }

    if(branchID.trim() != ""){
        AccTypeDropDown.value ="BranchAdmin";
        AccType = AccTypeDropDown.value ;
    }

    
    
    // const options = {
    //     method: "GET"
    // };
    //var data = await fetch(admin_url+"?"+branchID+"/"+AccType+"/"+AdminSearch);
    // var query = "branchID:"+branchID+"/"+AccType+"/"+AdminSearch;
    var data = await fetch(admin_url+"FilterAdmin?"+new URLSearchParams({'branchID':branchID, 'AccType':AccType, 'SearchTxt':AdminSearch }));
    Admins = await data.json();
    document.querySelector("#adminTable tbody").innerHTML = "";
    Array.prototype.forEach.call(Admins,(admin => {
        document.querySelector("#adminTable tbody").innerHTML += 
                        "<tr onclick=\"switchTabs2('updateAdminTab'); setAdminData("+admin.id+");\" >\n" +
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

function setDataAdminTab(){
    getAdmins();
    DropdownBranch("adminBranchs", false);
    
}

async function DropdownBranch(htmlID, notNull){
    
    await getBranches();
    var branchDropdown = document.getElementById(htmlID);
    branchDropdown.innerHTML ="";
    

    if(!notNull){
        branchDropdown.innerHTML += "<option value=\"\">Select Branch</option> \n";
    }
    

    for(brnch of Branches){
        branchDropdown.innerHTML += "<option value=\""+brnch.BranchID+"\">"+brnch.City+"</option> \n";
    }
}



//Branch

//Set branch update data
function setBranchData(id){
    var branch; 
    for(brcnh of Branches) {
        if(brcnh.BranchID == id){
            branch = brcnh;
        }    
    }
    
    document.getElementById("updateBranchID").innerHTML = branch.BranchID;
    document.getElementById("updateBranchName").value = branch.Name;
    document.getElementById("updateBranchCnum").value = branch.PhoneNumber;
    document.getElementById("updateBranchAddress").value = branch.Address;
    document.getElementById("updateBranchCity").value = branch.City;
    document.getElementById("updateBranchLat").value = branch.Latitude;
    document.getElementById("updateBranchLon").value = branch.Longitude;
    document.getElementById("updateBranchStatus").checked = branch.Status;
    
    
   
}


function AddBranch(){
    var form = document.getElementById("branchAddModalForm");

    var Simplevalid = ValidateForm(form);

    if(!Simplevalid){
        return;
    }
    
    
    var name = document.getElementById("addBranchName");
    var pNumber = document.getElementById("addBranchCnum");
    var address = document.getElementById("addBranchAddress");
    var city = document.getElementById("addBranchCity");
    var latitude = document.getElementById("addBranchLat");
    var longitude = document.getElementById("addBranchLon");
    var status = document.getElementById("addBranchStatus");

    
    

    const branch = {
        
        "Name" : name.value,
        "PhoneNumber" : pNumber.value,
        "Address" : address.value,
        "City" : city.value,
        "Latitude" : latitude.value,
        "Longitude" : longitude.value,
        "Status": status.checked
        
    };
    
    const options = {
        method: "POST",
        headers: {
            "content-type" : "application/json"
        },
        body: JSON.stringify(branch)
    };


    fetch(branch_Url, options).then((response) => {
        
        if(response.status == 201){
            ShowNotification("Success", "Branch Created");
        }else if(response.status == 501){
            ShowNotification("Error", response.statusText);
        }

        getBranches();

    });
}

async function getBranches(){
    var data = await fetch(branch_Url);
    Branches = await data.json();
}


async function ShowBranches(){
    // var data = await fetch(branch_Url);
    // Branches = await data.json();
    await getBranches();
    document.querySelector("#branchTable tbody").innerHTML = "";
    Array.prototype.forEach.call(Branches,(Branch => {
        document.querySelector("#branchTable tbody").innerHTML += 
                        "<tr onclick=\"openModal('branchUpdateModal'); setBranchData('"+Branch.BranchID+"'); \" >\n" +
                            "<td>"+Branch.BranchID+"</td>\n" +
                            "<td>"+Branch.Name+"</td>\n" +
                            "<td>"+Branch.PhoneNumber+"</td>\n" +
                            "<td>"+Branch.Address+"</td>\n" +
                            "<td>"+Branch.City+"</td>\n" +
                            "<td>"+Branch.Latitude+"</td>\n" +
                            "<td>"+Branch.Longitude+"</td>\n" +
                            "<td>"+Branch.Status+"</td>\n" +
                            
                            
                        "</tr>";
                
    }));
    
}


function UpdateBranch(){
    var form = document.getElementById("branchUpdateModalForm");
    var Simplevalid = ValidateForm(form);
    if(!Simplevalid){
        return;
    }
    
    var id = document.getElementById("updateBranchID").innerText;
    var name = document.getElementById("updateBranchName");
    var pNumber = document.getElementById("updateBranchCnum");
    var address = document.getElementById("updateBranchAddress");
    var city = document.getElementById("updateBranchCity");
    var latitude = document.getElementById("updateBranchLat");
    var longitude = document.getElementById("updateBranchLon");
    var status = document.getElementById("updateBranchStatus");
    
    
    const branch = {
        "BranchID" : id,
        "Name" : name.value,
        "PhoneNumber" : pNumber.value,
        "Address" : address.value,
        "City" : city.value,
        "Latitude" : latitude.value,
        "Longitude" : longitude.value,
        "Status" : status.checked
        
    };
    
    const options = {
        method: "PUT",
        headers: {
            "content-type" : "application/json"
        },
        body: JSON.stringify(branch)
    };


    fetch(branch_Url, options).then((response) => {
        if(response.status == 201){
            ShowNotification("Success", "Branch Updated");
        }else if(response.status == 501){
            ShowNotification("error", response.statusText);
        }

        closeModal('branchUpdateModal');
        getBranches();
    });
}

function DeleteBranch(){
    var id = document.getElementById("updateBranchID").innerText;
    const options = {
        method: "DELETE"
    };
    
    
    fetch(branch_Url + id, options).then((response) => {
        
        if(response.status == 201){
            ShowNotification("Success", "Branch Deleted");
        }else if(response.status == 501){
            ShowNotification("error", response.statusText);
        }

        closeModal('branchUpdateModal');
        getBranches();
    });
}

// Add Location

async function AddLocation(){
    var branch = document.getElementById("locationAddForm_Branch");
    var source = document.getElementById("locationAddForm_Source");
    var destination = document.getElementById("locationAddForm_Destination");
    var Distance = document.getElementById("locationAddForm_Distance");

    const Location = {
        "branchID":branch.value,
        "source":source.value,
        "destination":destination.value,
        "Distance":Distance.value,
    }

    const options = {
        method: "POST",
        headers: {
            "content-type" : "application/json"
        },
        body: JSON.stringify(Location)
    };

    var response = await fetch(Location_url,options);

    if(response.status == 201){
        ShowNotification("Success", "Location added");
    }else if(response.status == 501){
        var msg = await response.text();
        ShowNotification("error", response.msg);
    }

    closeModal('locationAddModal');


}

async function getLocation(){
    var data = await fetch(Location_url);
    Locations = await data.json();
}

async function ShowLocation(){
    await getLocation();

    document.querySelector("#locationTable tbody").innerHTML = "";
    Array.prototype.forEach.call(Locations,(Loction => {
  
        document.querySelector("#locationTable tbody").innerHTML += 
                        "<tr onclick=\"switchTabs2('updateVehicleTab');\" >\n" +
                            "<td>"+Loction.locationID+"</td>\n" +
                            "<td>"+Loction.BranchCity+"</td>\n" +
                            "<td>"+Loction.source+"</td>\n" +
                            "<td>"+Loction.destination+"</td>\n" +
                            "<td>"+Loction.Distance+"</td>\n" +
                  
     
                        "</tr>";

             
                
    }));


}


// Vehicle Category

// fileUpload
async function fileUpload(imgElement){
    
    
    return new Promise((resolve, reject) => {
        var fileR = new FileReader();    
        fileR.onload = function(e) {

            resolve(fileR.result);

        };
        fileR.readAsDataURL(imgElement.files[0]);

    })
   
}


async function addVCategory(){
    var vCateogryIcon = document.getElementById("addVCategoryModalIcon");
    var vCategoryName = document.getElementById("addVCategoryModalName");
    var Imgfile = await fileUpload(vCateogryIcon);
    
    const VehicleCategory = {
        "ImageFileLocation": Imgfile,
        "CategoryName":vCategoryName.value
        
    }
    
    
    const options = {
        method: "POST",
        headers: {
            "content-type" : "application/json"
        },
        body: JSON.stringify(VehicleCategory)
    };
    
    
    fetch(VehicleCategory_url, options).then((response) => {
        
        if(response.status == 201){
            ShowNotification("Success", "Branch Created");
        }else if(response.status == 501){
            ShowNotification("Error", response.statusText);
        }

    });
   
}

async function getVCategories(){
    var data = await fetch(VehicleCategory_url);
    VCategories = await data.json();
}

function setVCategory(id){
    var vCategory; 
    for(Category of VCategories) {
        if(Category.categoryID == id){
            vCategory = Category;
        }    
    }
    
    document.getElementById("updateVCategoryModalID").innerHTML = vCategory.categoryID;
    document.getElementById("updateVCategoryModalImg").src = vCategory.ImageBase64;
    document.getElementById("updateVCategoryModalName").value = vCategory.CategoryName;
}

async function ShowVCategoies(){
    await getVCategories();
    document.querySelector("#categoryVehicleTable tbody").innerHTML = "";
    Array.prototype.forEach.call(VCategories,(vCategory => {
  
        document.querySelector("#categoryVehicleTable tbody").innerHTML += 
                        "<tr onclick=\"openModal('updateVCategoryModal'); setVCategory("+vCategory.categoryID+") \" >\n" +
                            "<td>"+vCategory.categoryID+"</td>\n" +
                            "<td> <img src=\""+vCategory.ImageBase64+"\"></td>\n" +
                            "<td>"+vCategory.CategoryName+"</td>\n" +
                            
                            
                            
                        "</tr>";

             
                
    }));
}

async function changeCateogryImage(){
    var categoryFileBtn = document.getElementById("updateVCategoryModalIconBtn");
    var CategoryImgBox = document.getElementById("updateVCategoryModalImg");
    var Imgfile = await fileUpload(categoryFileBtn);
    CategoryImgBox.src = Imgfile;

}

async function updateVCategory(){
    var categoryFileBtn = document.getElementById("updateVCategoryModalIconBtn");
    var categoryName = document.getElementById("updateVCategoryModalName");
    var categoryID = document.getElementById("updateVCategoryModalID").innerText;
    var vCategory; 
    var Imgfile ="";
    var imgUpdated = false;

    if(categoryFileBtn.files.length != 0){
        var imgUpdated = true;
        Imgfile = await fileUpload(categoryFileBtn);
    }
    
    
    for(Category of VCategories) {
        if(Category.categoryID == categoryID){
            vCategory = Category;
        }    
    }
    

    const VehicleCategory = {
        "categoryID":categoryID,
        "ImageFileLocation": vCategory.ImageFileLocation,
        "CategoryName":categoryName.value,
        "ImageBase64":Imgfile,
        "ImageUpdated":imgUpdated
        
    }
    
    
    const options = {
        method: "PUT",
        headers: {
            "content-type" : "application/json"
        },
        body: JSON.stringify(VehicleCategory)
    };
    
    
    var response = await fetch(VehicleCategory_url, options);
    if(response.status == 201){
        var msg = await response.text();
        ShowNotification("Success", msg);
    }else if(response.status == 501){
        ShowNotification("Error", response.statusText);
    }

}

// 
//   Vehicle ---------- Backend
// 
// 

async function getVehicles(){
    var data = await fetch(Vehicle_url);
    Vehicles = await data.json();
}


async function DrowdownVehicleCategories(htmlID,notNull){
    await getVCategories();

    var branchDropdown = document.getElementById(htmlID);
    branchDropdown.innerHTML ="";
    

    if(!notNull){
        branchDropdown.innerHTML += "<option value=\"\">Select Branch</option> \n";
    }
    

    for(vCateogry of VCategories){
        branchDropdown.innerHTML += "<option value=\""+vCateogry.categoryID+"\">"+vCateogry.CategoryName+"</option> \n";
    }


}

async function ShowVehicle(){
    await getVehicles();
    document.querySelector("#vehicleTable tbody").innerHTML = "";
    Array.prototype.forEach.call(Vehicles,(vehicle => {
  
        document.querySelector("#vehicleTable tbody").innerHTML += 
                        "<tr onclick=\"switchTabs2('updateVehicleTab'); setVehicleUpdateData('"+vehicle.PlateNumber+"'); \" >\n" +
                            "<td>"+vehicle.PlateNumber+"</td>\n" +
                            "<td>"+vehicle.Name+"</td>\n" +
                            "<td class=\"vehicle-Image\"> <img src=\""+vehicle.ImageBase64+"\"></td>\n" +
                            "<td>"+vehicle.Seat+"</td>\n" +
                            "<td>"+vehicle.Color+"</td>\n" +
                            "<td>"+vehicle.BranchID+"</td>\n" +
                            "<td>"+vehicle.CategoryID+"</td>\n" +
                            "<td>"+vehicle.Status+"</td>\n" +
     
                        "</tr>";

             
                
    }));
}



function setSelectedDrivers(dropbox,listBox){
    var drowdownBoxText = document.querySelector("#"+dropbox+" span");
    var count = document.querySelectorAll( "#"+listBox+" input:checked");

    drowdownBoxText.innerHTML =count.length+" Drivers Selected";

    return count;
}


async function setVehicleAddData(){
    await getDrivers();

    driversLDropdown.innerHTML = "";
    for(driver of Drivers){
        driversLDropdown.innerHTML +=   "<label>" +
                                            "<input type=\"checkbox\" value=\""+driver.id+"\" >" +
                                            "<span>"+driver.Name+"</span>" +
                                        "</label>" ;
    }


    DropdownBranch("addVFormVehicleBranch", true);
    DrowdownVehicleCategories("addVFormVehicleCategory", true);


}

// Insert vehicle
async function addVehicle(){
    var form = document.getElementById("addVehicleForm");
    var Simplevalid = ValidateForm(form);
    if(!Simplevalid){
        return;
    }

    var Drivers = getSelectedDriverArray('#addVdriverDropDBox','#addVehicleDriverList');
    var VehicleName = document.getElementById("addVFormVehicleName");
    var plateNum = document.getElementById("addVFormVehiclePlateNum");
    var BranchID = document.getElementById("addVFormVehicleBranch");
    var CategoryID = document.getElementById("addVFormVehicleCategory");
    var Seat = document.getElementById("addVehicleNumSeats");
    var Color = document.getElementById("addVehicleColour");

    var vehicleImg = document.getElementById("addVFormVehicleImage");
    var Imgfile = await fileUpload(vehicleImg);

    const Vehicle = {
        "Name": VehicleName.value,
        "ImageBase64": Imgfile,
        "Color": Color.value,
        "PlateNumber": plateNum.value,
        "BranchID": BranchID.value,
        "CategoryID": CategoryID.value,
        "Seat": Seat.value,
        "DriverIds": Drivers,
        "Status": "Available"

    }

    const options = {
        method: "POST",
        headers: {
            "content-type" : "application/json"
        },
        body: JSON.stringify(Vehicle)
    };

    var response = await fetch(Vehicle_url, options);

    if(response.status == 201){
        ShowNotification("Success", "Driver addeed");
    }else if(response.status == 501){
        var errorMsg = await response.text();
        ShowNotification("error", errorMsg);
    }



}
// get selected Drivers
function getSelectedDriverArray(dropbox,listBox){
    var selected = setSelectedDrivers(dropbox,listBox);
    var driverID = [];

    for (let i = 0; i < selected.length; i++) {
        driverID[i] = selected[i].value;
        
    }

    return driverID;

}

// set vehicle data to vehicle update tab
async function setVehicleUpdateData(PlateNumber){
    await getVehicles();
    var Vehicle = await Vehicles.find((driver) => driver.PlateNumber ==PlateNumber );
    await getDrivers();

    driversLUpdateDropdown.innerHTML = "";
    for(driver of Drivers){
        driversLUpdateDropdown.innerHTML += "<label>" +
                                                "<input type=\"checkbox\" "+(Vehicle.DriverIds.includes(driver.id)? "checked":"")+" value=\""+driver.id+"\" >" +
                                                "<span>"+driver.Name+"</span>" +
                                            "</label>" ;
    }


    DropdownBranch("updateVFormVehicleBranch", true);
    DrowdownVehicleCategories("updateVFormVehicleCategory", true);

    document.getElementById("updateVFormVehicleName").value = Vehicle.Name;
    document.getElementById("updateVFormVehicleImageBox").src = Vehicle.ImageBase64;
    document.getElementById("updateVFormVehiclePlateNum").value = Vehicle.PlateNumber;
    document.getElementById("updateVFormVehicleBranch").value = Vehicle.BranchID;
    document.getElementById("updateVFormVehicleCategory").value = Vehicle.CategoryID;
    document.getElementById("updateVehicleColour").value = Vehicle.Color;
    document.getElementById("updateVehicleNumSeats").value = Vehicle.Seat;
    document.getElementById("updateVFormVehicleStatus").value = Vehicle.Status;


    getSelectedDriverArray('UpdateVdriverDropDBox','UpdateVehicleDriverList');

}

// Update Vehicle
async function updateVehicle(){

    var form = document.getElementById("updateVehicleForm");

    var Simplevalid = ValidateForm(form);

    if(!Simplevalid){
        return;
    }

    var Name = document.getElementById("updateVFormVehicleName");
    var VehicleFile = document.getElementById("updateVFormVehicleImage");
    var PlateNumber = document.getElementById("updateVFormVehiclePlateNum");
    var BranchID = document.getElementById("updateVFormVehicleBranch");
    var CategoryID = document.getElementById("updateVFormVehicleCategory");
    var Color = document.getElementById("updateVehicleColour");
    var Seat = document.getElementById("updateVehicleNumSeats");
    var Status = document.getElementById("updateVFormVehicleStatus");
    const Vehicl = Vehicles.find(Vehicl => Vehicl.PlateNumber === PlateNumber.value );
    var Drivers = getSelectedDriverArray('UpdateVdriverDropDBox','UpdateVehicleDriverList');


    var Imgfile = "";
    var imgUpdated = false;

    if(VehicleFile.files.length != 0){
        imgUpdated = true;
        Imgfile = await fileUpload(VehicleFile);
    }
    

    const Vehicle = {
        "PlateNumber":PlateNumber.value,
        "Name" : Name.value,
        "ImageBase64" : Imgfile,
        "Color" : Color.value,
        "BranchID" : BranchID.value,
        "CategoryID" : CategoryID.value,
        "Seat": Seat.value,
        "Status" : Status.value,
        "DriverIds" : Drivers,
        "ImagePath":Vehicl.ImagePath
        
    };
    
    
    const options = {
        method: "PUT",
        headers: {
            "content-type" : "application/json"
        },
        body: JSON.stringify(Vehicle)
    };
    
    
    var response = await fetch(Vehicle_url, options);
    if(response.status == 201){
        
        ShowNotification("Success", "Updated Vehicle");
    }else if(response.status == 501){
        var msg = await response.text();
        ShowNotification("error", msg);
    }



}

async function changeVehicleImage(){
    var filePicker = document.getElementById("updateVFormVehicleImage");
    var ImageBase64 = await fileUpload(filePicker);
    document.getElementById("updateVFormVehicleImageBox").src = ImageBase64;
}





// 
//   Driver ----------------- Backend
// 

function setDataDriverModal(){
    
    DropdownBranch("addDriversModal_Branch", true);
    
    
}

async function getDrivers(){
    var data = await fetch(Driver_url);
    Drivers = await data.json();
}


async function addDriver(){

    var form = document.querySelector("#addDriversModal > form");

    var Simplevalid = ValidateForm(form);

    if(!Simplevalid){
        return;
    }
    
    
    var name = document.getElementById("addDriversModal_Name");
    var email = document.getElementById("addDriversModal_Email");
    var pNumber = document.getElementById("addDriversModal_Contact");
    var address = document.getElementById("addDriversModal_address");
    var DOB = document.getElementById("addDriversModal_DOB");
    var branchDropdown = document.getElementById("addDriversModal_Branch");
    var genderRB = document.getElementById("addDriversModal_Male");
    var username = document.getElementById("addDriversModal_Username");
    var password = document.getElementById("addDriversModal_Pass");

    var driverImg = document.getElementById("addDriversModal_Img");
    var Imgfile = await fileUpload(driverImg);
    var gender;
    
    
    if(genderRB.checked){
        gender = "Male";
    }else{
        gender = "Female"
    }
    

    const Driver = {
        
        "Name" : name.value,
        "Email" : email.value,
        "ContactNumber" : pNumber.value,
        "Address" : address.value,
        "DOB" : DOB.value,
        "BranchID" : branchDropdown.value,
        "gender": gender,
        "username" : username.value,
        "Imgbase64":Imgfile,
        "password" : password.value,
        "Status": "Available"
        
    };
    
    const options = {
        method: "POST",
        headers: {
            "content-type" : "application/json"
        },
        body: JSON.stringify(Driver)
    };

    var response = await fetch(Driver_url, options);

    if(response.status == 201){
        ShowNotification("Success", "Driver addeed");
    }else if(response.status == 501){
        var errorMsg = await response.text();
        ShowNotification("error", errorMsg);
    }

    closeModal('addDriversModal');
    ShowDrivers();

}

async function setDriverData (id){
    await DropdownBranch("updateDriversModal_Branch", true);
    var Driver;
    for(drive of Drivers){
        if(drive.id == id){
            Driver = drive;
        }
    }

    document.getElementById("updateDriversModal_ID").innerHTML = Driver.id;
    document.getElementById("updateDriversModal_Img").src = Driver.Imgbase64;
    document.getElementById("updateDriversModal_Name").value = Driver.Name;
    document.getElementById("updateDriversModal_Email").value = Driver.Email;
    document.getElementById("updateDriversModal_Branch").value = Driver.BranchID;
    document.getElementById("updateDriversModal_Contact").value = Driver.ContactNumber;
    document.getElementById("updateDriversModal_DOB").value = Driver.DOB;
    
    document.getElementById("updateDriversModal_address").value = Driver.Address;
    document.getElementById("updateDriversModal_Username").value = Driver.username;
    document.getElementById("updateDriversModal_Status").value = Driver.Status;

    if(Driver.gender == "Male"){
        document.getElementById("updateDriversModal_Male").checked = true;

    }else{
        document.getElementById("updateDriversModal_Female").checked= true;

    }


}

async function UpdateDriver(){
    var updateForm = document.querySelector("#updateDriversModal form");
    var Simplevalid = ValidateForm(updateForm);
    if(!Simplevalid){
        return;
    }
    var id = document.getElementById("updateDriversModal_ID").innerHTML;
    var Name = document.getElementById("updateDriversModal_Name");
    var Email = document.getElementById("updateDriversModal_Email");
    var BranchID = document.getElementById("updateDriversModal_Branch");
    var ContactNumber = document.getElementById("updateDriversModal_Contact");
    var DOB = document.getElementById("updateDriversModal_DOB");
    var gender = document.getElementById("updateDriversModal_Male");
    var Address = document.getElementById("updateDriversModal_address");
    var Status = document.getElementById("updateDriversModal_Status");
    var Name = document.getElementById("updateDriversModal_Name");
    var username = document.getElementById("updateDriversModal_Username");
    var password = document.getElementById("updateDriversModal_Pass");
    var driver = Drivers.find((driver) => driver.id ==id );
    
    var filePicker = document.getElementById("updateDriversModal_FileImg");
    var Imgfile = "";
    var imgUpdated = false;

    if(filePicker.files.length != 0){
        imgUpdated = true;
        Imgfile = await fileUpload(filePicker);
    }
    
    
    

    if(gender.checked){
        gender = "Male";
    }else{
        gender = "Female";
    }
    

    const Driver = {
        "id":id,
        "Name" : Name.value,
        "Email" : Email.value,
        "ContactNumber" : ContactNumber.value,
        "Address" : Address.value,
        "DOB" : DOB.value,
        "BranchID" : BranchID.value,
        "gender": gender,
        "username" : username.value,
        "ImgLocation":driver.ImgLocation,
        "Imgbase64":Imgfile,
        "password" : password.value,
        "Status": Status.options[Status.selectedIndex].text
        
    };
    
    
    const options = {
        method: "PUT",
        headers: {
            "content-type" : "application/json"
        },
        body: JSON.stringify(Driver)
    };
    
    
    var response = await fetch(Driver_url, options);
    if(response.status == 201){
        
        ShowNotification("Success", "Updated the driver");
    }else if(response.status == 501){
        var msg = await response.text();
        ShowNotification("Error", msg);
    }
}


async function ShowDrivers(){
    await getDrivers();
    document.querySelector("#driverTable tbody").innerHTML = "";
    Array.prototype.forEach.call(Drivers,(driver => {
  
        document.querySelector("#driverTable tbody").innerHTML += 
                        "<tr onclick=\"openModal('updateDriversModal'); setDriverData("+driver.id+"); \" >\n" +
                            "<td>"+driver.id+"</td>\n" +
                            "<td class=\"Driver-ProfileImage\"> <img src=\""+driver.Imgbase64+"\"></td>\n" +
                            "<td>"+driver.Name+"</td>\n" +
                            "<td>"+driver.Email+"</td>\n" +
                            "<td>"+driver.username+"</td>\n" +
                            "<td>"+driver.ContactNumber+"</td>\n" +
                            "<td>"+driver.Address+"</td>\n" +
                            "<td>"+driver.DOB+"</td>\n" +
                            "<td>"+driver.BranchID+"</td>\n" +
                            "<td>"+driver.gender+"</td>\n" +
                            "<td>"+driver.Status+"</td>\n" +
                            
                        "</tr>";
                
    }));
}




SetupAdminPanel();



