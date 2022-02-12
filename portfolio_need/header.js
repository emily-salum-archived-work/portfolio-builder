






 

let header = document.getElementsByTagName("header")[0];

 
 
 
 header.addEventListener("click", changeHeaderState, true);

 

 let projects_button = document.getElementById("projects-button");

 let projects_buttons = document.getElementById("projects-buttons");

 let projects_box = document.getElementById("project-box");

 let projects = projects_box.getElementsByClassName("project");





 let projectFiles = [] 

 projects = [...projects].reverse();
 for(project of projects)
 {

    
    let project_file = document.createElement("a");
    project_file.href = "#projects";
    project_file.classList.add("header-button");

    projectFiles.push(project_file);
    project_file.innerHTML = project.getAttribute("project-name");
    
    project_file.addEventListener('click', function(project){

        console.log(`offset:  ${project.offsetLeft }
        Project: ${project.getAttribute("project-name") }
        `);
        
        projects_box.scrollLeft =      project.offsetLeft   -projects_box.offsetLeft  ;
        project.scrollIntoView();

        project.classList.remove("project-selected");

        void project.offsetWidth;

        project.classList.add("project-selected");

    }.bind(null, project)
    )
    
    projects_button.nextSibling.parentElement.insertBefore(project_file,projects_button.nextSibling );

 }


 let baseWidth = projectFiles[0].style.fontSize;

 projects_button.addEventListener("click", changeFilesSize.bind(null, projectFiles, baseWidth)
 
 );
 changeFilesSize(projectFiles, baseWidth)

 function changeFilesSize(files, baseSize)
 {
    let newSize = files[0].style.fontSize;

    if(newSize == baseSize)
    {
        newSize = '0';
    }
    else
    {
        newSize = baseSize;
    }

    for(el of files)
    {
        el.style.fontSize = newSize;
    }
 }


 document.body.addEventListener("click", closeHeader, true);
 headerButtons = document.getElementsByClassName("header-button")
 for(button of headerButtons)
 {
    button.addEventListener("click", openHeader, false);
    
 }


 function changeHeaderState()
 {
    
    if(header.style.width == "10vw")
    {

        closeHeader()
        return
    }
  
        openHeader()
  
    


}

function closeHeader()
{
    header.style.width = "3vw"; 
     
}

function openHeader()
{
    header.style.width = "15vw"; 
}