

var tabs = document.querySelectorAll("#TabsContent Div");
var submenus = document.getElementsByClassName("sidebar-Submenu");
var navButtons = document.querySelectorAll("#nav-bar > button");
var subMenuButton = document.querySelectorAll("#nav-bar .sidebar-Submenu button");

var driversLDropdown = document.querySelector("#driversListContainer .drivers-List-checkbox");
var driverslist = document.querySelectorAll(".drivers-List-checkbox label");

var SalesPiechart = document.getElementById("salesPieCharts");
var IsgoogleChartsLoad = false;

// Api call
const admin_url = "http://localhost:8080/GoCheeta-Server/admin/"; 
const branch_Url ="http://localhost:8080/GoCheeta-Server/branch/"; 
const FileServerApi ="http://localhost:8080/GoCheeta-Server/FileService/"; 
const VehicleCategory_url ="http://localhost:8080/GoCheeta-Server/Vehicle/Category/";



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

var Admins,Branches;



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
    var query = "branchID:"+branchID+"/"+AccType+"/"+AdminSearch;
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


// Vehicle Category

// fileUpload
async function fileUpload(imgElement,folder){
    
    
    return new Promise((resolve, reject) => {
        var fileR = new FileReader();    
        fileR.onload = function(e) {



            const ImgFile = {
                "fileLocaiton": folder,
                "ImgBase64":e.target.result
            }

            const options = {
                method: "POST",
                headers: {
                    "content-type" : "application/json"
                },
                body: JSON.stringify(ImgFile)
            };

            fetch(FileServerApi+"Upload",options).then((response) => {

                if(response.status == 201){
                    response.json().then((res) => {resolve(res)});


                }else if(response.status == 501){
                    response.json().then((res) => {
                        ShowNotification("error", JSON.parse(res).Error);
                        reject("");
                    });

                }

            });
        };
        fileR.readAsDataURL(imgElement.files[0]);

    })
   
}


async function addVCategory(){
    var vCateogryIcon = document.getElementById("addVCategoryModalIcon");
    var vCategoryName = document.getElementById("addVCategoryModalName");
    var fileName = await fileUpload(vCateogryIcon,"VehicleCategory");
    
    const VehicleCategory = {
        "ImageFileLocation": fileName.ImgUrl,
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





