function loginTab(){
    document.getElementById("login").classList.add("Active");
    document.getElementById("SignUp").classList.remove("Active");
}

function signupTab(){
    document.getElementById("SignUp").classList.add("Active");
    document.getElementById("login").classList.remove("Active");
}



// backend

// rest api link
const customer_url = "http://localhost:8080/GoCheeta-Server/Customer/";

function ValidateForm(form){
    return form.reportValidity();
 }

async function Register(){
    var form = document.getElementById("SignUp");
    var Simplevalid = ValidateForm(form);
    if(!Simplevalid){
        return;
    }

    var email = document.getElementById("signupEmailIp");
    var Name = document.getElementById("signupNameIp");
    var Address = document.getElementById("signupAddress");
    var Gender = document.getElementById("signupGender");
    var mobileNumber = document.getElementById("signupMobileNumber");
    var Password = document.getElementById("signupPassword");

    const Customer = {
        "Name": Name.value,
        "Email": email.value,
        "Address": Address.value,
        "Gender": Gender.value,
        "PhoneNumber": mobileNumber.value,
        "Password": Password.value

    }

    const options = {
        method: "POST",
        headers: {
            "content-type" : "application/json"
        },
        body: JSON.stringify(Customer)
    };
    
    var response = await fetch(customer_url,options);

    if(response.status == 201){
        ShowNotification("Success", "You have been successfully registered");
        loginTab();
    }else if(response.status == 501){
        var msg = await response.text();
        ShowNotification("error", msg);
    }


}

async function loginCustomer(){
    var form = document.getElementById("login");
    var Simplevalid = ValidateForm(form);
    if(!Simplevalid){
        return;
    }

    var mobileNumber = document.getElementById("loginPhoneNumber");
    var password = document.getElementById("loginPassword");

    const Customer = {
        "PhoneNumber": mobileNumber.value,
        "Password": password.value

    }

    const options = {
        method: "POST",
        headers: {
            "content-type" : "application/json"
        },
        body: JSON.stringify(Customer)
    };

    

    var response = await fetch(customer_url+"login/",options);

    if(response.status == 201){
        var customer = await response.json();
        
        document.cookie = "CustomerID="+customer.CustomerID;
        document.cookie = "CustomerName="+customer.Name;
        ShowNotification("Success", "Success fully loged in redirecting....");
        setTimeout(()=>{
            window.location.href = "Customer.html";
        },2000);
    }else if(response.status == 501){
        var msg = await response.text();
        ShowNotification("error", msg);
    }else{
        var msg = await response.text();
        ShowNotification("error", msg);
    }



}