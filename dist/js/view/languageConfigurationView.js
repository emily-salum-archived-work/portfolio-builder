import View from"./view.js";const LANGUAGE_SELECT_ID="language-choice-select",LANGUAGE_SWITCH_ID="language-switch";export default class LanguageConfigurationView extends View{constructor(e){super(e,"startedConfigurations")}inicializeElements(){this.languageSwitch=document.getElementById(LANGUAGE_SWITCH_ID),this.languageSelect=document.getElementById(LANGUAGE_SELECT_ID)}getElementsToTranslate(){return Array.from(document.querySelectorAll("[to-translate]"))}getToMoveElements(){return[this.languageSelect]}changedLanguage(e,t=!1){if(t)return;this.languageSwitch.classList.remove("system-configurations__language-switch--hidden");const s=this.languageSwitch.querySelector("#"+e+"-case");setTimeout(()=>{s.classList.add("system-configurations__switch-case--selected")},3500)}};