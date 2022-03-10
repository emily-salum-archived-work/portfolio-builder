




const OPENED_HEADER = "opened_header";
const CLOSED_HEADER = "closed_header";



let header = document.getElementsByTagName("header")[0];




header.addEventListener("click", changeHeaderState, true);



 
 
/* holds all the project items */
var projectsContainer = document.getElementById("project-box");


/* All project items of page */
var projects = projectsContainer.getElementsByClassName("project");

/* Anchors used to link to projects */
var projectFiles = [];

/* Projects show/hide state in header */
let projectsButton = document.getElementById("projects-button");
projectsButton.addEventListener("click", changeFilesSize);
 

createProjectShortcuts();


let baseWidth = projectFiles[0].style.fontSize;

projectFiles.forEach((el)=> el.classList.add("closed_file"))


 

/* Anchor to project */
function createProjectShortcut(project) {
    let projectFile = document.createElement("a");

    projectFile.href = "#projects";
    projectFile.classList.add("header-button");

    projectFile.innerHTML = project.getAttribute("project-name");

    return projectFile
}


/* Function that gets called when the project shortcut is clicked */
function moveUserToProject(project) {
    console.log(`offset:  ${project.offsetLeft} Project: ${project.getAttribute("project-name")}`);

    projectsContainer.scrollLeft = project.offsetLeft - projectsContainer.offsetLeft;
    project.scrollIntoView();

    project.classList.remove("project-selected");

    void project.offsetWidth;

    project.classList.add("project-selected");

}

function createProjectShortcuts() {
    projects = [...projects].reverse();

    for (project of projects) {

        let project_file = createProjectShortcut(project);

        projectFiles.push(project_file);

        project_file.addEventListener('click', moveUserToProject.bind(null, project)
        );

        projectsButton.nextSibling.parentElement.insertBefore(project_file, projectsButton.nextSibling);

    }
}

function changeFilesSize() {
   
    projectFiles.forEach((el) => {
        el.classList.toggle("opened_file");
        el.classList.toggle("closed_file");

    })

 
}

/* The header gets closed whenever the user clicks on anything outside the header */
document.body.addEventListener("click", closeHeader, true);



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