const { findAllPhotos } = require('./findAllPhotos');
const { findUserPosts } = require('./findUserPosts');

const CONNECTION_STRING = "mongodb://localhost:27017/Saltbae";

module.exports.findAllPhotos = findAllPhotos(CONNECTION_STRING);
module.exports.findUserPosts = findUserPosts(CONNECTION_STRING);


