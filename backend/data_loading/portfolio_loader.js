

/* Gathers all the data needed to build the page using
ejs */

const { getProfile } = require("./profile_loader.js");
const { getTechs } = require("./techs_loader.js");
const { getLanguagesISpeak } = require("./languages_loader.js");
const { getControllerNames } = require("./controllers_loader.js");
const { loadSocialMedias } = require("./medias_loader.js");


exports.getPortfolioData = function getPortfolioData(projectList, __dirname) {

    return {
      'projectList': projectList,
      'techList': getTechs(),
      'profile': getProfile(),
      'languages': getLanguagesISpeak(), 
      'headerFileIds': ["profile", "cv", "contacts"],/* header file elements -inorder- */
      "socialMedias": loadSocialMedias(),
      'JSControllerNames': getControllerNames(),

    'metadata': {"last_updated": new Date().toISOString()},
  
      'root': __dirname
    }
  }
  