
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
    // findOne : restitruisce il primo risultato che soddisfa la condizione
    // primo parametro è un oggetto (con la condizione) il secondo parametro è una funzione
    db.collection('task').findOne({completed:true}, (error, result)=>{
        if(error){
            console.log('Unable Error!');
        }
        console.log("Result finOne: ",result);
    })

    // cercare un task tramite ID - ObjectId("5cb1d64f665d2c548eb9fab1")
    // return null
    db.collection('task').findOne({_id: '5cb1d64f665d2c548eb9fab1'}, (error, result)=>{
        if(error){
            console.log('Unable Error!');
        }
        console.log("Result findOne ID null: ",result);
    })
    
    // result Result:  { _id: 5cb1d64f665d2c548eb9fab1, description: 'Mongoose', completed: false }
    db.collection('task').findOne({_id: new ObjectID('5cb1d64f665d2c548eb9fab1')}, (error, result)=>{
        if(error){
            console.log('Unable Error!');
        }
        console.log("Result fonOne ID: ",result);
    })

    // find : restituisce un cursore (dove all'interno non ci sono solo i dati che si richiedono nella condizione)
    // tramite toArray convertiamo il contenuto del cursore in array
    db.collection('task').find({completed:true}).toArray((error, result)=>{
        if(error){
            console.log('Unable Error!');
        }
        console.log("Result find: ",result);
    })
    db.collection('task').find({completed:true}).count((error, result)=>{
        if(error){
            console.log('Unable Error!');
        }
        console.log("Result count: ",result);
    })

})