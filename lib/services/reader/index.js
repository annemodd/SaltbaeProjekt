const dbpassword=process.env.SECRET;

const { findAllPosts } = require('./findAllPosts');
const { findUserPosts } = require('./findUserPosts');
const { findCategory } = require('./findCategory');
const CONNECTION_STRING = `mongodb://admin:${dbpassword}@ds145303.mlab.com:45303/saltbae`;

module.exports.findAllPosts = findAllPosts(CONNECTION_STRING);
module.exports.findUserPosts = findUserPosts(CONNECTION_STRING);
module.exports.findCategory = findCategory(CONNECTION_STRING);


