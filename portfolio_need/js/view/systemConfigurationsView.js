var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import View from "../classes/view.js";
import staticConfiguration from "../models/staticConfigurationsModel.js";
import domInjector from "../decorators/dom-injector.js";
const BODY_CONFIG_MODE = "body--config";
class SystemConfigurationsView extends View {
    constructor(controller) {
        super(controller, "startedConfigurations");
    }
    inicializeElements() {
        document.body.classList.add(BODY_CONFIG_MODE);
    }
    loadedConfigurations(fastStyle) {
        window.scrollTo(0, 0);
        if (fastStyle) {
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
export default SystemConfigurationsView;
