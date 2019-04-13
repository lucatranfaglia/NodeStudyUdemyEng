const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb://127.0.0.1:32769';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) =>{
    if(error){
        return console.log('Unable to connect to database!');
    }
    console.log('Connect correct');

    const db = client.db(databaseName);
    
    // all'interno del database 'task-manager' creo una nuova collezione (task) e ci inserisco molti documenti
    db.collection('task').insertMany([
        {
            description: 'Parse CSV',
            completed: true
        },
        {
            description: 'Arrow function',
            completed: false
        },
        {
            description: 'Mongo DB',
            completed: true
        },
        {
            description: 'Mongoose',
            completed: false
        },
    ], (error, result)=>{
        if(error){
            return console.log('Unable to insert tasks!')
        }
        console.log("Connect");
        console.log(result.ops);
    })
})