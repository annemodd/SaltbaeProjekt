const { MongoClient } =require('mongodb');

const persistUser = (connectionString) => (username)=>
    MongoClient
    .connect(connectionString)
    .then((db)=> {
        const collection = db.collection('users');

        const document = {
            username,
            userid,
        };

        return collection
        .insertOne(document)
        .then(()=>
            db.close()
        );
    });

    module.exports.persistUser = persistUser;