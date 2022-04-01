var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import configuration from "../models/systemConfigurationsModel.js";
import View from "../classes/view.js";
import domInjector from "../decorators/dom-injector.js";
class ProfileView extends View {
    constructor(controller) {
        super(controller);
        this.profileFieldObjects = [];
    }
    inicializeElements() {
        this.profileFields = Array.from(this.profileBody.querySelectorAll(".profile__column"));
    }
    buildProfileFields() {
        this.profileFields.forEach(field => {
            let newField = new ProfileField(field);
            this.profileFieldObjects.push(newField);
        });
    }
    addFieldToProfile(title, value, value_raw) {
        title = configuration.translateWord(title);
        let field = document.createElement("tr");
        field.classList.add("profile__element");
        field.classList.add("profile__column");
        let fieldTitle = buildFieldTitle(title);
        field.appendChild(fieldTitle);
        let fieldValue = buildFieldValue(title, value, value_raw);
        field.appendChild(fieldValue);
        this.profileBody.appendChild(field);
        let newProfile = new ProfileField(field, fieldTitle, fieldValue);
        this.profileFieldObjects.push(newProfile);
    }
    hideRawElements() {
        const profileKeys = Array.from(this.profile.getElementsByClassName("profile__key"));
        profileKeys.forEach((key) => {
            key.classList.add("profile__key--closed");
        });
        this.buildProfileButton.classList.add("profile__key--closed");
        setTimeout(() => { this.buildProfileButton.remove(); }, 1600);
    }
    listenProfileButton(onClick) {
        this.buildProfileButton.addEventListener("click", onClick);
    }
    prettifyField(field) {
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
    prettifyTitleElement(titleElement) {
        if (!titleElement)
            return;
        titleElement.classList.remove("profile__field-key");
        titleElement.classList.add("profile__field-title");
    }
    prettifyValueElement(valueElement) {
        if (!valueElement)
            return;
        valueElement.classList.add("profile__value--pretty");
        valueElement.classList.remove("profile__element--raw-value");
        let notRawValue = valueElement.getAttribute("not-raw");
        notRawValue = configuration.translateWord(notRawValue);
        valueElement.innerHTML = notRawValue;
        let fieldClass = valueElement.getAttribute("field_class");
        valueElement.classList.toggle(fieldClass);
    }
    showHiddenFromRawElements() {
        const hiddenFromRaw = "profile__element--hidden-from-raw";
        const hiddenElements = Array.from(this.profile.getElementsByClassName(hiddenFromRaw));
        hiddenElements.forEach((el) => {
            el.classList.remove(hiddenFromRaw);
        });
    }
}
__decorate([
    domInjector("#profile")
], ProfileView.prototype, "profile", void 0);
__decorate([
    domInjector("#profile__body")
], ProfileView.prototype, "profileBody", void 0);
__decorate([
    domInjector("#profile_button")
], ProfileView.prototype, "buildProfileButton", void 0);
function buildFieldTitle(title) {
    let fieldTitle = document.createElement("td");
    let translatedTitle = configuration.translateWord(title);
    fieldTitle.setAttribute("to-translate", title);
    fieldTitle.innerHTML = translatedTitle;
    fieldTitle.classList.add("profile__field-key");
    fieldTitle.classList.add("profile__element");
    return fieldTitle;
}
function buildFieldValue(title, value, value_raw) {
    let fieldValue = document.createElement("td");
    fieldValue.innerHTML = value_raw || value || "";
    fieldValue.classList.add("profile__value");
    if (value) {
        fieldValue.setAttribute("not-raw", value);
    }
    fieldValue.setAttribute("field_class", `${title}_value`);
    return fieldValue;
}
class ProfileField {
    constructor(fieldElement, fieldTitle = null, fieldValue = null) {
        this.fieldElement = fieldElement;
        this.fieldTitle = fieldTitle;
        this.fieldValue = fieldValue;
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
