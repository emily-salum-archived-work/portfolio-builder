var fs = require('fs');
const pathf = require('path');

function make_project(name) {
    let image = "portfolio_need/res/crumbt_hunt_start.png";

    return { 'name': name, 'image': image };
}
exports.make_project = make_project;

function make_function_argument(funct, parameters)
{
    return {'function' : funct, 'parameters' : parameters};
}
exports.make_function_argument = make_function_argument;

function save_images(project_lists) {

    for (key of Object.keys(project_lists)) {
        for (project of project_lists[key]) {
            filepath = project.image;
            fileName = pathf.basename(filepath);

            fs.copyFile(filepath, './portfolio_need/res/' + fileName, (err) => {
                if (err)
                    throw err;
            });

            project.image = './portfolio_need/res/' + fileName;


        }
    }

}
exports.save_images = save_images;
