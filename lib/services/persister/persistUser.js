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
    console.log('Count: '+  counter);

    if (counter == 0) {
            const document = {
                loginAt:new Date().toISOString(),
                username,
                userid : loggedID,
            };
            await collection.insertOne(document);
    }else{
        const userexists = await collection.find( {userid: {$in:[loggedID] }}).toArray();
        console.log('Existing users; '+userexists);
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


 /*   if( counter > 0) {
        const userexists = await collection.find( {userid: {$in:[loggedID] }}).toArray();
        console.log(userexists);
    }ifelse(counter == 0){
        writeUser();
    }ifelse()
    if( counter !== 0 && userexists.length == 0){
        
    

    

    if(userexists.length == 0) {
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
        }else {
            console.log('User already exists.');
            //maybe add new login Date?
        } 
        }    */

}
    module.exports.persistUser = persistUser;