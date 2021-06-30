const {
    insertOneUser,
    insertManyUser,
    findOneDate,
    findManyUserByName,
    findManyArrayUserByName,
    findManyArrayUserByNameArrow,
    findManyArrayUserByNamePromise
} = require('./function');
const { MongoClient, ObjectId } = require('mongodb');


const connectionURL = "mongodb://127.0.0.1:27017/"
const databaseName = "task-manager";
const id = ObjectId();
console.log("ObjectID: ", id);
console.log("ObjectID: ", id.getTimestamp())

try {
    console.log("Connessione avvennuta con successo!");
    MongoClient.connect(connectionURL, { useUnifiedTopology: true }, async(error, client) => {
        if (error) {
            return console.log("Unable to connect to database!", error);
        }

        const db = client.db(databaseName);

        // await insertOneUser(db);
        // await insertManyUser(db);

        const { _id } = await findOneDate(db);
        const userCreate = ObjectId(_id).getTimestamp();
        console.log("findOneDate: ", userCreate);

        // // ritorna un array di oggetti, con tutte le informaizoni del db con i risultati della query
        // const findManyUser = await findManyUserByName(db, "Pluto");
        // console.log("findManyUserByName: ", findManyUser);

        // ritorno un array di oggetti, con solo i risultati della query
        const findManyArrayUser = await findManyArrayUserByName(db, "Pluto");
        console.log("findManyArrayUserByName: ", findManyArrayUser);


        // ritorno un array di oggetti, con solo i risultati della query
        const findManyArrayUserArrow = await findManyArrayUserByNameArrow(db, "Pluto");

        const findPromise = findManyArrayUserByNamePromise(db, 'Pluto');
        findPromise
            .then((result) => {
                console.log("queryPromise result: ", result);
            })
            .catch((error) => {
                console.log("queryPromise error: ", error);
            })
        console.log("findManyArrayUserArrow: ", findManyArrayUserArrow);
    });
} catch (e) {
    // perform actions on the collection object
    console.log("Connessione persa!", e);
}