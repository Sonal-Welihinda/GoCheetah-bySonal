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





// Backend code
const Location_url ="http://localhost:8080/GoCheeta-Server/Location/";
const Booking_url =  "http://localhost:8080/GoCheeta-Server/Booking/";

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
    var response = await fetch(Booking_url+DriversID+"/"+"Cancel");
    if(response.status == 201){
        ShowNotification("Success", "Booking cancel");
    }else if(response.status == 501){
        var errorMsg = await response.text();
        ShowNotification("error", errorMsg);
    }
}

async function FinishTrip(){
    var response = await fetch(Booking_url+DriversID+"/"+"Complete");
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