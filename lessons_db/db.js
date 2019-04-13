
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
    
    // ---------------------
    // METODO con callback 
    // ---------------------

    //updateOne(filter, update, options)
    // updateOne - modificato il primo risultato che soddisfa la condizione (ObjectId) 
    // db.collection('task').updateOne({
    //     _id : new ObjectID("5cb1d64f665d2c548eb9fab0")
    // },{
    //     $set: {
    //         completed : false
    //     }
    // }, (error, result)=>{
    //     if(error){
    //         console.log("Error: ",error);
    //     }
    //     console.log("Success: ", result);
    // })


    // ---------------------
    // METODO con Promises 
    // ---------------------
    // Primo step
    // const updatePromises = db.collection('task').updateOne({
    //     _id : new ObjectID("5cb1d64f665d2c548eb9fab0")
    // },{
    //      // UPDATE operators   
    //
    //      // setta il valore inserito nel campo selezionato
    //     $set: {
    //         completed : true
    //     }
    //  // incrementa il valore
    //  // $inc: {
    //  //     age: 1  //age: -1
    //  // }
    // });
    
    // updatePromises
    // .then( (result)=>{
    //     console.log("Update: ", result );
    // })
    // .catch((error)=>{
    //     console.log("Error: ", error);
    // })

    // Secondo step
    const updatePromises = db.collection('task').updateOne({
        _id : new ObjectID("5cb1d64f665d2c548eb9fab0")
    },{
        $set: {
            completed : false
        }
    })
    .then( (result)=>{
        console.log("Update: ", result );
    })
    .catch((error)=>{
        console.log("Error: ", error);
    })


    const updateManyPromises = db.collection('task').updateMany({
        completed : false
    },{
        $set: {
            completed : true
        }
    })
    .then( (result)=>{
        console.log("Update: ", result.modifiedCount );
    })
    .catch((error)=>{
        console.log("Error: ", error);
    })
    
})