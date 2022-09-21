// Backend code
const Location_url ="http://localhost:8080/GoCheeta-Server/Location/";
const Booking_url =  "http://localhost:8080/GoCheeta-Server/Booking/";
const Driver_url ="http://localhost:8080/GoCheeta-Server/Drtver/";

var profileImg = document.getElementById("profilePic");
var profileName = document.getElementById("profileFormName");
var profileNumber = document.getElementById("profileFormNumber");
var profileAddress = document.getElementById("profileFormAddress");
var profileGender = document.getElementById("profileForGContainer");
var profileusername = document.getElementById("profileFormUName");
var profileDOB = document.getElementById("profileFormDOB");


var driverProfile;

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

function ProfileTab(){
    document.getElementById("profileTab").classList.add("Active");
    document.getElementById("DriverDashboardTab").classList.remove("Active");
    document.getElementById("TripHistoryTab").classList.remove("Active");
    loadProfile();

}

function DriverDashboard(){
    document.getElementById("DriverDashboardTab").classList.add("Active");
    document.getElementById("profileTab").classList.remove("Active");
    document.getElementById("TripHistoryTab").classList.remove("Active");
}

function DriverBookingHistory(){
    document.getElementById("TripHistoryTab").classList.add("Active");
    document.getElementById("DriverDashboardTab").classList.remove("Active");
    document.getElementById("profileTab").classList.remove("Active");

    loadHistoryBooking();
}


// Backend

async function loadProfile(){
    await getDriver();
    profileImg.src = driverProfile.Imgbase64;
    profileName.value =  driverProfile.Name;
    profileAddress.value = driverProfile.Address;
    profileNumber.value = driverProfile.ContactNumber;
    profileGender.value = driverProfile.gender;
    profileusername.value = driverProfile.username;
    profileDOB.value = driverProfile.DOB;
    console.log(driverProfile);




}


async function loadHistoryBooking(){
    var DriverID = getCookie("DriverID");
    var BookingData = await fetch(Booking_url+"History/"+DriverID);
   var Bookings = await BookingData.json();
    console.log(Bookings);
}


async function getDriver(){
    var Email = getCookie("DriverEmail");

    const Driver = {
        "Email":Email
    }

    const options = {
        method: "POST",
        headers: {
            "content-type" : "application/json"
        },
        body: JSON.stringify(Driver)
    };

    var response = await fetch(Driver_url+"viewDriver",options);

    driverProfile = await response.json();

}

async function ChangePassword(){
    var changePassForm = document.getElementById("PasswordChangeForm");
    var currentPass = document.getElementById("PasswordChangeForm_CuurentPass");
    var newPass = document.getElementById("PasswordChangeForm_NewPass");
    var reTypepass= document.getElementById("PasswordChangeForm_ReEnterPass");

    if(!changePassForm.reportValidity()){
        return;
    }

    if(newPass.value != reTypepass.value){
        return;
    }

    driverProfile.password = currentPass.value;

    const options = {
        method: "POST",
        headers: {
            "content-type" : "application/json"
        },
        body: JSON.stringify(driverProfile)
    };

    var response = await fetch(Driver_url+"changepassword/"+reTypepass.value,options);

    if(response.status == 201){
        closeModal('PasswordChangeModal');
        ShowNotification("Success", "Password Changed");
    }else if(response.status == 501){
        var errorMsg = await response.text();
        ShowNotification("error", errorMsg);
    }



}

async function loadBooking(){

    var DriversID = getCookie('DriverID');
    var data = await fetch(Booking_url+DriversID);
    var Booking = await data.json();
    if(Booking == null){
        return;
    }


    var titleName = document.getElementById("titleName")
    var Name = document.getElementById("CustormerName")
    var pickup = document.getElementById("PickupLocation");
    var dropOff = document.getElementById("dropoffLocation");
    var bookingID = document.getElementById("BookingID");
    var Booktime = document.getElementById("BookingDateTime");
    var price = document.getElementById("BookingPrice");
    var Status = document.getElementById("BookingStatus");
    var CustomerPhoneNumber = document.getElementById("BookingCustomerNumber");

    titleName.innerHTML = Booking.CustomerName;
    Name.innerHTML = Booking.CustomerName;
    pickup.value = Booking.Source;
    dropOff.value = Booking.Destination;
    bookingID.innerHTML = Booking.bookingID;
    Booktime.innerHTML = Booking.BookingTime;
    price.innerHTML = Booking.price;
    Status.innerHTML = Booking.Status;
    CustomerPhoneNumber.innerHTML = Booking.CustomerPhoneNumber;


}

async function CancelBooking(){
    var bookingID = document.getElementById("BookingID").innerText;
    var response = await fetch(Booking_url+"Status/"+bookingID+"/"+"Cancel");
    if(response.status == 201){
        ShowNotification("Success", "Booking cancel");
    }else if(response.status == 501){
        var errorMsg = await response.text();
        ShowNotification("error", errorMsg);
    }
}

async function FinishTrip(){
    var bookingID = document.getElementById("BookingID").innerText;
    var response = await fetch(Booking_url+"Status/"+bookingID+"/"+"Complete");
    if(response.status == 201){
        ShowNotification("Success", "Trip Is Complete");
    }else if(response.status == 501){
        var errorMsg = await response.text();
        ShowNotification("error", errorMsg);
    }
}


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

loadBooking();