const isImagetype = (mimetype) =>{
    return(mimetype.indexOf("image/png")!== -1 
        || mimetype.indexOf("image/gif")!== -1
        || mimetype.indexOf("image/jpeg") !== -1);
};
module.exports.isImagetype = isImagetype;