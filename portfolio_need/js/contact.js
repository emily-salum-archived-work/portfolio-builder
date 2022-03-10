


var popupDiv = null;

function makePopup(title, text) {

    if(popupDiv) {

        popupDiv.remove();
        popupDiv = null;
    }

    popupDiv = document.createElement("div");

    popupDiv.classList.add("popup");

    const titleElement = document.createElement("h3");
    titleElement.innerHTML = title;

    popupDiv.appendChild(titleElement);

    const textElement = document.createElement("p");
    textElement.innerHTML = text;

    popupDiv.appendChild(textElement);

    
    const closeButton = document.createElement("button");
    closeButton.innerHTML = "X";
    closeButton.classList.add("close_popup_button");
    closeButton.onclick =  function()  {popupDiv.remove();};
    popupDiv.appendChild(closeButton);


    document.body.appendChild(popupDiv);
}

 makePopup("test", "Working?");
function validateEmail (emailAdress)
{
  let regexEmail = /^\S+@\S+\.\S+$/;
  if (emailAdress.match(regexEmail)) {
    return true; 
  } else {
    return false; 
  }
}
formBox = document.getElementById("contact-form-box")
                 
 

function sendEmail()
{ 

    event.preventDefault();
    sendButton = document.getElementById("send_email");

    sendButton.classList.add("powered");
    sendButton.innerHTML = "Sending...";

    let form = document.getElementById("contact-form");
    
    let elements = form.getElementsByClassName("input-element");

    let message = 'So, \n';

    const submitInfo = {};

    for(element of elements)
    {
        const value = element.value;

        submitInfo[element.id] = value;

        message += `${element.id}: ${value} \n`;        
    }
    
    if(submitInfo['name'].length <= 3) {
        
        makePopup("Problem in name field!", "This name is too short!");
        return;
    }

    if(!validateEmail(submitInfo['email']))
    {
        makePopup("Problem in email field!", "Not a proper email!");
        return;
    }
    formBox.classList.add("closed_contact_top");
    // TODO :  Check if email is an email
    // makePopup("Couldn't send your email!", `${email} is not a valid email!`)

    Email.send({
        Host: "smtp.elasticemail.com",
        Username : "EmilyMarquesSalum@gmail.com",
        Password : "AD46166C38E12E8FC6C45C82DAFE90ECAA04",
        To : 'EmilyMarquesSalum@gmail.com',
        From : "EmilyMarquesSalum@gmail.com",
        Subject : "Email do Portfolio",
        
        Body : message,


        }).then(
            message => {

                console.log(message);
                makePopup("Done!", "Your email was sent! Thank you for your time and have a good day!");
                
 
 
               

            }
        ).catch(error => {console.log(error);});
            

        return false;
}