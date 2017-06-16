const { MongoClient } =require('mongodb');

const deleteEntry = (connectionString) => (entryid)=>
    MongoClient
    .connect(connectionString)
    .then((db)=> {
        const collection = db.collection('posts');

        return collection
        .findOneAndDelete({_id: entryid})
        .then(()=>
            db.close()
        );
    });

    module.exports.deleteEntry = deleteEntry;