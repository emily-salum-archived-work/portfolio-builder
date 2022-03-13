




const OPENED_HEADER = "opened_header";
const CLOSED_HEADER = "closed_header";



let header = document.getElementsByTagName("header")[0];

   
/* ? */
header.addEventListener("click", changeHeaderState, true);


/* The header gets closed whenever the user clicks on anything outside the header */
document.body.addEventListener("click", closeHeader, true);


/* whenever a button is clicked, it should also count as opening the header */
headerButtons = document.getElementsByClassName("header-button")
for (button of headerButtons) {
    button.addEventListener("click", openHeader, false);
}


function changeHeaderState() {

    header.classList.toggle(CLOSED_HEADER);
    header.classList.toggle(OPENED_HEADER);
}

function closeHeader() {
    header.classList.add(CLOSED_HEADER);
    header.classList.remove(OPENED_HEADER);

}

function openHeader() {

    header.classList.add(OPENED_HEADER);
    header.classList.remove(CLOSED_HEADER);
}