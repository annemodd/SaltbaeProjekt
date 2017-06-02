const { findAllPosts } = require('./findAllPosts');

const CONNECTION_STRING = "mongodb://localhost:27017/Saltbae";

module.exports.findAllPosts = findAllPosts(CONNECTION_STRING);