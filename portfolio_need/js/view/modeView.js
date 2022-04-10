var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import View from "../classes/view.js";
import domInjector from "../decorators/dom-injector.js";
class ModeView extends View {
    constructor() {
        super(...arguments);
        this.binaryDanceListeners = [];
        this.binaryAmmount = 6;
        this.binaryCalls = 4;
    }
    inicializeElements() { }
    setCoverScreenMode(mode) {
        console.log("Adding screen-cover--" + mode);
        this.coverScreen.classList.add("screen-cover--" + mode);
    }
    removeCoverScreenMode(mode) {
        console.log("Removing screen-cover--" + mode);
        this.coverScreen.classList.remove("screen-cover--" + mode);
    }
    removeLoadingContent() {
        var _a;
        (_a = this.loadingBar.parentElement) === null || _a === void 0 ? void 0 : _a.remove();
    }
    applyLoadingMode() {
        this.setCoverScreenMode("loading");
        console.log("Binary ammount: " + this.binaryAmmount);
        setTimeout(() => {
            let animation = this.loadingBar.getAnimations()[0];
            console.log(animation);
            if (animation.playState === "running") {
                this.loadingBar.addEventListener('animationend', () => {
                    console.log('Animation ended');
                    this.finishedLoading();
                });
            }
            else {
                this.finishedLoading();
            }
        }, 0);
    }
    addListenerToFinishedBinaryDance(callback) {
        this.binaryDanceListeners.push(callback);
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
    finishedLoading() {
        setTimeout(() => {
            this.loadingTitle.classList.add("loading__title--loaded");
        }, 1000);
        this.makeBinaryDance();
        for (let i = 0; i < this.binaryCalls; i++) {
            setTimeout(this.makeBinaryDance.bind(this), 80 * i);
        }
        setTimeout(this.loadingTitleFinishedAnimation.bind(this), 1500);
    }
    makeBinaryDance() {
        let binaryTexts = [];
        for (let i = 0; i < this.binaryAmmount; i++) {
            let binaryText = this.makeBinaryText();
            binaryTexts.push(binaryText);
            binaryText.style.left = (i * 20) + Math.round(Math.random() * 25) + "%";
            binaryText.style.top = 105 + Math.floor(Math.random() * 30) + "%";
            binaryText.style.animationDuration = (Math.random() * 1.2 + i / 2) + "s";
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
        }, Math.random() * 600);
    }
    loadingTitleFinishedAnimation() {
        this.loadingTitle.remove();
        setTimeout(this.setCoverScreenMode.bind(this, "loaded"), 1000);
        setTimeout(() => {
            this.removeCoverScreenMode("loading");
            this.binaryTextDiv.remove();
            this.binaryDanceListeners.forEach(listener => listener());
        }, 3000);
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
__decorate([
    domInjector("#loading__bar")
], ModeView.prototype, "loadingBar", void 0);
export default ModeView;
