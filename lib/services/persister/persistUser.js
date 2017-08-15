const { MongoClient } =require('mongodb');

/**
 * Saves user in the database. First a counter checks,
 * how many users already exist in the database. If the db is empty,
 * the user will be saved in the db. In case there already exist users in the db,
 * it is checked, if the logged in user already exists in the db. 
 * Only if he does not exist, he will be saved in the db,
 * otherwise a new timestamp will be saved.
 */
const persistUser = (connectionString) =>  async(username, loggedID)=>{
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
            //User already exists
            await collection.update(
                {userid: {$in:[loggedID]}},
                {$set:{loginAt:new Date().toISOString()}}
            );
        }
    }
    await db.close();
}
    module.exports.persistUser = persistUser;