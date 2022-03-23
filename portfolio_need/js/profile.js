import languageLoad from "./systemConfigurations/languageLoad.js";

const profile = document.getElementById("profile");
const profileBody = document.getElementById("profile__body");


const translateWord = languageLoad.translateWord;

function addFieldToProfile(title, value, value_raw) {

    let translatedTitle = translateWord(title);
    
    if(translatedTitle) {
        title = translatedTitle;
    }
    

    let field = document.createElement("tr");

    field.classList.add("profile__element");
    field.classList.add("profile__column");

    let fieldTitle = document.createElement("td");
    fieldTitle.innerHTML = title;
    
    if(!translatedTitle) {
        fieldTitle.setAttribute("to-translate", title);
    }
    
    fieldTitle.classList.add("profile__field-key")
    
    fieldTitle.classList.add("profile__element")
    field.appendChild(fieldTitle);


    let fieldValue = document.createElement("td");
    fieldValue.innerHTML = value_raw || value;
    fieldValue.classList.add("profile__value")

    fieldValue.setAttribute("not-raw", value);
    fieldValue.setAttribute("field_class", `${title}_value`)
    field.appendChild(fieldValue);

    profileBody.appendChild(field);

}


function addAgeToProfile() {

    const myAge = moment("26-11-2003", "DD-MM-YYYY").fromNow().substring(0, 2);
    addFieldToProfile("age", myAge);

}


 

addAgeToProfile();
 





const buildProfile = document.getElementById("profile_button");


buildProfile.addEventListener("click", () => {


    const fields = Array.from(
        profileBody.getElementsByClassName("profile__value"));
    const fieldKeys = Array.from(
        profileBody.getElementsByClassName("profile__field-key"))

    const profileKeys = Array.from(
        profile.getElementsByClassName("profile__key"));



    /* Prettify fields */
    fields.forEach(prettifyField);

    fieldKeys.forEach((profileKey) => {
        profileKey.classList.remove("profile__field-key");
        profileKey.classList.add("profile__field-title");
    })


    profile.classList.add("profile--pretty");
    profile.classList.remove("profile--raw");

    profileBody.classList.add("profile__body--pretty");

    profileKeys.forEach((key) => {

        key.classList.add("profile__key--closed") 

    })
 
    buildProfile.classList.add("profile__key--closed");

    setTimeout(()=>{buildProfile.remove()}, 1600);


    const hiddenFromRaw = "profile__element--hidden-from-raw"
    const hiddenElements = Array.from(
        profile.getElementsByClassName(hiddenFromRaw));

    hiddenElements.forEach((el) =>{
        el.classList.remove(hiddenFromRaw)});


});





function prettifyField(field) {

    let fieldClass = field.getAttribute("field_class");
 

    field.classList.remove("profile__element--raw-value");

    field.innerHTML = field.getAttribute("not-raw");
    field.classList.toggle(fieldClass);
    field.classList.add("profile__value--pretty");
}

