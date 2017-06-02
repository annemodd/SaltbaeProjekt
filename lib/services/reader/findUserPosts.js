const { MongoClient } = require('mongodb');

const findUserPosts = (connectionString) => () =>
    MongoClient
        .connect(connectionString)
        .then((db) => {
            const collection = db.collection('posts');

            return collection
                .find()
                .sort({uploadedAt: -1})
                .toArray();
        });

module.exports.findUserPosts = findUserPosts;