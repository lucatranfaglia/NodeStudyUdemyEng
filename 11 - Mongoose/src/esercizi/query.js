async function insertOneUser(db) {

    return db.collection('users').insertOne({
        name: 'Qui',
        age: 22
    }, (error, result) => {

        if (error) throw ("Unable to insert user", error);

        // result array di oggetti
        // result.ops un oggetto dell'array
        console.log("Success: ", result.ops);
        return result.ops;
    })
}

async function insertManyUser(db) {

    return db.collection('users').insertMany([{
            name: 'Paperino',
            age: 25
        },
        {
            name: 'Paperina',
            age: 29
        }
    ], (error, result) => {

        if (error) throw ("Unable to insert user", error);

        // result array di oggetti -> Array<object>
        // result.ops oggetti dell'array -> Array<object>
        console.log("Success: ", result.ops);
        return result.ops;
    })
}

// return object
async function findOneDate(db) {
    console.log("function findOneDate");
    return db.collection('users').findOne({ name: "Pluto" });
}

// return array<object>
async function findManyUserByName(db, name) {
    return db.collection('users').find({ name });
}

// return results collection typeof array<object> 
async function findManyArrayUserByName(db, name) {
    return db.collection('users').find({ name }).toArray();
}

// return results collection typeof array<object> 
async function findManyArrayUserByNameArrow(db, name) {
    return db.collection('users').find({ name }).toArray((error, result) => {
        if (error) throw ("Unable to find user", error);
        console.log("Arrow: ", result);
        return result;
    });
}

function findManyArrayUserByNamePromise(db, name) {
    return db.collection('users').find({ name }).toArray();
}


module.exports = {
    insertOneUser,
    insertManyUser,
    findOneDate,
    findManyUserByName,
    findManyArrayUserByName,
    findManyArrayUserByNameArrow,
    findManyArrayUserByNamePromise
}