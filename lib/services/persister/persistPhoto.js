const { MongoClient } =require('mongodb');

const persistPhoto = (connectionString) => (filename,type,size, userid, category)=>
    MongoClient
    .connect(connectionString)
    .then((db)=> {
        const collection = db.collection('posts');
        

        const document = {

            userid,
            uploadedAt:new Date().toISOString(),
            photo: {
                filename,
                type,
                size,
            },
            hashtagList:[],
            category:category
        };

        return collection
        .insertOne(document)
        .then(()=>
            db.close()
        );
    });

    module.exports.persistPhoto = persistPhoto;