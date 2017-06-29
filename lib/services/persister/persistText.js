const { MongoClient } =require('mongodb');

const persistText = (connectionString) => (inputText,userid)=>
    MongoClient
    .connect(connectionString)
    .then((db)=> {
        const collection = db.collection('posts');

        const document = {
            userid,
            uploadedAt:new Date().toISOString(),
            textentry:{
                text: inputText,
            },
            hashtagList:[]
        };

        return collection
        .insertOne(document)
        .then(()=>
            db.close()
        );
    });

    module.exports.persistText = persistText;