import mainController from"../controllers/mainController.js";class View{constructor(e,n){this.controller=e,n?mainController.mainEventController.on(n,()=>{this.inicializeElements()}):document.addEventListener("DOMContentLoaded",()=>{this.inicializeElements()})}inicializeElements(){}}export default View;