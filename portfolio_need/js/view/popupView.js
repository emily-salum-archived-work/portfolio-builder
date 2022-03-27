
import configuration from "../models/systemConfigurationsModel.js";

class PopupView {


    constructor() {

        this.popupDiv = null;


    }

    makePopup(title, text) {

        title = configuration.translateWord(title);
        text = configuration.translateWord(text);

        if (popupDiv) {

            this.removePopup();
        }

        

        this.popupDiv = this.createPopup(title, text);
        document.body.appendChild(this.popupDiv);
    }


    createPopup(title, text) {
        popupDiv = document.createElement("div");

        popupDiv.classList.add("popup");

        const titleElement = document.createElement("h3");
        titleElement.innerHTML = title;
        popupDiv.appendChild(titleElement);

        const textElement = document.createElement("p");
        textElement.innerHTML = text;

        popupDiv.appendChild(textElement);

        return this.popupDiv;
    }

    removePopup() {
        this.popupDiv.remove();
        this.popupDiv = null;
    }


}

const popupView = new PopupView();

export default popupView

