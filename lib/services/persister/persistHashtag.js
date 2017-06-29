const { MongoClient, ObjectId } =require('mongodb');

const persistHashtag = (connectionString) => (postid, hashtag)=>
    MongoClient
    .connect(connectionString)
    .then((db)=> {

        const collection = db.collection('posts');
        
        return collection
        .update(
        { _id : ObjectId(postid)},
        //{ _id : ObjectId("5955536736b6a949e0e785f1")},
        { $addToSet: { 
             hashtagList : hashtag
        }}
        )
    });

    module.exports.persistHashtag = persistHashtag;