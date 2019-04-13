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
    db.collection('users').insertOne({
        name: 'Luke',
        lastname : 'Skywalker',
        age: 22
    }, (error, result)=>{
        if(error){
            return console.log('Unable to insert user');
        }
        // ops è una matrice di documenti
        console.log(result.ops);
    })
})