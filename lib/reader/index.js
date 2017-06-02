const { findAllPhotos } = require('./findAllPhotos');

const CONNECTION_STRING = "mongodb://localhost:27017/Saltbae";

module.exports.findAllPhotos = findAllPhotos(CONNECTION_STRING);