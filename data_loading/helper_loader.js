var fs = require('fs');
const pathf = require('path');

function make_project(name, image, techs, open_link="#") {
    if(!image) {
        image = "portfolio_need/res/crumbt_hunt_start.png";
    }
    

    return { 'name': name, 'image': image, 'open_link': open_link, 'techs': techs };
}
exports.make_project = make_project;



function make_function_argument(funct, parameters) {
    return { 'function': funct, 'parameters': parameters };
}


exports.make_function_argument = make_function_argument;


const baseImagePath = './portfolio_need/res/project-images/';

function save_images(project_lists) {



    for (key of Object.keys(project_lists)) {
        for (project of project_lists[key]) {
            filepath = project.image;
            fileName = project.name + "_presentation_image.png";

            let fileExists = fs.existsSync(baseImagePath + fileName);

            if(!fileExists) {
                fs.copyFile(filepath, baseImagePath + fileName, (err) => {
                                
                            });
            }
         

            project.image = baseImagePath + fileName;


        }
    }

}
exports.save_images = save_images;
