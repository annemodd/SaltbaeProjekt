const { MongoClient } =require('mongodb');

const persistText = (connectionString) => async(inputText,userid,category)=>{
    const db = await MongoClient.connect(connectionString);

    const collection = db.collection('posts');

    //filter length
    
    const document = {
            userid,
            uploadedAt:new Date().toISOString(),
            textentry:{
                text: inputText,
            },
            hashtagList:[],
            category
    };
    await collection.insertOne(document);
    await db.close();
}
module.exports.persistText = persistText;

