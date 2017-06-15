const { MongoClient } =require('mongodb');

const persistUser = (connectionString) => (username, loggedID)=>
    MongoClient
    .connect(connectionString)
    .then((db)=> {
        const collection = db.collection('users');

        const userexists = async () => {
            await collection.find( {userid: {$in:[loggedID] }}).toArray();
        }
        console.log(userexists);

        if(userexists.length == 0) {
            const document = {
                loginAt:new Date().toISOString(),
                username,
                userid,
            };
        }else {
            console.log('User already exists.');
            //maybe add new login Date?
        }
        return collection
            .insertOne(document)
            .then(()=>
                db.close()
            );      
    });

    module.exports.persistUser = persistUser;