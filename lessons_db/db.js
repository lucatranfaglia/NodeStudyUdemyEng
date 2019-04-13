
const { MongoClient , ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:32769';
const databaseName = 'task-manager';

const id = new ObjectID();
// Mongo genera un ID univoco con all'itreno alcune informazioni (tra cui un TIMESTAMP) [es. 5cb1d944edddce552cf0b430]
console.log(id);
// ottengo il timestamp di quando è stato creato l'ID
console.log(id.getTimestamp());

// numero di byte dell'ID [12byte]
console.log(id.id.length);
// numbero di byte se converto l'ID in STRING [24]
console.log(id.toHexString().length);
