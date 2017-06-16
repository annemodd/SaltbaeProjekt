const { MongoClient } =require('mongodb');

const deleteEntry = (connectionString) => async(entryid)=> {
    const db = await MongoClient.connect(connectionString);

    const collection = db.collection('posts');

        collection
        .findOneAndDelete({id: entryid})
        .deleteOne()
        .then(()=>
            db.close()
        );
}

    module.exports.deleteEntry = deleteEntry;