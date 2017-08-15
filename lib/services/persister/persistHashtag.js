const { MongoClient, ObjectId } =require('mongodb');

const persistHashtag = (connectionString) => async(postid, hashtag)=>{
    const db = await MongoClient.connect(connectionString);

    const collection = db.collection('posts');
        
    //filter hashtagstring

    await collection.update(
        { _id : ObjectId(postid)},
        { $addToSet: { hashtagList :"#"+hashtag}}
    );
};
module.exports.persistHashtag = persistHashtag;