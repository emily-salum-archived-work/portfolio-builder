
/* Auto js importers */

const fs = require("fs");
const path = require('path');

function getControllerNames() {
 
    const controllersPath = "../../portfolio_need/js/controllers"
    let paths = fs.readdirSync(path.join(__dirname,
        controllersPath));
    
    return paths;
}

exports.getControllerNames = getControllerNames;