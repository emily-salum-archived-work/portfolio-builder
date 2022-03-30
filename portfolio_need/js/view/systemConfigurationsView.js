import View from "./view.js";


import staticConfiguration from "../models/staticConfigurationsModel.js";

const FORM_ID = 'configuration-form';
const BODY_CONFIG_MODE = "body--config"


export default class SystemConfigurationsView extends View {

    constructor(controller) {

         super(controller, "startedConfigurations");
    }

    inicializeElements() {

        this.configurationForm = document.getElementById(FORM_ID);
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
        })

        setTimeout(() => {
            window.scrollTo(0, 0);

            document.body.classList.remove(BODY_CONFIG_MODE);


            this.configurationForm.parentElement.classList.add("system-configurations--closed");

            setTimeout(() => { this.configurationForm.parentElement.remove(); },
                5000);


        }, 6000)
    }



    getToMoveElements() {

        let toMoveElements = Array.from(
            this.configurationForm.parentElement.querySelectorAll(
                ".move-input"));

         
        return toMoveElements;
    }


    listenForm(onSubmit) {
        this.configurationForm.addEventListener("submit",
            (event) => {
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
            `

            languageSwitchHTML +=
                `<p class="system-configurations__switch-case" 
                id="${language}-case"> 
                    case ${language}: 
                </p>
                
                <p class="system-configurations__switch-result"> 
                    return <img class="system-configurations__switch-image"
                        src="${staticConfiguration.initialPath()}/res/images/flags/${language}.png">;
                </p>`


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

            switch(language) {
                `
            + languageSwitchHTML
            + ` 
        }
        </div>




    </div>`;


        return systemConfigurationsHTML;

    }

}