

const languageTranslations = {};


 class SystemConfigurations {
    constructor() {
        this.selectedLanguage = "";

    }


    addToLanguage(newLanguage, translations) {
        /*console.log("calling addToLanguage, " + newLanguage);*/
        languageTranslations[newLanguage] = translations;
    }
    
    getLanguageTranslations() {
        return languageTranslations;
    }

    setLanguage(newLanguage) {
        this.selectedLanguage = newLanguage;
    }
    
    translateWord(key) {
        /*console.log("translating " + key + " with " + selectedLanguage);*/
    
        const languageTranslation = languageTranslations[this.selectedLanguage];
        if(!languageTranslation) {
            return null;
        }
        return languageTranslation[key];
    }

}

const systemConfigurations = new SystemConfigurations();

export default systemConfigurations;