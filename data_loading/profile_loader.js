

  function getStuffILikeText(stuffILike) {
    let stuffILikeText = "";
    
    stuffILike.forEach((el) => {stuffILikeText += el + ", ";});
    stuffILikeText = stuffILikeText.substring(0, stuffILikeText.length - 2);

    stuffILikeText += "!";

    let lastItem = stuffILikeText.lastIndexOf(",")
    stuffILikeText = stuffILikeText.substring(0, lastItem) + " and" + stuffILikeText.substring(lastItem + 1, stuffILikeText.length);

    return stuffILikeText;
  }
  
  function stuffILikeString(stuffILike) {

    let likesString = "[";
    
    stuffILike.forEach((t) => {likesString += `"${t}",` });

    likesString = likesString.substring(0, likesString.length - 1) + "]";

    return likesString;
  }
  
  exports.getProfile =  function getProfile() {

    /* Steps to add or remove from stuffILike:
      * 1. Add or remove from this array.
      * 2. Add or remove from the translation files key "stuffILike"
     */
    const stuffILike =  ["Rpg", "classical music", "discord"]; 

    return {
  
      "from": {'raw': "COUNTRIES.Brazil", 'not_raw': "Brasil"},
      "likes": {'raw': `${stuffILikeString(stuffILike)}`, "not_raw": "stuffILike" }  
       
    }
  }

