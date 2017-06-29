const { MongoClient } =require('mongodb');
const { ObjectId } =require('objectid');

const persistHashtag = (connectionString) => (postid, hashtag)=>
    MongoClient
    .connect(connectionString)
    .then((db)=> {
        const collection = db.collection('posts');
        
        return collection
        .update(
        { _id : postid},
        { $addToSet: { 
             hashtagList : hashtag
        }},
        )
    });

    module.exports.persistHashtag = persistHashtag;