const { MongoClient } =require('mongodb');
var Binary = require('mongodb').Binary;


const persistPhoto = (connectionString) => async(photo, filename,type,size, userid, category)=>{
    const db = await MongoClient.connect(connectionString);

    const collection = db.collection('posts');

    var photoBinary = {};
    photoBinary.bin = Binary(photo);

        const document = {
            userid,
            uploadedAt:new Date().toISOString(),
            photo: {
                filename,
                type,
                size,
            },
            hashtagList:[],
            category,
            photoBinary
        };

        await collection.insertOne(document);
        await db.close()
};
module.exports.persistPhoto = persistPhoto;