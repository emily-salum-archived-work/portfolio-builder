

const languageTranslations: any = {};


 class SystemConfigurations {

    selectedLanguage: string 

    constructor() {
        this.selectedLanguage = "";

    }

    addToLanguage(newLanguage: string, translations: Object) {
        /*console.log("calling addToLanguage, " + newLanguage);*/
        languageTranslations[newLanguage] = translations;
    }
    
    getLanguageTranslations() {
        return languageTranslations;
    }

    setLanguage(newLanguage: string) {
        this.selectedLanguage = newLanguage;
    }
    
    translateWord(key: string): string {
        /*console.log("translating " + key + " with " + selectedLanguage);*/
    
        const languageTranslation = languageTranslations[this.selectedLanguage];
        if(!languageTranslation) {
            return key;
        }
        return languageTranslation[key] || key;
    }

}

const configuration = new SystemConfigurations();

export default configuration;