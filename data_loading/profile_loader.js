

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

    const stuffILike =  ["Rpg", "automation", "classical music", "discord"];
    let stuffILikeText = getStuffILikeText(stuffILike);

    return {
  
      "from": {'raw': "COUNTRIES.Brazil", 'not_raw': "Brasil"},
      "likes": {'raw': `${stuffILikeString(stuffILike)}`, "not_raw": stuffILikeText }  
       
    }
  }

