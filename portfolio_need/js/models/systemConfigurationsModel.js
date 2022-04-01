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
export default configuration;
