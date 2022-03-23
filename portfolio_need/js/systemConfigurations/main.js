



import languageLoad from "./languageLoad.js";


let languageOptionsHTML = "";
let languageSwitchHTML = "";

Object.keys(languageLoad.getLanguageTranslations()).forEach((language) => {

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
                    src="portfolio_need/res/flags/${language}.png">;
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

 







const loadLanguage = languageLoad.loadLanguage;

document.body.classList.add("body--config");
 


function submitConfigurations(event) {

    event.preventDefault();

    let selectedLanguage = languageSelect.value.toLowerCase();

    let saveConfigurationsSelect = configurationForm.querySelector(
        "#configuration-form-save-select");


    saveConfigurations(selectedLanguage,
        saveConfigurationsSelect);


    loadLanguage(selectedLanguage);

    loadedConfigurations(false);


}

function saveConfigurations(selectedLanguage, saveConfigurationsSelect) {

    let saveOption = saveConfigurationsSelect.value;

    if (saveOption == "session") {
        sessionStorage.setItem("language", selectedLanguage);
        return;
    }

    if (saveOption == 'local') {
        localStorage.setItem("language", selectedLanguage);
        return;
    }

}

function loadedConfigurations(fastStyle) {

    if (fastStyle) { 
        document.body.classList.remove("body--config"); 
        return;
    }


    const inputs = Array.from(
        configurationForm.parentElement.querySelectorAll(
            ".move-input"));

    inputs.push(languageSelect);

    inputs.forEach((input) => {
        input.classList.add("system-configurations__input--closed");
    })

    setTimeout(() => {
        window.scrollTo(0, 0);

        document.body.classList.remove("body--config");


        configurationForm.parentElement.classList.add("system-configurations--closed");

        setTimeout(() => { configurationForm.parentElement.remove(); },
            5000);


    }, 6000)
}

const savedSelectedLanguage =
    sessionStorage.getItem("language") || localStorage.getItem("language");



if (savedSelectedLanguage) {


    window.addEventListener("load", () => {
        loadLanguage(savedSelectedLanguage, true);
        loadedConfigurations(true);
    });


} else {

    document.body.innerHTML = systemConfigurationsHTML + document.body.innerHTML;


    
    var configurationForm = document.getElementById("configuration-form");

    var languageSelect = document.getElementById("language-choice-select");
    configurationForm.addEventListener("submit", submitConfigurations);

}





