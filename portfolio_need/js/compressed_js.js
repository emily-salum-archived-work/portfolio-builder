class EventEmitter {
    constructor() {
        this.events = {};
    }
    on(event, listener) {
        if (typeof this.events[event] !== 'object') {
            this.events[event] = [];
        }
        this.events[event].push(listener);
        return () => this.removeListener(event, listener);
    }
    removeListener(event, listener) {
        if (typeof this.events[event] === 'object') {
            const idx = this.events[event].indexOf(listener);
            if (idx > -1) {
                this.events[event].splice(idx, 1);
            }
        }
    }
    emit(event, ...args) {
        if (typeof this.events[event] === 'object') {
            this.events[event].forEach((listener) => listener.apply(this, args));
        }
    }
    once(event, listener) {
        const remove = this.on(event, (...args) => {
            remove();
            listener.apply(this, args);
        });
    }
}
;
function domInjector(seletor) {
    return function (target, propertyKey) {
        const getter = function () {
            const elemento = document.querySelector(seletor);
            if (!elemento) {
                throw new Error(`${propertyKey} queria receber elemento de selector ${seletor}, que não foi encontrado`);
            }
            Object.defineProperty(this, propertyKey, { value: elemento
            });
            return elemento;
        };
        Object.defineProperty(target, propertyKey, {
            get: getter
        });
    };
}
class Controller {
    constructor(viewClass) {
        this.view = new viewClass(this);
        setTimeout(() => {
            this.startBehaviour();
        }, 0);
    }
}
class MainController {
    constructor() {
        this.mainEventController = new EventEmitter();
    }
}
const mainController = new MainController();
class View {
    constructor(controller, inicializeEvent = null) {
        this.controller = controller;
        this.inicializeEvent(inicializeEvent);
    }
    inicializeEvent(inicializeEvent) {
        if (inicializeEvent) {
            mainController.mainEventController.on(inicializeEvent, () => {
                this.inicializeElements();
            });
            return;
        }
        document.addEventListener('DOMContentLoaded', () => {
            this.inicializeElements();
        });
    }
}
class StaticConfigurations {
    initialPath() {
        return "portfolio_need";
    }
}
const staticConfiguration = new StaticConfigurations();
const languageTranslations = {};
class SystemConfigurations {
    constructor() {
        this.selectedLanguage = "";
    }
    addToLanguage(newLanguage, translations) {
        languageTranslations[newLanguage] = translations;
    }
    getLanguageTranslations() {
        return languageTranslations;
    }
    setLanguage(newLanguage) {
        this.selectedLanguage = newLanguage;
    }
    translateWord(key) {
        const languageTranslation = languageTranslations[this.selectedLanguage];
        if (!languageTranslation) {
            return key;
        }
        return languageTranslation[key] || key;
    }
}
const configuration = new SystemConfigurations();
class Tech {
    constructor(name) {
        this.name = name;
    }
}
configuration.addToLanguage("english", {
    "page_introduction": "Determined to be the best programmer I can be!",
    "tech-title": "Techs I know",
    "emailing": "Email me!",
    "name": "Name",
    "message_to_send": "Give me a Message!",
    "call_me_in": "Or call me in...",
    "contacting": "Contacting",
    "build_profile": "buildMyProfile",
    "to_know_me": "For you to know a bit about me...",
    "projects": "Projects",
    "profile": "Profile",
    "contacts": "Contact",
    "from": "Country",
    "age": "My age",
    "likes": "I like",
    "stuffILike": "Rpg, classical music and discord",
    "cv_download": "You can also download my CV",
    "click_here": "Click here!",
    "email_sent": "Email sent!",
    "thank_you": "Thank you for your time!",
    "oh_no": "Oh no!",
    "email_not_sent": "A problem happened! Your email wasn't sent!",
    "email_problem": "Problem in email field!",
    "bad_email": "Not a proper email!",
    "name_problem": "Problem in name field!",
    "short_name": "This name is too short!",
    "send": "Send it",
});
configuration.addToLanguage("portugues", {
    "page_introduction": "Determinada a ser a melhor programadora que eu puder ser!",
    "tech-title": "Tecnologias que conheço",
    "emailing": "Me mande um email!",
    "name": "Nome",
    "message_to_send": "Me envie uma Mensagem!",
    "call_me_in": "Ou me chame em..",
    "contacting": "Para me contatar",
    "build_profile": "construirMeuPerfil",
    "to_know_me": "Para você saber um pouco sobre mim...",
    "projects": "Projetos",
    "profile": "Perfil",
    "contacts": "Contatos",
    "from": "País",
    "likes": "gostos",
    "age": "idade",
    "stuffILike": "Rpg, musica classica e discord",
    "cv_download": "Voce tambem pode fazer download do meu CV",
    "email_sent": "Email enviado!",
    "thank_you": "Obrigada pelo seu tempo!",
    "oh_no": "Oh não!",
    "email_not_sent": "Aconteceu um erro e seu email não foi enviado!",
    "email_problem": "Problema no campo de email!",
    "bad_email": "Não é um email válido!",
    "name_problem": "Problema no campo de nome!",
    "short_name": "O nome é muito curto!",
    "send": "Enviar",
    "click_here": "Clique aqui",
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
class ContactView extends View {
    constructor(controller) {
        super(controller);
        this.contactFormSubmitListeners = [];
    }
    inicializeElements() {
        this.contactForm.addEventListener("submit", (event) => {
            console.log("contactForm.addEventListener");
            event.preventDefault();
            const submitInfo = new FormData(this.contactForm);
            this.contactFormSubmitListeners.forEach((listener) => {
                listener(event, submitInfo);
            });
        });
        this.inputs = Array.from(this.contactForm.querySelectorAll(".contacts__element"));
    }
    listenForContactForm(onSubmit) {
        console.log("listenForContactForm");
        this.contactFormSubmitListeners.push(onSubmit);
    }
    emailSent() {
        this.contactFormBox.classList.add("contacts--closed");
    }
}
__decorate([
    domInjector("#contact-form-box")
], ContactView.prototype, "contactFormBox", void 0);
__decorate([
    domInjector("#contact-form")
], ContactView.prototype, "contactForm", void 0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
class cvView extends View {
    inicializeElements() {
        mainController.mainEventController.on("finishedConfigurations", () => {
            this.cvLink.setAttribute("href", `${staticConfiguration.initialPath()}/res/cv/cv_${configuration.selectedLanguage}.pdf`);
        });
    }
}
__decorate([
    domInjector("#cv")
], cvView.prototype, "cvSection", void 0);
__decorate([
    domInjector("#cv_link")
], cvView.prototype, "cvLink", void 0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const OPENED_HEADER = "header--opened";
const CLOSED_HEADER = "header--closed";
class HeaderView extends View {
    constructor(controller) {
        super(controller);
    }
    inicializeElements() {
        console.log("headerView.inicializeElements");
    }
    clickHeader(event) {
        let element = event.target;
        let hasHeaderOrigin = element.id === 'header' || this.header.contains(element);
        if (!hasHeaderOrigin) {
            this.closeHeader();
            return;
        }
        this.openHeader();
    }
    headerIsOpen() {
        return this.header.classList.contains(OPENED_HEADER);
    }
    changeHeaderState() {
        this.header.classList.toggle(CLOSED_HEADER);
        this.header.classList.toggle(OPENED_HEADER);
    }
    closeHeader() {
        let open = this.headerIsOpen();
        this.header.classList.add(CLOSED_HEADER);
        this.header.classList.remove(OPENED_HEADER);
        return open != this.headerIsOpen();
    }
    openHeader() {
        this.header.classList.add(OPENED_HEADER);
        this.header.classList.remove(CLOSED_HEADER);
    }
}
__decorate([
    domInjector("#header")
], HeaderView.prototype, "header", void 0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
class LanguageConfigurationView extends View {
    constructor(controller) {
        super(controller, "startedConfigurations");
    }
    inicializeElements() {
    }
    getElementsToTranslate() {
        return Array.from(document.querySelectorAll("[to-translate]"));
    }
    getToMoveElements() {
        return [this.languageSelect];
    }
    changedLanguage(selectedLanguage, fastStyle = false) {
        if (fastStyle) {
            return;
        }
        this.languageSwitch.classList.remove("system-configurations__language-switch--hidden");
        const selectedCase = this.languageSwitch.querySelector("#" + selectedLanguage + "-case");
        setTimeout(() => {
            selectedCase.classList.add("system-configurations__switch-case--selected");
        }, 3500);
    }
}
__decorate([
    domInjector("#language-switch")
], LanguageConfigurationView.prototype, "languageSwitch", void 0);
__decorate([
    domInjector("#language-choice-select")
], LanguageConfigurationView.prototype, "languageSelect", void 0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
class ModeView extends View {
    inicializeElements() {
    }
    setCoverScreenMode(mode) {
        console.log("Adding screen-cover--" + mode);
        this.coverScreen.classList.add("screen-cover--" + mode);
    }
    removeCoverScreenMode(mode) {
        console.log("Removing screen-cover--" + mode);
        this.coverScreen.classList.remove("screen-cover--" + mode);
    }
    applyLoadingMode() {
        this.setCoverScreenMode("loading");
        document.body.appendChild(this.loadingTitle);
        setTimeout(this.finishedLoading.bind(this), 50);
    }
    finishedLoading() {
        setTimeout(() => {
            this.loadingTitle.classList.add("loading__title--loaded");
        }, 300);
        this.binaryDance();
        for (let i = 0; i < 5; i++) {
            setTimeout(this.binaryDance.bind(this), 60 + 90 * i);
        }
        setTimeout(this.loadingTitleFinishedAnimation.bind(this), 1500);
    }
    binaryDance() {
        let binaryTexts = [];
        for (let i = 0; i < 6; i++) {
            let binaryText = this.makeBinaryText();
            binaryTexts.push(binaryText);
            binaryText.style.left = (i * 20) + Math.round(Math.random() * 20) + "%";
            binaryText.style.top = 110 + Math.floor(Math.random() * 50) + "%";
            this.binaryTextDiv.appendChild(binaryText);
        }
        this.binaryDanceStart(binaryTexts);
    }
    makeBinaryText() {
        let binaryText = document.createElement("p");
        binaryText.classList.add("loading__binary");
        let binaryTextContent = "";
        for (let j = 0; j < 16; j++) {
            binaryTextContent += Math.round(Math.random()) ? "1" : "0";
        }
        binaryText.innerHTML = binaryTextContent;
        return binaryText;
    }
    binaryDanceStart(binaryTexts) {
        if (binaryTexts.length === 0) {
            return;
        }
        let nextText = binaryTexts.splice(Math.round(Math.random() * binaryTexts.length) - 1, 1)[0];
        nextText.classList.add("loading__binary--animated");
        setTimeout(() => {
            this.binaryDanceStart(binaryTexts);
        }, Math.random() * 800);
    }
    loadingTitleFinishedAnimation() {
        this.loadingTitle.remove();
        setTimeout(() => {
            this.removeCoverScreenMode("loading");
        }, 5000);
        setTimeout(this.setCoverScreenMode.bind(this, "loaded"), 1000);
        setTimeout(() => {
            this.binaryTextDiv.remove();
        }, 5000);
    }
    applyLightMode() {
        document.body.classList.toggle("body--light-mode");
    }
    changeUnfocus(doUnfocus) {
        if (doUnfocus) {
            this.setCoverScreenMode("unfocus");
            return;
        }
        this.removeCoverScreenMode("unfocus");
    }
}
__decorate([
    domInjector("#change-mode_button")
], ModeView.prototype, "changeModeButton", void 0);
__decorate([
    domInjector(".screen-cover")
], ModeView.prototype, "coverScreen", void 0);
__decorate([
    domInjector("#loading-title")
], ModeView.prototype, "loadingTitle", void 0);
__decorate([
    domInjector("#loading__binaries")
], ModeView.prototype, "binaryTextDiv", void 0);
class PopupView {
    constructor() {
    }
    makePopup(title, text) {
        title = configuration.translateWord(title);
        text = configuration.translateWord(text);
        this.removePopup();
        this.popupDiv = this.createPopup(title, text);
        document.body.appendChild(this.popupDiv);
    }
    createPopup(title, text) {
        let popupDiv = document.createElement("div");
        popupDiv.classList.add("popup");
        const titleElement = document.createElement("h3");
        titleElement.innerHTML = title;
        popupDiv.appendChild(titleElement);
        const textElement = document.createElement("p");
        textElement.innerHTML = text;
        popupDiv.appendChild(textElement);
        return popupDiv;
    }
    removePopup() {
        if (this.popupDiv) {
            this.popupDiv.remove();
            this.popupDiv = null;
        }
    }
}
const popupView = new PopupView();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
class ProjectFilesView extends View {
    constructor(controller) {
        super(controller);
    }
    inicializeElements() {
        this.folderButtons = Array.from(document.querySelectorAll("[folder]"));
        this.projectFiles = Array.from(this.projectsFolderContainer.querySelectorAll('a'));
        console.log("projectFilesView.inicializeElements");
    }
    markProjectAsSelected(project) {
        project.classList.remove("projects__project--selected");
        void project.offsetWidth;
        project.classList.add("projects__project--selected");
    }
    setupProjectFile(project_file) {
        const project = document.querySelector(`
    [project-name="${project_file.getAttribute("link-project-name")}"]`);
        if (!project) {
            return;
        }
        project_file.addEventListener('click', () => {
            this.moveUserToProject(project);
        });
    }
    moveUserToProject(project) {
        headerController.closeHeader();
        this.projectsBox.scrollLeft = project.offsetLeft - this.projectsBox.offsetLeft;
        project.scrollIntoView();
        this.markProjectAsSelected(project);
    }
    changeFilesSize(folderButton) {
        const folderContainer = folderButton.nextElementSibling;
        folderContainer.classList.toggle("header__folder--closed");
        var projectFiles = Array.from(folderContainer.querySelectorAll('a'));
        projectFiles.forEach((el) => {
            el.classList.toggle("header__file--opened");
            el.classList.toggle("header__file--closed");
        });
    }
}
__decorate([
    domInjector("#project-box")
], ProjectFilesView.prototype, "projectsBox", void 0);
__decorate([
    domInjector("#projects-buttons")
], ProjectFilesView.prototype, "projectsFolderContainer", void 0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const BODY_CONFIG_MODE = "body--config";
class SystemConfigurationsView extends View {
    constructor(controller) {
        super(controller, "startedConfigurations");
    }
    inicializeElements() {
        document.body.classList.add(BODY_CONFIG_MODE);
    }
    loadedConfigurations(fastStyle) {
        if (fastStyle) {
            document.body.classList.remove(BODY_CONFIG_MODE);
            return;
        }
        const inputs = this.getToMoveElements();
        inputs.forEach((input) => {
            input.classList.add("system-configurations__input--closed");
        });
        setTimeout(() => {
            window.scrollTo(0, 0);
            document.body.classList.remove(BODY_CONFIG_MODE);
            let parentOfForm = this.configurationForm.parentElement;
            parentOfForm.classList.add("system-configurations--closed");
            setTimeout(() => { parentOfForm.remove(); }, 5000);
        }, 6000);
    }
    getToMoveElements() {
        let parentOfForm = this.configurationForm.parentElement;
        let toMoveElements = Array.from(parentOfForm.querySelectorAll(".move-input"));
        return toMoveElements;
    }
    listenForm(onSubmit) {
        this.configurationForm.addEventListener("submit", (event) => {
            event.preventDefault();
            onSubmit(event);
        });
    }
    template(languages) {
        let languageOptionsHTML = "";
        let languageSwitchHTML = "";
        Object.keys(languages).forEach((language) => {
            languageOptionsHTML += `
        <option class="system-configurations__option" value="${language}">
        ${language}
                        </option>
            `;
            languageSwitchHTML +=
                `<p class="system-configurations__switch-case" 
                id="${language}-case"> 
                    case ${language}: 
                </p>
                
                <p class="system-configurations__switch-result"> 
                    return <img class="system-configurations__switch-image"
                        src="${staticConfiguration.initialPath()}/res/images/flags/${language}.png">;
                </p>`;
        });
        let systemConfigurationsHTML = `
    <div class="system-configurations"> 
        <h2 class="system-configurations__title">
        System Configurations / Configurações de Sistema
        </h2> 
        <form id='configuration-form' class='system-configurations__form'> 
        <label for="language" class="move-input system-configurations__label"> 
            Pick the Language / Escolha a linguagem 
        </label>         
            <div class="system-configurations__input-container move-input">
                <select name="language" 
                label="Language" id="language-choice-select" 
                class="system-configurations__input system-configurations__select move-input">`
            + languageOptionsHTML
            + `  
                </select> 
            </div> 
            <label for="language" class="system-configurations__label move-input"> 
                Saving configurations / Salvando configurações 
            </label> 
            <div id="configuration-form-save-select-container"
            class="system-configurations__input-container move-input"> 
                <select label="Save configurations" 
                class="system-configurations__input system-configurations__select move-input"
                id="configuration-form-save-select" name="save-configurations"> 

                    <option class="system-configurations__option" value="none"> Don't save</option>
                    <option class="system-configurations__option" value="local">Save</option>
                    <option class="system-configurations__option" value="session"> Save for this session</option> 
                </select> 
            </div> 
            <input 
            class="system-configurations__confirm-button 
            system-configurations__input move-input"
            type="submit"
                form="configuration-form" value="Confirm"> 
        </form> 
        <div 
        id="language-switch" 
        class="system-configurations__language-switch system-configurations__language-switch--hidden"> 
            switch(language) { `
            + languageSwitchHTML
            + ` 
        }
        </div> 
    </div>`;
        return systemConfigurationsHTML;
    }
}
__decorate([
    domInjector('#configuration-form')
], SystemConfigurationsView.prototype, "configurationForm", void 0);
class TechsView extends View {
    constructor(controller) {
        super(controller);
        this.techDisplays = [];
    }
    inicializeElements() {
        this.techLogos = Array.from(document.querySelectorAll(".techs__image"));
        this.techNames = Array.from(document.querySelectorAll(".techs__name"));
        this.buildTechObjects();
    }
    buildTechObjects() {
        this.techNames.forEach((techName) => {
            const nameOfTech = techName.getAttribute("tech-name");
            let techLogo = this.getTechLogoFromName(nameOfTech);
            if (!techLogo) {
                throw new Error("Tech logo for " + nameOfTech + " not found");
            }
            let techDisplay = new TechDisplay(techName, techLogo);
            this.techDisplays.push(techDisplay);
        });
    }
    listenForTechNameHover(mouseover, mouseout) {
        this.techDisplays.forEach((techDisplay) => {
            let techName = techDisplay.techName;
            let techImage = techDisplay.techImage;
            techName.addEventListener("mouseover", () => { mouseover(techName, techImage); });
            techName.addEventListener("mouseout", () => { mouseout(techName, techImage); });
        });
    }
    getTechLogoFromName(techName) {
        for (let i = 0; i < this.techLogos.length; i++) {
            let techLogo = this.techLogos[i];
            let techLogoName = techLogo.getAttribute("tech");
            if (techLogoName === techName) {
                return techLogo;
            }
        }
        return null;
    }
    selectTechImage(techImage) {
        techImage.classList.remove("techs__image--unselected");
    }
    unselectTechs() {
        this.techLogos.forEach((techLogo) => {
            techLogo.classList.add("techs__image--unselected");
        });
    }
    removeUnselectFromTechLogos() {
        this.techLogos.forEach((techLogo) => {
            techLogo.classList.remove("techs__image--unselected");
        });
    }
}
class TechDisplay {
    constructor(nameElement, imageElement) {
        this.techName = nameElement;
        this.techImage = imageElement;
    }
}
class ContactController extends Controller {
    constructor() {
        super(ContactView);
    }
    startBehaviour() {
        this.listenContacts();
    }
    sendEmail(event, data) {
        if (!this.submitInfoValidated(data)) {
            return;
        }
        this.view.emailSent();
        fetch("https://formspree.io/f/mdobzrbv", {
            method: "POST",
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                popupView.makePopup("email_sent", "thank_you");
            }
            else {
                response.json().then(data => {
                    if (data.hasOwnProperty('errors')) {
                        popupView.makePopup("oh_no", "email_not_sent");
                    }
                });
            }
        }).catch(error => {
            popupView.makePopup("oh_no", "email_not_sent");
            throw error;
        });
        return false;
    }
    submitInfoValidated(submitInfo) {
        let name = submitInfo.get('name');
        if (name === undefined) {
            throw new Error("name is undefined");
        }
        if (name.length < 3) {
            popupView.makePopup("name_problem", "short_name");
            return false;
        }
        let email = submitInfo.get('email');
        if (email === undefined) {
            throw new Error("email is undefined");
        }
        if (!this.validateEmail(email)) {
            popupView.makePopup("email_problem", "bad_email");
            return false;
        }
        return true;
    }
    listenContacts() {
        this.view.listenForContactForm((event, submitInfo) => {
            this.sendEmail(event, submitInfo);
        });
    }
    validateEmail(emailAdress) {
        let regexEmail = /^\S+@\S+\.\S+$/;
        if (emailAdress.match(regexEmail)) {
            return true;
        }
        else {
            return false;
        }
    }
}
let contactController = new ContactController();
class HeaderController extends Controller {
    constructor() {
        super(HeaderView);
    }
    startBehaviour() {
        this.listenHeader();
    }
    listenHeader() {
        document.body.addEventListener("click", (event) => {
            let headerState = this.view.headerIsOpen();
            this.view.clickHeader(event);
            let newHeaderState = this.view.headerIsOpen();
            let changedState = headerState != newHeaderState;
            if (changedState) {
                mainController.mainEventController.emit("headerChangedState", newHeaderState);
            }
        }, true);
    }
    closeHeader() {
        let changedState = this.view.closeHeader();
        if (!changedState) {
            return;
        }
        mainController.mainEventController.emit("headerChangedState", false);
    }
}
const headerController = new HeaderController();
class LanguageConfigurationsController extends Controller {
    constructor() {
        super(LanguageConfigurationView);
    }
    startBehaviour() {
    }
    startedConfigurations() {
        this.view.inicializeElements();
    }
    getLanguage() {
        return this.view.languageSelect.value.toLowerCase();
    }
    loadLanguage(newSelectedLanguage, fastStyle = false) {
        configuration.setLanguage(newSelectedLanguage);
        this.setLanguage(fastStyle);
    }
    setLanguage(fastStyle) {
        this.view.changedLanguage(configuration.selectedLanguage, fastStyle);
        const toTranslateObjects = this.view.getElementsToTranslate();
        toTranslateObjects.forEach((element) => {
            let toTranslate = element.getAttribute("to-translate");
            if (toTranslate !== undefined) {
                element.innerHTML = configuration.translateWord(toTranslate);
            }
        });
    }
}
const languageConfigurations = new LanguageConfigurationsController();
class ModeController extends Controller {
    constructor() {
        super(ModeView);
    }
    startBehaviour() {
        this.listenMode();
    }
    listenMode() {
        mainController.mainEventController.on("headerChangedState", (headerState) => {
            this.view.changeUnfocus(headerState);
        });
        console.log("Going to apply loading mode in screen cover");
        this.view.applyLoadingMode();
        mainController.mainEventController.on("startedConfigurations", () => {
            { }
        });
    }
}
new ModeController();
class ProfileController extends Controller {
    constructor() {
        super(ProfileView);
    }
    startBehaviour() {
        profileController.addAgeToProfile();
        profileController.buildProfile();
        profileController.listenProfileButton();
    }
    buildProfile() {
        this.view.buildProfileFields();
    }
    listenProfileButton() {
        this.view.listenProfileButton(this.prettify.bind(this));
    }
    prettify() {
        this.prettifyProfile();
        this.view.hideRawElements();
        this.view.showHiddenFromRawElements();
    }
    addAgeToProfile() {
        const now = new Date();
        const birthDate = new Date(2003, 11, 26);
        let myAge = now.getFullYear() - birthDate.getFullYear();
        const month = now.getMonth() - birthDate.getMonth();
        if (month < 0 || (month === 0 && now.getDate() < birthDate.getDate())) {
            myAge--;
        }
        this.view.addFieldToProfile("age", myAge.toString(), null);
    }
    prettifyProfile() {
        this.view.prettifyProfile();
    }
}
let profileController = new ProfileController();
class ProjectFilesController extends Controller {
    constructor() {
        super(ProjectFilesView);
    }
    startBehaviour() {
        projectFilesController.buildProjectFiles();
    }
    buildProjectFiles() {
        this.view.projectFiles.forEach((p) => { this.view.setupProjectFile(p); });
        this.view.folderButtons.forEach((folderButton) => {
            folderButton.addEventListener("click", () => {
                this.view.changeFilesSize(folderButton);
            });
        });
    }
}
let projectFilesController = new ProjectFilesController();
class SystemConfigurationsController extends Controller {
    constructor() {
        super(SystemConfigurationsView);
    }
    startBehaviour() {
        this.buildSystemConfigurations();
    }
    buildSystemConfigurations() {
        let loadedConfigurations = this.attemptLoadConfigurations();
        if (!loadedConfigurations) {
            let systemConfigurationsHTML = this.view.template(configuration.getLanguageTranslations());
            let configurationsDiv = document.getElementById("configurations-div");
            configurationsDiv.innerHTML = systemConfigurationsHTML;
            mainController.mainEventController.emit("startedConfigurations");
            this.view.listenForm((event) => { this.submitConfigurations(event); });
        }
    }
    attemptLoadConfigurations() {
        const savedSelectedLanguage = sessionStorage.getItem("language") || localStorage.getItem("language");
        if (!savedSelectedLanguage) {
            return false;
        }
        window.addEventListener("load", () => {
            languageConfigurations.loadLanguage(savedSelectedLanguage, true);
            this.view.loadedConfigurations(true);
            mainController.mainEventController.emit("finishedConfigurations");
        });
        return true;
    }
    submitConfigurations(event) {
        let selectedLanguage = languageConfigurations.getLanguage();
        let saveConfigurationsSelect = this.view.configurationForm.querySelector("#configuration-form-save-select");
        this.saveConfigurations(selectedLanguage, saveConfigurationsSelect);
        languageConfigurations.loadLanguage(selectedLanguage);
        this.view.loadedConfigurations(false);
        mainController.mainEventController.emit("finishedConfigurations");
    }
    saveConfigurations(selectedLanguage, saveConfigurationsSelect) {
        let saveOption = saveConfigurationsSelect.value;
        this.saveConfiguration("language", selectedLanguage, saveOption);
    }
    saveConfiguration(key, value, saveOption) {
        if (saveOption == "session") {
            sessionStorage.setItem(key, value);
            return;
        }
        if (saveOption == 'local') {
            localStorage.setItem(key, value);
            return;
        }
    }
}
const systemConfigurationsController = new SystemConfigurationsController();
class TechController extends Controller {
    constructor() {
        super(TechsView);
        this.techs = [];
    }
    startBehaviour() {
        techController.buildTechObjects();
        techController.listenForTechHover();
    }
    buildTechObjects() {
        this.view.techNames.forEach((techName) => {
            const nameOfTech = techName.getAttribute("tech-name");
            if (!nameOfTech) {
                throw new Error("nameOfTech (String) not found in techName (element)");
            }
            let tech = new Tech(nameOfTech);
            this.techs.push(tech);
        });
    }
    onTechNameOver(_techName, techImage) {
        this.view.unselectTechs();
        this.view.selectTechImage(techImage);
    }
    onTechNameOut(_techName, _techImage) {
        this.view.removeUnselectFromTechLogos();
    }
    listenForTechHover() {
        this.view.listenForTechNameHover(this.onTechNameOver.bind(this), this.onTechNameOut.bind(this));
    }
}
let techController = new TechController();
