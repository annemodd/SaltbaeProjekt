const isValidPostText = (inputText) =>{
    return(inputText.length >= 5 && inputText.length <= 5000);
};
module.exports.isValidPostText = isValidPostText;