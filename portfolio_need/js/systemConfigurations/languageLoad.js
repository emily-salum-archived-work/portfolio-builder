


var selectedLanguage;

function loadLanguage(newSelectedLanguage, fastStyle=false) {
 
    console.log(newSelectedLanguage);

    selectedLanguage = newSelectedLanguage;


    setLanguage(fastStyle);    
    
}

function setLanguage(fastStyle) {
 
    
    changedLanguage(fastStyle);
    

    const toTranslateObjects = Array.from(document.querySelectorAll("[to-translate]"));

    toTranslateObjects.forEach((element) => {

        element.innerHTML = translateWord(element.getAttribute(
            "to-translate"));

    });
}


function changedLanguage(fastStyle) {
     
     if(fastStyle) {
         return;
     }

     const languageSwitch = document.getElementById(
         "language-switch");
    languageSwitch.classList.remove(
        "system-configurations__language-switch--hidden");
     
    const selectedCase = languageSwitch.querySelector(
        "#" + selectedLanguage + "-case");


     setTimeout(()=> {
        selectedCase.classList.add("system-configurations__switch-case--selected");},
         3500);


}


 
 

const languageTranslations = {};

function addToLanguage(newLanguage, translations) {
    /*console.log("calling addToLanguage, " + newLanguage);*/
    languageTranslations[newLanguage] = translations;
}

function getLanguageTranslations() {
    return languageTranslations;
}

function translateWord(key) {
    /*console.log("translating " + key + " with " + selectedLanguage);*/

    const languageTranslation = languageTranslations[selectedLanguage];
    if(!languageTranslation) {
        return null;
    }
    return languageTranslation[key];
}

export default { addToLanguage, getLanguageTranslations, translateWord, loadLanguage };