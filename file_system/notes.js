// console.log('Starting notes.js');

// console.log(module);
const fs = require('fs');
const chalk = require('chalk');
/* ------------ LESSONS 2 (a) ---------------------- */
// // l'obiettivo dell'export è poter esportare le funzioni che vengono utilizzate all'interno del file js
// module.exports.addNote = () => {
//     console.log('addNote');
//     return 'New note';
// }

// module.exports.add = (a , b) => {
//     return a+b;
// }

/* ------------ LESSONS 2 (b-c) - INPUT FROM USER + YARGS ---------------------- */

// let addNote = (title, body) =>{
//     console.log("Adding note: ", title, body);
// };

// let getAll = () =>{
//     console.log("Getting all notes");
// };

// let getNote = (title) =>{
//     console.log("Reading note: ", title);
// };

// let removeNote = (title) =>{
//     console.log("Removing note: ", title);
// };


/* ------------ LESSONS 3.15 - working with json ---------------------- */

// let addNote = (title, body) =>{
//     // creo una array
//     let notes = [];
//     let note = {
//         title,                  // === title: title    (il primo è l'argomento dell'oggetto il secondo è il parametro che viene passato alla funzione - dato che sono identici il paramentro può essere omesso)
//         body                    // === body: body
//     }
//     try{
//         // Se esiste il file json prelevo tutte le note presenti all'interno del file, così da poterne aggiungere delle altre
//         let notesString = fs.readFileSync('notes-data.json');
//         // Da stringa ad oggetto
//         notes = JSON.parse(notesString);
//         console.log("typeof(notes): ", typeof(notes));
//     }
//     catch(error){
//     }
//     // obiettivo restituire errore in caso ci fossero due titoli uguali
//     // filter crea un nuovo array restituendo TRUE o FALSE - se ritorna TRUE, l'elemento verrà mantenuto nell'array in caso contrario viene rimosso
//     // let duplicateNotes = notes.filter((note)=>{
//     //     return note.title===title;
//     // });
//     let duplicateNotes = notes.filter((note)=>note.title===title);
//     console.log("typeof(duplicateNotes): ", typeof(duplicateNotes));
//     if(duplicateNotes.length ===0){
//         // con PUSH inserisco nell'array notes, gli oggetti note, in coda
//         notes.push(note);
//         let stringNotes = JSON.stringify(notes);
//         fs.writeFileSync('notes-data.json', stringNotes);
//     }else{
//         console.log("The title is already present into the notes");
//     }
// };
// let getAll = () =>{
//     // leggo dal file json ()
//     let stringNotes = fs.readFileSync('notes-data.json');
//     // da stringa ad oggetto
//     let jsonNotes = JSON.parse(stringNotes);
//     console.log("typeof(jsonNotes): ", typeof(jsonNotes));
//     jsonNotes.forEach(note => {
//         console.log("Title: ", note.title);
//     });
// };
// let getNote = (title) =>{
//     // stringa con tutte le note
//     let stringNotes = fs.readFileSync('notes-data.json');
//     // converto la stringa in oggetto
//     let jsonNotes = JSON.parse(stringNotes);
//     console.log("typeof(jsonNotes): ", typeof(jsonNotes));
//     jsonNotes.forEach( note =>{
//         if(note.title === title){
//             console.log("I found the title I was looking for: ", note.title);
//         }
//     })
// };
// let removeNote = (title) =>{
//     console.log("Removing note: ", title);
// };

/* ------------ LESSONS 3.17 - Refactoring per la riusabilità ---------------------- */
// questa funzione verrà richiamata per ritornare tutte le note (come oggetto) se esistono, in caso contrario ritorna una array vuoto
let loadNotes = () =>{
    try{
        const notesString = fs.readFileSync('notes-data.json');
        const dataJSON = notesString.toString();
        return JSON.parse(dataJSON);
    }
    // se fallisce ritorna un array vuoto
    catch(er){
        return [];
    }
}

let saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    // scrive sul file json il valore inserito nel parametro notes 
    fs.writeFileSync('notes-data.json', dataJSON);
}


let readNotes = (title) =>{
    // mostro tutte le note
    const notes = loadNotes();

    const note = notes.find((note)=> {return note.title===title});
    if(note){
        console.log(chalk.green.inverse("I found the title!"));
    }else{
        console.log(chalk.red.inverse("ERROR, Note not found!"));
    }
    return note;
};

//// VERSIONE MENO EFFICIENTE - usando filter
// let addNote = (title, body) => {
//     // leggo nel file JSON. Ritorna array vuoto se non ho il file json. In alternativa, ritorna tutte le note all'interno del file json (come oggetto)
//     const notes = loadNotes();
    
//     console.log("Elencon notes: ",notes);
//     const note = {
//         title : title,
//         body : body
//     };
    
//     // typeof OBJECT
//     const duplicateNotes = notes.filter((note)=> { return note.title===title});
//     // Il metodo find() restituisce il valore del primo elemento nell'array che soddisfi la funzione di test passata come argomento. Altrimenti viene restituito undefined.
//     const duplicateNote = notes.find((note)=> { return note.title===title});

//     // la differenza tra filter e find è che find si ferma appena trova un elemento nell'array che soddisfa la condizione, invece filter scansiona tutto l'array restituendo tutti gli elementi che soddisfano la condizione

//     if(duplicateNotes.length ===0){
//         // con PUSH inserisco nell'array notes, gli oggetti note, in coda
//         notes.push(note);
//         // salvo la nota nel file json
//         saveNotes(notes);
//         return note;
//     }
//     else{
//         return 0;
//     }
// }

// la differenza tra filter e find è che find si ferma appena trova un elemento nell'array che soddisfa la condizione, invece filter scansiona tutto l'array restituendo tutti gli elementi che soddisfano la condizione

// VERSIONE PIU EFFICIENTE - usando find
let addNote = (title, body) => {
    // leggo nel file JSON. Ritorna array vuoto se non ho il file json. In alternativa, ritorna tutte le note all'interno del file json (come oggetto)
    const notes = loadNotes();

    // Il metodo find() restituisce il valore del primo elemento nell'array che soddisfi la funzione di test passata come argomento. Altrimenti viene restituito undefined.
    const duplicateNote = notes.find((note)=> { return note.title===title});

    if(duplicateNote!==undefined){
        // con PUSH inserisco nell'array notes, gli oggetti note, in coda
        notes.push(note);
        // salvo la nota nel file json
        saveNotes(notes);
        return note;
    }
    else{
        return 0;
    }
}

let listNotes = () =>{
    const notes = loadNotes();

    console.log('Your notes');
    notes.forEach(note => {
        logNotes(note);
    });
    return notes;
};


let getNote = (title) =>{
    // mostro tutte le note
    const notes = loadNotes();

    // verifico se all'interno delle mie note esiste un titolo specifico (passato a parametro)
    const filteredNotes = notes.filter(note => {
        return note.title===title;
    });
    // filteredNotes è un array di oggetti (dove ogni oggetto è composta da title e body). Aggiungendoci [0] (=> filteredNotes[0]), ottengo il primo elemento dell'array
    return filteredNotes[0];    
};


let removeNote = (title) =>{
    // ritorno tutte le note all'interno del file JSON
    const notes = loadNotes();
    // cerco se tra tutte le note ci sta quella passato a parametro
    const searchNote = notes.filter((note)=>{
        return note.title!==title;
    });
    
    // se dopo il filtro ho lo stesso numero di elementi vuol dire che non esiste il titolo nel file JSON, di coseguenza lo inserisco nel file json
    if(searchNote.length===notes.length){
        addNote(title, "");
        console.log("Elenco notes: ", loadNotes());
        return false;
    }
    // searchTitle : è un array di oggetti con tutte le note tranne quella inserita da parametro (se esistente nel file json)
    else{
        saveNotes(searchNote);
        console.log("Elenco notes: ", loadNotes());
        return true;
    }
};

let logNotes = (note) => {
     console.log("--");
     console.log(`Title: ${note.title}`);
     console.log(`Body: ${note.body}`);
}

// impostiamo un oggetto uguale al modulo che esporta l'oggetto 
module.exports = {
    getNote: getNote,
    addNote: addNote,
    removeNote:removeNote,
    listNotes: listNotes,
    readNotes: readNotes,
    logNotes: logNotes
}
// Se hai la proprietà il cui nome è identico al nome della variabile è possibile rimuovere il nome della variabile
// ESEMPIO
// module.exports = {
//     addNote,
//     listNotes
// }