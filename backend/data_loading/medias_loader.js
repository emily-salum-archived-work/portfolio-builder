

/* Relevant Social Medias! */

function socialMedia(link, icon){

    return {link, icon}
}



exports.loadSocialMedias = function loadSocialMedias() {


    const socialMedias = [];


    socialMedias.push(socialMedia("http://discord.com/users/674759841583202328",
        "portfolio_need/res/images/medias/discord_logo.png"));

    socialMedias.push(socialMedia("https://www.linkedin.com/in/emily-salum-839653217/", 
    "portfolio_need/res/images/medias/linkedin_logo.png"));
    
    socialMedias.push(socialMedia("https://github.com/emilymarquessalum/", 
            "portfolio_need/res/images/medias/github_logo.png"));
    
    return socialMedias;

}