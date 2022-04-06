var fs = require('fs');
const pathf = require('path');

/**
 * 
 * @param {String} name 
 * @param {String} image 
 * @param {String} techs 
 * @param {String} open_link 
 * @returns {Object}
 */
function makeProject(name, techs, links) {
    

    let noSpacesName = name.replace(" ", "")
    let image = `https://raw.githubusercontent.com/emilymarquessalum/${noSpacesName}/main/readmeres/presentation.png`;

    let github = `https://github.com/emilymarquessalum/${noSpacesName}`;

    let open_link = links.open;
    let watch_link = links.watch;

    return { 'name': name,
     'image': image, 
     'open_link': open_link, 
        'watch_link': watch_link,
     'github': github, 
     'techs': techs };
}
exports.makeProject = makeProject;

 

const baseImagePath = './portfolio_need/res/images/project-images/';

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
