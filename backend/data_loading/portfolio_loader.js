



const { getProfile } = require("./profile_loader.js");
const { getTechs } = require("./techs_loader.js");
const { getLanguagesISpeak } = require("./languages_loader.js");
const { getControllerNames } = require("./controllers_loader.js");
const { loadSocialMedias } = require("./medias_loader.js");


exports.getPortfolioData = function getPortfolioData(project_lists, __dirname) {

    return {
      'project_lists': project_lists,
      'tech_list': getTechs(),
      'profile': getProfile(),
      'languages': getLanguagesISpeak(),
      'fileIds': ["profile", "cv", "contacts"],
      "socialMedias": loadSocialMedias(),
      'JSControllerNames': getControllerNames(),
    'metadata': {"last_updated": new Date().toISOString()},
  
      'root': __dirname
    }
  }
  