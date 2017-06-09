const { findAllPosts } = require('./findAllPosts');
const { findUserPosts } = require('./findUserPosts');

const CONNECTION_STRING = "mongodb://localhost:27017/Saltbae";

module.exports.findAllPosts = findAllPosts(CONNECTION_STRING);
module.exports.findUserPosts = findUserPosts(CONNECTION_STRING);


