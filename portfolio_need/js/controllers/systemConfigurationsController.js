import configuration from '../models/systemConfigurationsModel.js';
import languageConfigurations from './languageConfigurationsController.js';
import SystemConfigurationsView from '../view/systemConfigurationsView.js';
import mainController from "../classes/mainController.js";
import Controller from "../classes/controller.js";
class SystemConfigurationsController extends Controller {
    constructor() {
        super(SystemConfigurationsView, 50);
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
        if (document.readyState === "complete") {
            this.loadConfigurations(savedSelectedLanguage);
            return true;
        }
        window.addEventListener("load", () => {
            this.loadConfigurations(savedSelectedLanguage);
        });
        return true;
    }
    loadConfigurations(savedSelectedLanguage) {
        languageConfigurations.loadLanguage(savedSelectedLanguage, true);
        this.view.loadedConfigurations(true);
        mainController.mainEventController.emit("finishedConfigurations");
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
