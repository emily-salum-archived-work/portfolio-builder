var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import configuration from "../models/systemConfigurationsModel.js";
import staticConfiguration from "../models/staticConfigurationsModel.js";
import View from "../classes/view.js";
import domInjector from "../decorators/dom-injector.js";
class CvView extends View {
    inicializeElements() {
    }
    translateCv() {
        this.cvLink.setAttribute("href", `${staticConfiguration.initialPath()}/res/others/cv/cv_${configuration.selectedLanguage}.pdf`);
    }
}
__decorate([
    domInjector("#cv")
], CvView.prototype, "cvSection", void 0);
__decorate([
    domInjector("#cv_link")
], CvView.prototype, "cvLink", void 0);
export default CvView;
