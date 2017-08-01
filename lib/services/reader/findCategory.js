const { MongoClient } = require('mongodb');

const findCategory = (connectionString) => async(categoryID) =>{
    const db = await MongoClient.connect(connectionString);
    
    const collection = db.collection('posts');

    return await collection
        .find( {category: {$in:[categoryID] }})
        .toArray();
};
module.exports.findCategory = findCategory;