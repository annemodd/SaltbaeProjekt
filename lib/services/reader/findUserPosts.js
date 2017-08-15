const { MongoClient } = require('mongodb');

const findUserPosts = (connectionString) => async(loggedUserID) =>{
    const db = await MongoClient.connect(connectionString);
    
    const collection = db.collection('posts');

    return await collection
        .find( {userid: {$in:[loggedUserID] }})
        .sort({uploadedAt: -1})
        .toArray();
};
module.exports.findUserPosts = findUserPosts;