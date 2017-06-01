const { MongoClient } =require('mongodb');

const persistText = (connectionString) => (text)=>
    MongoClient
    .connect(connectionString)
    .then((db)=> {
        const collection = db.collection('posts');

        const document = {
            text,
        };

        return collection
        .insertOne(document)
        .then(()=>
            db.close()
        );
    });

    module.exports.persistText = persistText;