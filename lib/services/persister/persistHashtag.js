const { MongoClient, ObjectId } =require('mongodb');

const persistHashtag = (connectionString) => (postid, hashtag)=>
    MongoClient
    .connect(connectionString)
    .then((db)=> {

        const collection = db.collection('posts');
        
        return collection
        .update(
        { _id : ObjectId(postid)},
        { $addToSet: { 
             hashtagList :"#"+hashtag
        }}
        )
    });

    module.exports.persistHashtag = persistHashtag;