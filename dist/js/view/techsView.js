class TechDisplay{constructor(e,t){this.techName=e,this.techImage=t}}import View from"./view.js";export class TechsView extends View{constructor(e){super(e),this.techDisplays=[],this.buildTechObjects()}inicializeElements(){this.techLogos=Array.from(document.querySelectorAll(".techs__image")),this.techNames=Array.from(document.querySelectorAll(".techs__name"))}buildTechObjects(){this.techNames.forEach(e=>{const t=e.getAttribute("tech-name");let s=this.getTechLogoFromName(t),c=new TechDisplay(e,s);this.techDisplays.push(c)})}listenForTechNameHover(e,t){this.techDisplays.forEach(s=>{let c=s.techName,h=s.techImage;c.addEventListener("mouseover",()=>{e(c,h)}),c.addEventListener("mouseout",()=>{t(c,h)})})}getTechLogoFromName(e){for(let t=0;t<this.techLogos.length;t++){let s=this.techLogos[t];if(s.getAttribute("tech")===e)return s}}unselectTechs(){this.techLogos.forEach(e=>{e.classList.add("techs__image--unselected")})}removeUnselectFromTechLogos(){this.techLogos.forEach(e=>{e.classList.remove("techs__image--unselected")})}};