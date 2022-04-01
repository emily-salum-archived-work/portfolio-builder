import configuration from "../models/systemConfigurationsModel.js";
import View from "../classes/view.js";
import Controller from "../classes/controller.js";
import domInjector from "../decorators/dom-injector.js";


 

class ProfileView extends View {


    profileFieldObjects: ProfileField[];
    constructor(controller: Controller<ProfileView>) {

        super(controller);
        this.profileFieldObjects = [];
    }

    @domInjector("#profile")
    profile: HTMLElement;

    @domInjector("#profile__body")
    profileBody: HTMLElement;

    profileFields: Array<HTMLElement>;
  
    @domInjector("#profile_button")
    buildProfileButton: HTMLElement;
  
    inicializeElements() {
 
        this.profileFields = Array.from(this.profileBody.querySelectorAll(".profile__column"));
     
    }


    buildProfileFields() {

        this.profileFields.forEach(field => {
            let newField = new ProfileField(field);
            this.profileFieldObjects.push(newField);
        });

    }


    addFieldToProfile(title: string, value: string | null, value_raw: string | null) {

         title = configuration.translateWord(title);

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
            this.profile.getElementsByClassName("profile__key"));

        profileKeys.forEach((key) => {

            key.classList.add("profile__key--closed")

        })

        this.buildProfileButton.classList.add("profile__key--closed");
        setTimeout(() => { this.buildProfileButton.remove() },
            1600);
    }

    listenProfileButton(onClick: any) {

        this.buildProfileButton.addEventListener("click", onClick);

    }

    prettifyField(field: ProfileField) {

        let fieldTitle = field.fieldTitle;
        let fieldValue = field.fieldValue;

        field.fieldElement.classList.add("profile__column--pretty");
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

    prettifyTitleElement(titleElement: HTMLElement | null) {
        if(!titleElement) return;
        titleElement.classList.remove("profile__field-key");
        titleElement.classList.add("profile__field-title");
    }


    prettifyValueElement(valueElement: HTMLElement | null) {
        if(!valueElement) return;
        valueElement.classList.add("profile__value--pretty");
        valueElement.classList.remove("profile__element--raw-value");

        let notRawValue = valueElement.getAttribute("not-raw") as string;

        notRawValue = configuration.translateWord(notRawValue);

        valueElement.innerHTML = notRawValue;

        /* every field value has a class for it */
        let fieldClass = valueElement.getAttribute("field_class") as string;
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


function buildFieldTitle(title: string) {

    let fieldTitle = document.createElement("td");
     

    let translatedTitle = configuration.translateWord(title);
   
    fieldTitle.setAttribute("to-translate", title);
    fieldTitle.innerHTML = translatedTitle;

    fieldTitle.classList.add("profile__field-key")

    fieldTitle.classList.add("profile__element")

    return fieldTitle;
}

function buildFieldValue(title: string, value: string | null, value_raw: string | null) {

    let fieldValue = document.createElement("td");
    fieldValue.innerHTML = value_raw || value || "";
    fieldValue.classList.add("profile__value")

    if(value) {
        fieldValue.setAttribute("not-raw", value);
    }
    
    fieldValue.setAttribute("field_class", `${title}_value`)
    return fieldValue
}

class ProfileField {


    constructor(public fieldElement: HTMLElement,
        public fieldTitle: HTMLElement | null = null,
        public fieldValue: HTMLElement | null = null) {

        this.fieldElement = fieldElement;

        if (!fieldTitle) {
            this.fieldTitle = fieldElement.querySelector(".profile__field-key");
        }

        if (!fieldValue) {
            this.fieldValue = fieldElement.querySelector(".profile__value");
        }

    }



}

export default ProfileView;