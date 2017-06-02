const { persistUser } = require('./persistUser');
const { persistPhoto } = require('./persistPhoto');
const { persistText } = require('./persistText');

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 27017;
const DB_NAME = process.env.DB_NAME || 'saltbae';

const CONNECTION_STRING = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

module.exports.persistUser = persistUser(CONNECTION_STRING);
module.exports.persistPhoto = persistPhoto(CONNECTION_STRING);
module.exports.persistText = persistText(CONNECTION_STRING);