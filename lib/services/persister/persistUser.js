const { MongoClient } =require('mongodb');

const writeUser = () => {
            const document = {
                loginAt:new Date().toISOString(),
                username,
                userid,
            };
            return collection
            .insertOne(document)
            .then(()=>
                db.close()
            ); 
}

const persistUser = (connectionString) => async(username, loggedID)=>{
    const db = await MongoClient.connect(connectionString);

    const collection = db.collection('users');

    const counter = await collection.count();

    if (counter == 0) {
            const document = {
                loginAt:new Date().toISOString(),
                username,
                userid : loggedID,
            };
            await collection.insertOne(document);
    }else{
        const userexists = await collection.find( {userid: {$in:[loggedID] }}).toArray();
        if(userexists.length == 0){
            const document = {
                loginAt:new Date().toISOString(),
                username,
                userid : loggedID,
            };
            await collection.insertOne(document);
        }else{
            console.log('User already exists.');
        }
    }
    await db.close();
}
    module.exports.persistUser = persistUser;