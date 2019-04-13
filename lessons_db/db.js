
const { MongoClient , ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:32769';
const databaseName = 'task-manager';

const id = new ObjectID();


MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) =>{
    if(error){
        return console.log('Unable to connect to database!');
    }
    console.log('Connect correct');

    const db = client.db(databaseName);
    
    // DELETE MANY - PROMISE
    db.collection('users').deleteMany(
        {
            age: 22
        }
    )
    .then((result)=>{
        console.log("DeleteMany:", result.deletedCount);
    })
    .catch((error)=>{
        console.log("Error: ", error);
    })


    // DELETE ONE
    db.collection('task').deleteOne(
        {
            description: 'Mongo DB'
        }
    )
    .then((result)=>{
        console.log("DeleteOne:", result.deletedCount);
    })
    .catch((error)=>{
        console.log("Error: ", error);
    })

})