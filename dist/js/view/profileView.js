import configuration from"../models/systemConfigurationsModel.js";import View from"./view.js";class ProfileField{constructor(e,t,l){this.fieldElement=e,t||(t=e.querySelector(".profile__field-key")),l||(l=e.querySelector(".profile__value")),this.fieldTitle=t,this.fieldValue=l}}export class ProfileView extends View{constructor(e){super(e),this.profileFieldObjects=[]}inicializeElements(){this.profile=document.getElementById("profile"),this.profileBody=document.getElementById("profile__body"),this.profileFields=this.profileBody.querySelectorAll(".profile__column"),this.buildProfileButton=document.getElementById("profile_button")}buildProfileFields(){this.profileFields.forEach(e=>{let t=new ProfileField(e);this.profileFieldObjects.push(t)})}addFieldToProfile(e,t,l){let i=configuration.translateWord(e);i&&(e=i);let r=document.createElement("tr");r.classList.add("profile__element"),r.classList.add("profile__column");let o=buildFieldTitle(e);r.appendChild(o);let s=buildFieldValue(e,t,l);r.appendChild(s),this.profileBody.appendChild(r);let d=new ProfileField(r,o,s);this.profileFieldObjects.push(d)}hideRawElements(){Array.from(profile.getElementsByClassName("profile__key")).forEach(e=>{e.classList.add("profile__key--closed")}),this.buildProfileButton.classList.add("profile__key--closed"),setTimeout(()=>{this.buildProfileButton.remove()},1600)}listenProfileButton(e){this.buildProfileButton.addEventListener("click",e)}prettifyField(e){let t=e.fieldTitle,l=e.fieldValue;e.fieldElement.classList.add("profile__column--pretty"),this.prettifyTitleElement(t),this.prettifyValueElement(l)}prettifyProfile(){this.profile.classList.add("profile--pretty"),this.profile.classList.remove("profile--raw"),this.profileBody.classList.add("profile__body--pretty"),this.profileFieldObjects.forEach(e=>{this.prettifyField(e)})}prettifyTitleElement(e){e.classList.remove("profile__field-key"),e.classList.add("profile__field-title")}prettifyValueElement(e){e.classList.add("profile__value--pretty"),e.classList.remove("profile__element--raw-value");let t=e.getAttribute("not-raw");t=configuration.translateWord(t)||t,e.innerHTML=t;let l=e.getAttribute("field_class");e.classList.toggle(l)}showHiddenFromRawElements(){Array.from(this.profile.getElementsByClassName("profile__element--hidden-from-raw")).forEach(e=>{e.classList.remove("profile__element--hidden-from-raw")})}};function buildFieldTitle(e){let t=document.createElement("td");return t.innerHTML=e,configuration.translateWord(e)||t.setAttribute("to-translate",e),t.classList.add("profile__field-key"),t.classList.add("profile__element"),t}function buildFieldValue(e,t,l){let i=document.createElement("td");return i.innerHTML=l||t,i.classList.add("profile__value"),i.setAttribute("not-raw",t),i.setAttribute("field_class",`${e}_value`),i}