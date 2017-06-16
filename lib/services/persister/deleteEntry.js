const { MongoClient, ObjectId } =require('mongodb');

const deleteEntry = (connectionString) => async(entryid)=> {
    const db = await MongoClient.connect(connectionString);

    const collection = db.collection('posts');
    await collection.deleteOne({_id : ObjectId(entryid)});

    await db.close();
}
module.exports.deleteEntry = deleteEntry;