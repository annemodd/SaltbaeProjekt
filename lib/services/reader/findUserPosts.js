const { MongoClient } = require('mongodb');

const findUserPosts = (connectionString) => (loggedUserID) =>
    MongoClient
        .connect(connectionString)
        .then((db) => {
            const collection = db.collection('posts');

            return collection
                .find( {userid: {$in:[loggedUserID] }})
                .sort({uploadedAt: -1})
                .toArray();
        });

module.exports.findUserPosts = findUserPosts;