import configuration from "../models/systemConfigurationsModel.js";
class PopupView {
    constructor() {
    }
    makePopup(title, text) {
        title = configuration.translateWord(title);
        text = configuration.translateWord(text);
        this.removePopup();
        this.popupDiv = this.createPopup(title, text);
        document.body.appendChild(this.popupDiv);
    }
    removePopup() {
        if (this.popupDiv) {
            this.popupDiv.remove();
            this.popupDiv = null;
        }
    }
    createPopup(title, text) {
        let popupDiv = document.createElement("div");
        popupDiv.classList.add("popup");
        const titleElement = document.createElement("h3");
        titleElement.innerHTML = title;
        popupDiv.appendChild(titleElement);
        const textElement = document.createElement("p");
        textElement.innerHTML = text;
        popupDiv.appendChild(textElement);
        return popupDiv;
    }
}
const popupView = new PopupView();
export default popupView;
