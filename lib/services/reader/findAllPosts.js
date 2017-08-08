const { MongoClient } = require('mongodb');

const findAllPosts = (connectionString) => async() =>{
    const db = await MongoClient.connect(connectionString);
    
    const collection = db.collection('posts');

    return await collection
        .find()
        .sort({uploadedAt: -1})
        .toArray();
};
module.exports.findAllPosts = findAllPosts;