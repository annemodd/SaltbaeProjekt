const isValidHashtag = (hashtag) =>{
    return(hashtag.match(/[^A-Za-z]/) === null 
        && hashtag.length >= 2
        && hashtag.length <= 50);
};
module.exports.isValidHashtag = isValidHashtag;