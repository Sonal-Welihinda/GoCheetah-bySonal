const admin_url ="http://localhost:8080/GoCheeta-Server/admin/";

async function AdminLogin(){
    var formlogin = document.getElementById("AdminForm");
    formlogin.reportValidity();

    var EmailIp = document.getElementById("Adminemail");
    var passwordIp = document.getElementById("Adminpassword");

    const Admin = {
        "email":EmailIp.value,
        "password":passwordIp.value
    }

    const options = {
        method: "POST",
        headers: {
            "content-type" : "application/json"
        },
        body: JSON.stringify(Admin)
    };

    var response = await fetch(admin_url+"login",options);

    if(response.status == 201){
        var AdminData = await response.json();
        
        document.cookie = "AdminID="+AdminData.id;
        document.cookie = "AdminName="+AdminData.name;
        document.cookie = "AdminType="+AdminData.AccType;
        ShowNotification("Success", "Successfully loged in redirecting....");
        setTimeout(()=>{
            window.location.href = "adminDashboard.html";
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