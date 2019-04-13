// // Obiettivo - inviare un oggetto ad un server come una stringa
// let obj = {
//     name: 'Luca'
// }

// // l'oggetto obj diventa un stringa
// let strinObj = JSON.stringify(obj);

// // typeof ritorna una stringa con il tipo di dato del paramentro inserito
// console.log(typeof strinObj);
// // ritorna la stringa
// console.log(strinObj);

// // Obiettivo - da una stringa ottenere un oggetto
// let personString = '{"name": "Luca", "age": 25}';
// let person = JSON.parse(personString);

// console.log(typeof person);
// console.log(person);

const fs = require('fs');

let originalNote ={
    title : 'Some title',
    body: 'Some body'
};
let originalNoteString = JSON.stringify(originalNote);

// writeFileSync : scrive il dato su file, sostituendo il file se già esistente. Il dato può essere una stringa o un buffer.
fs.writeFileSync('notes.json', originalNoteString);

let noteString = fs.readFileSync('notes.json');

let note = JSON.parse(noteString);

//notes
console.log("Typeof: ", typeof note);
console.log("Info book :",note.title, note.body);