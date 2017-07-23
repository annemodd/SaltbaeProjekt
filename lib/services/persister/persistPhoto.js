const { MongoClient } =require('mongodb');

const persistPhoto = (connectionString) => async(filename,type,size, userid, category)=>{
    const db = await MongoClient.connect(connectionString);

    const collection = db.collection('posts');
        
        //filter mimetype image/gif||png||jpeg
        const document = {
            userid,
            uploadedAt:new Date().toISOString(),
            photo: {
                filename,
                type,
                size,
            },
            hashtagList:[],
            category
        };

        await collection.insertOne(document);
        await db.close()
};
module.exports.persistPhoto = persistPhoto;