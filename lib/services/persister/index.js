const { persistUser } = require('./persistUser');
const { persistPhoto } = require('./persistPhoto');
const { persistText } = require('./persistText');
const { persistHashtag } = require('./persistHashtag');
const { deleteEntry } = require('./deleteEntry')

const dbuser=process.env.DATABASE_USER;
const dbpassword=process.env.SECRET;

const CONNECTION_STRING = `mongodb://${dbuser}:${dbpassword}@ds145303.mlab.com:45303/saltbae`;


module.exports.persistUser = persistUser(CONNECTION_STRING);
module.exports.persistPhoto = persistPhoto(CONNECTION_STRING);
module.exports.persistText = persistText(CONNECTION_STRING);
module.exports.persistHashtag = persistHashtag(CONNECTION_STRING);
module.exports.deleteEntry = deleteEntry(CONNECTION_STRING);