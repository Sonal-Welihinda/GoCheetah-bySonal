
function bookingTab(){
    document.getElementById("DashboardTab").classList.add("Active");
    document.getElementById("BookingsTab").classList.remove("Active");
    document.getElementById("ActiveBooking").classList.remove("Active");
}

function ActivebookingTab(){
    document.getElementById("ActiveBooking").classList.add("Active");
    document.getElementById("BookingsTab").classList.remove("Active");
    document.getElementById("DashboardTab").classList.remove("Active");
    getActiveBooking();
}

function PreviousBookingTab(){
    document.getElementById("BookingsTab").classList.add("Active");
    document.getElementById("DashboardTab").classList.remove("Active");
    document.getElementById("ActiveBooking").classList.remove("Active");
    getCustomerBookings();
}






//Rest api links
const Location_url ="http://localhost:8080/GoCheeta-Server/Location/";
const VehicleCategory_url ="http://localhost:8080/GoCheeta-Server/Vehicle/Category/";
const Vehicle_url ="http://localhost:8080/GoCheeta-Server/Vehicle/";
const customer_url = "http://localhost:8080/GoCheeta-Server/Customer/";
const Booking_url =  "http://localhost:8080/GoCheeta-Server/Booking/";


// backend variables
var Locations,RelatedLocation,LocationsFull,VehicleCategory, Vehicles,Vehicl,BranchID;
var pickLocation,dropoffLocation,HistoryBookings;


function HorizontalScroll(event, div){
    div.scrollLeft += event.deltaY;
}


function openModal(ModalID){
    var modal = document.getElementById(ModalID);
    modal.classList.add("Active");

    modal.addEventListener('click' , (event) => {
        if(modal.isSameNode(event.target) || event.target.isSameNode(document.querySelector("#"+ModalID+" .close")) || event.target.isSameNode(document.querySelector("#"+ModalID+" input[type='reset']")))
        {
            modal.classList.remove("Active");
            modal.removeEventListener('click', this);
           
        }
    });

}




// BackEnd Code
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

async function getCustomerDetails(){
    var CustomerName = getCookie("CustomerName");

    document.getElementById("profileName").innerHTML =CustomerName ;
    document.getElementById("DashboardWelcomeMessage").innerHTML = "Welcome "+CustomerName;

    
}

getCustomerDetails();





async function getLocation(){
    var data = await fetch(Location_url+"All/Noduplicate/");
    Locations = await data.json();
    var data2 = await fetch(Location_url);
    LocationsFull = await data2.json();
}

async function showLocation(){
    await getLocation();
    var pickupSuggestions = document.querySelector("#TripPickupL Div");
    pickupSuggestions.innerHTML ="";
    Array.prototype.forEach.call(Locations, (location => {
        pickupSuggestions.innerHTML +=
                        "<span class=\"Search-Item\" onclick=\"getRelatedDropoffLocation("+location.source+");\">"+location.source+"</span>";
    }))
    

}

async function getRelatedDropoffLocation(loction){
    suggestionBoxClose('TripPickupL');
    setPickupLocation(loction);
    var data =  await fetch(Location_url+"Related/"+loction);
    RelatedLocation = await data.json();
    pickLocation = loction;
    dropoffLocation = "";
    document.getElementById("TripDropoffIP").value = "";
    var DropOffSuggestions = document.querySelector("#TripDropoffL Div");
    DropOffSuggestions.innerHTML ="";
    Array.prototype.forEach.call(RelatedLocation, (location => {
        DropOffSuggestions.innerHTML +=
                        "<span class=\"Search-Item\" onclick=\"setDestination('"+location.destination+"');\">"+location.destination+"</span>";
    }))

}

async function setPickupLocation(loction){
    pickLocation = loction;
    var pickupIp = document.getElementById("TripPickupIP");
    pickupIp.value = loction;
    getDistance();
    
}

async function setDestination(loction){
    dropoffLocation = loction;
    var DropOffIP = document.getElementById("TripDropoffIP");
    DropOffIP.value = loction;
    suggestionBoxClose('TripDropoffL');
    getDistance();

}

async function setupBookingDetails(){
    var data = await fetch(VehicleCategory_url);
    VehicleCategory = await data.json();

    document.getElementById("VCateogoryList").innerHTML = "";

    Array.prototype.forEach.call(VehicleCategory, (VCategory => {
        document.getElementById("VCateogoryList").innerHTML += 
        "<div class=\"VCategory-Item\"  onclick=\"onCategorySelect("+VCategory.categoryID+",this)\"> "+
            "<img src=\""+VCategory.ImageBase64+"\" alt=\"Vehicle Cateogry\"> "+
            "<span> "+VCategory.CategoryName+"</span> "+
        "</div>"

    }));

    document.getElementById("VModalList").innerHTML = "";
    var today = new Date();
    var HH = today.getHours();
    var min = today.getMinutes();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    
    if(dd<10){
        dd='0'+dd;
    }
    if(mm<10){
        mm='0'+mm;
    }
    if(HH<10){
        HH='0'+HH;
    }
    if(min<10){
        min='0'+min;
    } 
    console.log(today.getHours()+":"+today.getMinutes()+":"+today.getSeconds())
    today = yyyy+'-'+mm+'-'+dd;
    document.getElementById("TripPickupD").setAttribute("min", today);
    document.getElementById("TripTimeIP").setAttribute("min",HH +":"+min);
    



}

async function pickLocationSearch(){
    await getLocation();
    var pickupSuggestions = document.querySelector("#TripPickupL Div");
    var pickupIp = document.getElementById("TripPickupIP");
    pickupSuggestions.innerHTML ="";
    Array.prototype.forEach.call(Locations, (location => {
        if(location.source.includes(pickupIp.value)){

      
        pickupSuggestions.innerHTML +=
                        "<span class=\"Search-Item\" onclick=\"getRelatedDropoffLocation('"+location.source+"');\">"+location.source+"</span>";
    
        }
    }))
}

async function DestinationLocationSearch(){
    var DropOffSuggestions = document.querySelector("#TripDropoffL Div");
    var DropOffIP = document.getElementById("TripDropoffIP");
    DropOffSuggestions.innerHTML ="";
    Array.prototype.forEach.call(RelatedLocation, (location => {

        if(location.destination.includes(DropOffIP.value)){

        DropOffSuggestions.innerHTML +=
                        "<span class=\"Search-Item\" onclick=\"setDestination('"+location.destination+"');\">"+location.destination+"</span>";
    
        }
    
    }))
}


function suggestionBoxClose(htmlID){
    document.querySelector("#"+htmlID+" div").classList.remove("Active");
}

function suggestionBoxActive(htmlID){
    document.querySelector("#"+htmlID+" div").classList.add("Active");
}



async function onCategorySelect(categoryID,VcategoryItem){
    var CategoryItems = document.querySelectorAll(".VCategory-Item");
    for(var category of CategoryItems){
        category.classList.remove("Active");
    }
    VcategoryItem.classList.add("Active");

    var VCategoryData = await fetch(VehicleCategory_url);
    VehicleCategory = await VCategoryData.json();

    var VehicleData = await fetch(Vehicle_url);
    Vehicles = await VehicleData.json();


    document.getElementById("VModalList").innerHTML = "";
    Array.prototype.forEach.call(Vehicles, (vModal => {
        if(vModal.CategoryID == categoryID  && vModal.BranchID == BranchID){

      
            document.getElementById("VModalList").innerHTML += 
            "<div class=\"VModel-Item\" onclick=\"onVehicleSelected(this,'"+vModal.PlateNumber+"');\" >"+
                "<div class=\"VModal-Img\">"+
                    "<img src=\""+vModal.ImageBase64+"\" alt=\"Vehicel Image\">"+
                "</div>"+
                "<div class=\"vModal-Details\"> "+
                    "<p>"+vModal.Name+"</p>"+
                    "<p>"+vModal.Seat+"</p>"+
                "</div> "+

            "</div>";

        }

    }));
    getPrice();

}

function onVehicleSelected(vehicle,vehiclePlateNumber){
    var vehicleItem = document.querySelectorAll(".VModel-Item");
    for(var veh of vehicleItem){
        veh.classList.remove("Active");
    }
    vehicle.classList.add("Active");

    Vehicl = Vehicles.find((veh) => veh.PlateNumber ==vehiclePlateNumber );

    
    getPrice();
}


function getDistance(){
    var Distance;
    for(loction of LocationsFull){
        if(loction.source == pickLocation && loction.destination == dropoffLocation){
            Distance = loction.Distance;
            BranchID = loction.branchID;
        }
    }

    if(Distance != null){
        document.getElementById("TripDistance").innerText = Distance;
    }
    getPrice();
}


function getPrice(){
    var Distance = document.getElementById("TripDistance").innerText;
    if(Distance == ""||pickLocation == ""||dropoffLocation =="" || Vehicl == ""||
    Distance == null||pickLocation == null||dropoffLocation ==null || Vehicl == null){
        return;
    }


    var price = Distance * Vehicl.baseFare;

    price = Math.round((price + Number.EPSILON) * 100) / 100


    document.getElementById("TripPrice").innerHTML = price;

    return price;

}



async function AddBooking(){
    var Distance = document.getElementById("TripDistance").innerText;
    var Price = getPrice();
    var CustomerID = getCookie("CustomerID");
    var CustomerName = getCookie("CustomerName");
    var dateTimeForm = document.getElementById("tripTime");
    var date = document.getElementById("TripPickupD");
    var Time = document.getElementById("TripTimeIP");

    if(!dateTimeForm.reportValidity()){
        return;
    }

    if(Distance == ""||pickLocation == ""||dropoffLocation =="" || Vehicl == ""|| date.value == "" ||Time.value ==""){
        return ;
    }

    const Booking= {
        "Source":pickLocation,
        "Destination":dropoffLocation,
        "vehicle":Vehicl,
        "Distance":Distance,
        "price":Price,
        "CustormerId":CustomerID,
        "CustomerName":CustomerName,
        "BookingTime" : date.value +" "+ Time.value 

    }

    const options = {
        method: "POST",
        headers: {
            "content-type" : "application/json"
        },
        body: JSON.stringify(Booking)
    };


    var response = await fetch(Booking_url,options);
    if(response.status == 201){
        ShowNotification("Success", "Your Taxi has been booked");
        ActivebookingTab();
    }else if(response.status == 501){
        var msg = await response.text();
        ShowNotification("error", msg);
    }



}


showLocation();
setupBookingDetails();


async function getCustomerBookings(){
    var CustomerId = getCookie("CustomerID");
    var data = await fetch(Booking_url+"Customer/History/"+CustomerId);

    HistoryBookings = await data.json();

    document.getElementById("bookingList").innerHTML = "";

    // if(HistoryBookings == null){
    //     return;
    // }

    Array.prototype.forEach.call(HistoryBookings,(booking => {
        document.getElementById("bookingList").innerHTML +=

        "<div class=\"BookingItem\" onclick=\"openModal('bookingDetailModal'); setBookingModalRating("+booking.bookingID+");\">" +
                    "<div>" +
                        "<div class=\"booking-DT\">" +
                            booking.BookingTime +
                       " </div>" +
                        "<div class=\"booking-ID\">" +
                            "Trip Id : "+ booking.bookingID+
                        "</div>" +
                    "</div>" +
                    "<div class=\"booking-driver\">" +
                        "Rider : " +booking.DriverName +
                    "</div>" +
                "</div>"

    }));


}

async function setBookingModalRating(BID){
    var booking;
    for(trip of HistoryBookings){
        if(trip.bookingID ==BID ){
            booking = trip;
        }
    }

    var dateTime = document.getElementById("bkDeetsModalDate");
    var price = document.getElementById("bkDeetsModalTripID");
    var tripId = document.getElementById("bkDeetsModalTripID");
    var pickupL = document.getElementById("bkDeetsModalPickupL");
    var dropoffL = document.getElementById("bkDeetsModalDropoffL");
    var vehicle = document.getElementById("bkDeetsModalVehicle");
    var driver = document.getElementById("TripDriver");

    var alreadyRate = document.querySelector("#TripRateContainer .AlreadyRateContainer");
    var Rate = document.querySelector("#TripRateContainer .RateContainer");
    var  rateMsg = document.getElementById("TripRateingMsg");
    var rateBtn = document.getElementById("TripRateingBtn");


    dateTime.innerText = booking.BookingTime;
    price.innerHTML = booking.price;
    tripId.innerHTML = "Trip ID :"+ booking.bookingID;
    pickupL.innerHTML = booking.Source;
    dropoffL.innerHTML = booking.Destination;
    vehicle.innerHTML = booking.vehicle.Name +" - "+booking.vehicle.PlateNumber ;
    driver.innerHTML = booking.DriverName;

    if(booking.Rate == 0){
        Rate.classList.add("Active");
        alreadyRate.classList.remove("Active");
        rateMsg.readOnly  = false;
        rateBtn.style.display = "block";
        rateBtn.onclick = updateBookingRating;
    }else{
        Rate.classList.remove("Active");
        alreadyRate.classList.add("Active");
        rateMsg.readOnly  = true;
        rateBtn.style.display = "none";
    }

    if(booking.Rate>0){
        alreadyRate.querySelector("label.Checked").classList.remove("Checked");
        var ratelable = alreadyRate.querySelector("label:nth-child("+((5-booking.Rate)+1)+")");
        ratelable.classList.add("Checked");
        rateMsg.value = booking.RateMsg;
        console.log("test");
    }

    async function updateBookingRating(){
        var RateCuston ;

        if(document.getElementById("DriverRate5").checked){
            RateCuston = 5;
        }else if(document.getElementById("DriverRate4").checked){
            RateCuston = 4;
        }else if(document.getElementById("DriverRate3").checked){

            RateCuston = 3;
        }else if(document.getElementById("DriverRate2").checked){
            RateCuston = 2;

        }else if(document.getElementById("DriverRate1").checked){
            RateCuston = 1;

        }

        const bookingRate = {
            "bookingID":booking.bookingID,
            "Rate":RateCuston,
            "RateMsg":rateMsg.value
        }

        const options = {
            method: "POST",
            headers: {
                "content-type" : "application/json"
            },
            body: JSON.stringify(bookingRate)
        };
    
    
        var response = await fetch(Booking_url+"Rating",options);
        if(response.status == 201){
            ShowNotification("Success", "Your have Rated");
        }else if(response.status == 501){
            var msg = await response.text();
            ShowNotification("error", msg);
        }
    }

}

async function getActiveBooking(){
    var CustomerId = getCookie("CustomerID");
    var bookingData = await fetch(Booking_url+"Customer/"+CustomerId);
    var booking  = await bookingData.json();

    if(booking == null){
        bookingTab();
        return;
    }

    var DriverName = document.getElementById("DriverName");
    var PickupLocation = document.getElementById("PickupLocation");
    var dropoffLocation = document.getElementById("dropoffLocation");
    var BookingID = document.getElementById("BookingID");
    var BookingDateTime = document.getElementById("BookingDateTime");
    var BookingPrice = document.getElementById("BookingPrice");
    var BookingStatus = document.getElementById("BookingStatus");
    var BookingDriverPNumber = document.getElementById("BookingDriverPNumber");

    DriverName.innerHTML = booking.DriverName;
    PickupLocation.value =  booking.Source;
    dropoffLocation.value = booking.Destination;
    BookingID.innerHTML = booking.bookingID;
    BookingDateTime.innerHTML = booking.BookingTime;
    BookingPrice.innerHTML = booking.price;
    BookingStatus.innerHTML = booking.Status;
    BookingDriverPNumber.innerHTML = booking.CustomerPhoneNumber;

}


function loginCheck(){
    var CustomerID = getCookie("CustomerID");
    if(CustomerID == null|| CustomerID == ""){
        window.location.href = "CustomerSignup-login.html";
    }
}

loginCheck();
ActivebookingTab();