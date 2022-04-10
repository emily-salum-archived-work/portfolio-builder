 
const { app } = require("electron");

/*

    To add a new project:

    1. Add the project to the projectList array, inside loadProjects. How?
        A- Make a new Project object with each value manually.
        B- Make a new Project object with the makeProject function, whichwill automate the
        process of filling some information based on the assumption that:
            - the project name passed is the same from github.
            - the repository has an image of path readmeres/presentation.png
        C- Make a new Project object with a ProjectMaker object, to reference a particular stack.


*/


/* Project model class. Its being passed directly to the ejs file. */
class Project {


    constructor(name, image, techs, github, links) {         
            this.name = name;
            this.image = image;
            this.techs = techs;
            this.github = github;
            this.open_link = links.open;
            this.watch_link = links.watch;
    }
}

/* Factory-like class that creates projects of the same techstack */
class ProjectCreator {

    /**
     * 
     * @param {String} techStack
     */
    constructor(techStack) {
        this.techStack = techStack;
  
    }

    /**
 * @param {String} nome 
 * @param {Object} links 
 * 
 */
    addProject(nome,  links) {
        projectList.push(makeProject(nome,  this.techStack, links));
    }
 
}


 
 function makeProject(name, techs, links=null) {
    

    let noSpacesName = name.replace(" ", "")
    let image = `https://raw.githubusercontent.com/emilymarquessalum/${noSpacesName}/main/readmeres/presentation.png`;

    let github = `https://github.com/emilymarquessalum/${noSpacesName}`;

    let open_link = links ? links.open : github;
    let watch_link = links?.watch;
    
    return new Project(name, image, techs, github, {"open": open_link, "watch": watch_link});
  
}


 

var projectList = []

function loadProjects() {


    projectList = [];

    const godotProjects = new ProjectCreator("godot");
    const frontStackProjects = new ProjectCreator("HTML, CSS, JS");
    const javaProjects = new ProjectCreator("java");


    //projectList.push(makeProject("portfolio-builder", "Electron, Python, Typescript."));



    javaProjects.addProject("Perfect Seven",
         {"watch": "https://www.youtube.com/embed/CWss5f941eA"});


    godotProjects.addProject(
        "Heart Beat",
         {"open": "https://gotm.io/emilysalum/heart-beat"})



    frontStackProjects.addProject(
        "alura-barbearia",
         {"open": "https://emilymarquessalum.github.io/alura-barbearia/"})



    

    javaProjects.addProject("Crumb Hunt",
         {"watch": "https://www.youtube.com/embed/urmSuQsfpsE"})
 

    /* Emits that the projects were loaded */
    app.emit("project_lists_loaded", projectList);


}

exports.loadProjects = loadProjects;
