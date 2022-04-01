var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import View from "../classes/view.js";
import domInjector from "../decorators/dom-injector.js";
class ModeView extends View {
    inicializeElements() {
    }
    setCoverScreenMode(mode) {
        console.log("Adding screen-cover--" + mode);
        this.coverScreen.classList.add("screen-cover--" + mode);
    }
    removeCoverScreenMode(mode) {
        console.log("Removing screen-cover--" + mode);
        this.coverScreen.classList.remove("screen-cover--" + mode);
    }
    applyLoadingMode() {
        this.setCoverScreenMode("loading");
        document.body.appendChild(this.loadingTitle);
        setTimeout(this.finishedLoading.bind(this), 50);
    }
    finishedLoading() {
        setTimeout(() => {
            this.loadingTitle.classList.add("loading__title--loaded");
        }, 300);
        this.binaryDance();
        for (let i = 0; i < 5; i++) {
            setTimeout(this.binaryDance.bind(this), 60 + 90 * i);
        }
        setTimeout(this.loadingTitleFinishedAnimation.bind(this), 1500);
    }
    binaryDance() {
        let binaryTexts = [];
        for (let i = 0; i < 6; i++) {
            let binaryText = this.makeBinaryText();
            binaryTexts.push(binaryText);
            binaryText.style.left = (i * 20) + Math.round(Math.random() * 20) + "%";
            binaryText.style.top = 110 + Math.floor(Math.random() * 50) + "%";
            this.binaryTextDiv.appendChild(binaryText);
        }
        this.binaryDanceStart(binaryTexts);
    }
    makeBinaryText() {
        let binaryText = document.createElement("p");
        binaryText.classList.add("loading__binary");
        let binaryTextContent = "";
        for (let j = 0; j < 16; j++) {
            binaryTextContent += Math.round(Math.random()) ? "1" : "0";
        }
        binaryText.innerHTML = binaryTextContent;
        return binaryText;
    }
    binaryDanceStart(binaryTexts) {
        if (binaryTexts.length === 0) {
            return;
        }
        let nextText = binaryTexts.splice(Math.round(Math.random() * binaryTexts.length) - 1, 1)[0];
        nextText.classList.add("loading__binary--animated");
        setTimeout(() => {
            this.binaryDanceStart(binaryTexts);
        }, Math.random() * 800);
    }
    loadingTitleFinishedAnimation() {
        this.loadingTitle.remove();
        setTimeout(() => {
            this.removeCoverScreenMode("loading");
        }, 5000);
        setTimeout(this.setCoverScreenMode.bind(this, "loaded"), 1000);
        setTimeout(() => {
            this.binaryTextDiv.remove();
        }, 5000);
    }
    applyLightMode() {
        document.body.classList.toggle("body--light-mode");
    }
    changeUnfocus(doUnfocus) {
        if (doUnfocus) {
            this.setCoverScreenMode("unfocus");
            return;
        }
        this.removeCoverScreenMode("unfocus");
    }
}
__decorate([
    domInjector("#change-mode_button")
], ModeView.prototype, "changeModeButton", void 0);
__decorate([
    domInjector(".screen-cover")
], ModeView.prototype, "coverScreen", void 0);
__decorate([
    domInjector("#loading-title")
], ModeView.prototype, "loadingTitle", void 0);
__decorate([
    domInjector("#loading__binaries")
], ModeView.prototype, "binaryTextDiv", void 0);
export default ModeView;
