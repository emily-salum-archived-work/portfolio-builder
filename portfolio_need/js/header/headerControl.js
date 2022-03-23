




const OPENED_HEADER = "header--opened";
const CLOSED_HEADER = "header--closed";

const coverScreen = document.querySelector(".screen-cover");

var header = document.getElementById("header");
 
   
/* ? */
document.body.addEventListener("click", 
clickHeader, 
true);


function clickHeader(event) {

    let element = event.target;
    
    let hasHeaderOrigin = element.id === 'header' || header.contains(element);
    if(!hasHeaderOrigin) {
        closeHeader();
        return;
    }

    openHeader();
}
 
function changeHeaderState() {

    header.classList.toggle(CLOSED_HEADER);
    header.classList.toggle(OPENED_HEADER);
}
 

export function closeHeader() {
    console.log("Close header");
    
    
    console.log(" classes : " + header.classList);
    header.classList.add(CLOSED_HEADER);
    header.classList.remove(OPENED_HEADER);
    
    console.log(" classes : " + header.classList);

    coverScreen.classList.remove("screen-cover--unfocus");

}

function openHeader() {

    console.log("opening header");
    
    console.log(" classes : " + header.classList);
    header.classList.add(OPENED_HEADER);
    header.classList.remove(CLOSED_HEADER);
    
    console.log(" classes : " + header.classList);

    console.log(header);
    coverScreen.classList.add("screen-cover--unfocus");
}
 