const { MongoClient } =require('mongodb');

const persistPhoto = (connectionString) => (filename,type,size)=>
    MongoClient
    .connect(connectionString)
    .then((db)=> {
        const collection = db.collection('posts');

        const document = {
            photo: {
                filename,
                type,
                size,
                uploadedAt:new Date().toISOString(),
            }
        };

        return collection
        .insertOne(document)
        .then(()=>
            db.close()
        );
    });

    module.exports.persistPhoto = persistPhoto;