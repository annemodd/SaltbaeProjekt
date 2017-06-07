const { MongoClient } =require('mongodb');

const persistText = (connectionString) => (inputText)=>
    MongoClient
    .connect(connectionString)
    .then((db)=> {
        const collection = db.collection('posts');

        const document = {
                uploadedAt:new Date().toISOString(),
                inputText
        };

        return collection
        .insertOne(document)
        .then(()=>
            db.close()
        );
    });

    module.exports.persistText = persistText;