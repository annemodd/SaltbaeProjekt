const { MongoClient } = require('mongodb');

const CONNECTION_STRING = 'mongodb://localhost:27017/saltbae';

const findUserPosts = () =>
    MongoClient
        .connect(CONNECTION_STRING)
        .then((db) => {
            const collection = db.collection('posts');

            return collection
                .find()
                .filter((userid) => {
                    return userid === "0";
                })
                .sort({uploadedAt: -1})
                .toArray();
        });

module.exports.findUserPosts = findUserPosts;