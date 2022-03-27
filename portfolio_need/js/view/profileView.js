
import configuration from "../models/systemConfigurationsModel.js";
 


class ProfileField {


    constructor(fieldElement, titleElement, valueElement) {
        this.fieldElement = fieldElement;

        if(!titleElement) {
            titleElement = fieldElement.querySelector(".profile__field-key");
        }

        if(!valueElement) {
            valueElement = fieldElement.querySelector(".profile__value");
        }

        this.fieldTitle = titleElement;
        this.fieldValue = valueElement;
    }

 
  
}


export class ProfileView {


    constructor(controller) {
        this.controller = controller


        this.profile = document.getElementById("profile");
        this.profileBody = document.getElementById("profile__body");
        this.profileFields = this.profileBody.querySelectorAll(".profile__column");
        this.buildProfileButton = document.getElementById("profile_button");
 
        this.profileFieldObjects = []
    }

    
    buildProfileFields() {

        this.profileFields.forEach(field => {
            let newField = new ProfileField(field);
            this.profileFieldObjects.push(newField);
        });

    }


    addFieldToProfile(title, value, value_raw) {

        let translatedTitle = configuration.translateWord(title);

        if (translatedTitle) {
            title = translatedTitle;
        }


        let field = document.createElement("tr");

        field.classList.add("profile__element");
        field.classList.add("profile__column");


        let fieldTitle = buildFieldTitle(title);
        field.appendChild(fieldTitle);

        let fieldValue = buildFieldValue(title, value, value_raw);
        field.appendChild(fieldValue);

        this.profileBody.appendChild(field);

 
        let newProfile = new ProfileField(field, 
            fieldTitle, 
            fieldValue)
   
        this.profileFieldObjects.push(newProfile); 
        
    }



    hideRawElements() {

        const profileKeys = Array.from(
            profile.getElementsByClassName("profile__key"));

        profileKeys.forEach((key) => {

            key.classList.add("profile__key--closed")

        })

        this.buildProfileButton.classList.add("profile__key--closed");
        setTimeout(() => { this.buildProfileButton.remove() },
         1600);
    }

    listenProfileButton(onClick) {

        this.buildProfileButton.addEventListener("click", onClick);

    }

    prettifyField(field) {

        let fieldTitle = field.fieldTitle;
        let fieldValue = field.fieldValue;

        this.prettifyTitleElement(fieldTitle);
        this.prettifyValueElement(fieldValue);
    } 

    prettifyProfile() {

        this.profile.classList.add("profile--pretty");
        this.profile.classList.remove("profile--raw");
        this.profileBody.classList.add("profile__body--pretty");


        this.profileFieldObjects.forEach(field => {
             
            this.prettifyField(field);

        });
    }

    prettifyTitleElement(titleElement) {
        titleElement.classList.remove("profile__field-key");
        titleElement.classList.add("profile__field-title");
    }

    
    prettifyValueElement(valueElement) {

        valueElement.classList.add("profile__value--pretty");
        valueElement.classList.remove("profile__element--raw-value");
        
        let notRawValue = valueElement.getAttribute("not-raw");
        
        notRawValue = configuration.translateWord(notRawValue) || notRawValue;
        
        valueElement.innerHTML = notRawValue;

        /* every field value has a class for it */
        let fieldClass = valueElement.getAttribute("field_class");
        valueElement.classList.toggle(fieldClass);
    }



    showHiddenFromRawElements() {

        const hiddenFromRaw = "profile__element--hidden-from-raw"
        const hiddenElements = Array.from(
            this.profile.getElementsByClassName(hiddenFromRaw));

        hiddenElements.forEach((el) => {
            el.classList.remove(hiddenFromRaw)
        });
    }



}


function buildFieldTitle(title) {

    let fieldTitle = document.createElement("td");
    fieldTitle.innerHTML = title;

    let translatedTitle = configuration.translateWord(title);
    if (!translatedTitle) {
        fieldTitle.setAttribute("to-translate", title);
    }

    fieldTitle.classList.add("profile__field-key")

    fieldTitle.classList.add("profile__element")

    return fieldTitle;
}

function buildFieldValue(title, value, value_raw) {

    let fieldValue = document.createElement("td");
    fieldValue.innerHTML = value_raw || value;
    fieldValue.classList.add("profile__value")

    fieldValue.setAttribute("not-raw", value);
    fieldValue.setAttribute("field_class", `${title}_value`)
    return fieldValue
}


