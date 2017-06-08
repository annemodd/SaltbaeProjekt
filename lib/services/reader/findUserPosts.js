const { MongoClient } = require('mongodb');

const findUserPosts = (connectionString) => () =>
    MongoClient
        .connect(connectionString)
        .then((db) => {
            const users = db.collection('users');
             
            loggedUser = users
                .find({userid: "1"})
                .toArray();

            const collection = db.collection('posts');

            return collection
                .find( {userid: {$in:[loggedUser.userid] }})
                .sort({uploadedAt: -1})
                .toArray();
        });

module.exports.findUserPosts = findUserPosts;