
const Driver_url ="http://localhost:8080/GoCheeta-Server/Drtver/";



async function DriverLogin(){
    var formlogin = document.getElementById("DriverForm");
    formlogin.reportValidity();

    var EmailIp = document.getElementById("Driveremail");
    var passwordIp = document.getElementById("Driverpassword");

    const Driver = {
        "Email":EmailIp.value,
        "Password":passwordIp.value
    }

    const options = {
        method: "POST",
        headers: {
            "content-type" : "application/json"
        },
        body: JSON.stringify(Driver)
    };

    var response = await fetch(Driver_url+"login",options);

    if(response.status == 201){
        var driverData = await response.json();
        
        document.cookie = "DriverID="+driverData.id;
        document.cookie = "DriverName="+driverData.Name;
        document.cookie = "DriverEmail="+driverData.Email;
       // document.cookie = "DriverPassword="+driverData.password;
        ShowNotification("Success", "Successfully loged in redirecting....");
        setTimeout(()=>{
            window.location.href = "Driver.html";
        },2000);
    }else if(response.status == 501){
        var msg = await response.text();
        ShowNotification("error", msg);
        console.log(msg);
    }else{
        var msg = await response.text();
        ShowNotification("error", msg);
        console.log(msg);
    }



}