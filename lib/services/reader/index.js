const { findAllPosts } = require('./findAllPosts');

const CONNECTION_STRING = "mongodb://192.168.99.100:32768/Saltbae";

module.exports.findAllPosts = findAllPosts(CONNECTION_STRING);