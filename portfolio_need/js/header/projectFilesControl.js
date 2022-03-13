

/* Container that holds all files */
const projectsFolderContainer = document.querySelector("#projects-buttons");
 

/* From folder, files (Anchors) used to link to projects */
var projectFiles = Array.from(projectsFolderContainer.querySelectorAll('a'));


/* Show hide files related to a folder */

let folderButtons = Array.from(document.querySelectorAll("[folder]"));

folderButtons.forEach((folderButton) => {
    folderButton.addEventListener("click", changeFilesSize.bind(null, folderButton));
})

 
const projectsBox = document.querySelector("#project-box");

projectFiles.forEach(setupProjectFile);

  
function setupProjectFile(project_file) { 
    const project = document.querySelector(`[project-name=${project_file.getAttribute("link-project-name")}`);
    project_file.addEventListener('click', moveUserToProject.bind(null, project));
}


/* Function that gets called when the file (project link) is clicked */
function moveUserToProject(project) {
    console.log(`offset:  ${project.offsetLeft} Project: ${project.getAttribute("project-name")}`);

    projectsBox.scrollLeft = project.offsetLeft - projectsBox.offsetLeft;
    project.scrollIntoView();

    markProjectAsSelected(project);
 

}
 

function markProjectAsSelected(project) {
    console.log("marking as selected");
    project.classList.remove("project-selected");
    void project.offsetWidth;
    project.classList.add("project-selected");
}

 

function changeFilesSize(folderButton) {

    const folderContainer = folderButton.nextElementSibling;

    folderContainer.classList.toggle("closed-folder");

    var projectFiles = Array.from(folderContainer.querySelectorAll('a'));

    projectFiles.forEach((el) => {
        el.classList.toggle("opened_file");
        el.classList.toggle("closed_file");

    })

 
}
