const { findAllPosts } = require('./findAllPosts');
const { findUserPosts } = require('./findUserPosts');
const { findCategory } = require('./findCategory');
const CONNECTION_STRING = "mongodb://localhost:27017/Saltbae";
//const CONNECTION_STRING = "mongodb://192.168.99.100:32768/Saltbae";

module.exports.findAllPosts = findAllPosts(CONNECTION_STRING);
module.exports.findUserPosts = findUserPosts(CONNECTION_STRING);
module.exports.findCategory = findCategory(CONNECTION_STRING);


