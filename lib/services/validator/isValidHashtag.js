const isValidHashtag = (hashtag) =>{
    console.log(hashtag);
    console.log(hashtag.match(/[^A-Za-z]/) === null );
    console.log(hashtag.length >= 2);
    console.log(hashtag.length <= 50);
    return(hashtag.match(/[^A-Za-z]/) === null 
        && hashtag.length >= 2
        && hashtag.length <= 50);
};
module.exports.isValidHashtag = isValidHashtag;