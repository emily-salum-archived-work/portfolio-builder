


export class ProfileField {


    constructor(fieldElement, titleElement, valueElement) {
        this.fieldElement = fieldElement;

        if(!titleElement) {
            titleElement = fieldElement.querySelector(".profile__field-key");
        }

        if(!valueElement) {
            valueElement = fieldElement.querySelector(".profile__value");
        }

        this.titleElement = titleElement;
        this.valueElement = valueElement;
    }

 
  
}