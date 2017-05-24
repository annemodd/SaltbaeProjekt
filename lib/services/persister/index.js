const { MongoClient } =require('mongodb');

const CONNECTION_STRING = "mongodb://localhost:27017/Saltbae";

const persistPhoto=(filename,type,size)=>
    MongoClient
    .connect(CONNECTION_STRING)
    .then((db)=> {
        const collection = db.collection('posts');

        const document = {
            filename,
            type,
            size,
            uploadedAt:new Date().toISOString(),
        };

        return collection
        .insertOne(document)
        .then(()=>
            db.close()
        );
    });

    module.exports.persistPhoto=persistPhoto;