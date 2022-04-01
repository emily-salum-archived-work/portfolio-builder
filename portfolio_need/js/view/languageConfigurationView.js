var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import View from "../classes/view.js";
import domInjector from "../decorators/dom-injector.js";
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
export default LanguageConfigurationView;
