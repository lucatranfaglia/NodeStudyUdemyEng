// console.log('Starting app.js')
/*----------- MODULI INTERNI ------------------*/
const fs = require('fs');
const os = require('os');

/*----------- MODULI INSTALLATI ---------------*/
// prima va a vedere se esiste nel modulo principale di node, successivamente (se non lo trova) cerca il modulo nella cartella 'node_modules'
const _ = require('lodash');
//
const yargs = require('yargs');

/*----------- FILE NEL PROGETTO ---------------*/
const notes = require('./notes');

/* ------------ LESSONS 1 (a) ---------------------- */
// var user = os.userInfo();
// fs.appendFile('greetings.txt', `Hello ${user.username}. You are ${notes.age}!`, function(err){
//     if(err){
//         console.log('Unable to write to file.');
//     }
// });

// OPTION TWO
// fs.appendFileSync('greetings.txt', 'Hello World');

/* ------------ LESSONS 1 (b) ---------------------- */
// let res = notes.addNote();
// console.log("app: ", res);

// let sum = notes.add(1 , 9)
// console.log("Sum: ", sum);

/* ------------ LESSONS 2 (a) ---------------------- */

// // function isString(string) => restituisce un boolean (true se il paramentro passato è una Stringa, false altrimenti)
// const noString = _.isString(true);
// console.log("ex1: ",noString);

// const string = _.isString("Luca");
// console.log("ex2: ",string);

// // function uniq(array) => restituisce l'array passato a paramentro senza duplicati
// array = ["Luca", "luca", "tranfaglia", "tranfaglia", 1 , 1, 12, 13, notes.add(6,8), 15];
// const unique = _.uniq(array);
// console.log("unique: ", unique);

/* ------------ LESSONS 2 (b-c) - INPUT FROM USER + YARGS ---------------------- */

/*-----------------------------------------------------*/
// VERSIONE YARGS 4.7.1
// if(command === 'add'){
//     let note = notes.addNote(argv.title, argv.body);
//     // se "note" è diverso da 0, è stato aggiunto una nuova nota
//     if(note!==0){
//         console.log(`The note ${note.title} has been insereted correct into file`);
//         notes.logNotes(note);
//     }
//     // se "note" è uguale a 0, abbiamo un duplicato
//     else{
//         console.log("The note '"+argv.title+"' has already been inserted into file");
//     }
// }
// else if(command === 'list'){
//     let list = notes.getAll();
//     console.log("The list is: ",list);
// }
// else if(command === 'read'){  
//     let readNote = notes.getNote(argv.title);
//     // readNote ritorna TRUE o UNDEFINED    
//     if(readNote){
//         console.log(`I read the following note: ${readNote.title}`);
//         notes.logNotes(readNote);
//     }
//     else{
//         console.log("I didn't found the following note: ", argv.title);       
//     }
// }
// else if(command === 'remove'){
//     let noteRemoved = notes.removeNote(argv.title);
//     // Se noteRemoved ritorna TRUE se non ho trovato il titolo della nota nel file JSON, e l'inserisco nel file 
//     // Se noteRemoved ritorna FALSE se ho trovato il titolo della nota nel file JSON e la rimuovo
//     let message = noteRemoved ? `The note ${argv.title} was removed` : `The note ${argv.title} doesn't found but it was insert into note`;
//     console.log(message);
// }
// else{
//     console.log('Command not recognize');
// }
/*-----------------------------------------------------*/
/*-----------------------------------------------------*/
// VERSIONE YARGS 12.0.2
yargs.version('1.1.0');
yargs.command({
    command: 'add',
    describe : 'Add a new note',        // descrive esattamente ciò che il comando dovrebbe fare
    //builder è un oggetto con tutte le proprietà del comando 'add'
    builder:{
        title:{
            describe: 'Note title',
            demandOption: true,      // inserendo true questa opzione sarà richiesta obbligatoriamente all'utente
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,      
            type: 'string'
        }
    },
    //funzione che viene richiamata ogniqualvolta viene eseguito il comando 'add' da linea di comando
    handler: function(argv){
        let note = notes.addNote(argv.title, argv.body);
        // se "note" è diverso da 0, è stato aggiunto una nuova nota
        if(note!==0){
            console.log(`The note ${note.title} has been insereted correct into file`);
            notes.logNotes(note);
        }
        // se "note" è uguale a 0, abbiamo un duplicato
        else{
            console.log("The note '"+argv.title+"' has already been inserted into file");
        }
    }
});


yargs.command({
    command: 'remove',
    describe : 'Remove a note',
    builder:{
        title:{
            describe: 'Note title',
            demandOption: true,      // inserendo true questa opzione sarà richiesta obbligatoriamente all'utente
            type: 'string'
        }
    },
    handler: function(argv){
        let noteRemoved = notes.removeNote(argv.title);
        // Se noteRemoved ritorna TRUE se non ho trovato il titolo della nota nel file JSON, e l'inserisco nel file 
        // Se noteRemoved ritorna FALSE se ho trovato il titolo della nota nel file JSON e la rimuovo
        let message = noteRemoved ? `The note ${argv.title} was removed` : `The note ${argv.title} doesn't found but it was insert into note`;
        console.log(message);
    }
});

yargs.command({
    command: 'read',
    describe : 'Read a specific note',
    builder:{
        title:{
            describe: 'Note title',
            demandOption: true,      // inserendo true questa opzione sarà richiesta obbligatoriamente all'utente
            type: 'string'
        }
    },
    handler: function(argv){
        let readNote = notes.readNotes(argv.title);
        
        // readNote ritorna TRUE o UNDEFINED    
        if(readNote){
            console.log(`I read the following note: ${readNote.title}`);
            notes.logNotes(readNote);
        }
        else{
            console.log("I didn't found the following note: ", argv.title);       
        }
    }
}) 

yargs.command({
    command: 'list',
    describe : 'List all the notes',
    handler: function(){
        let list = notes.listNotes();
        console.log("The list is: ", list);
    }
}) 

// yargs.argv è dove libreria di args memorizza la sua versione degli argomenti con cui è stata eseguita
// const argv = yargs.argv;
// let command = argv._[0];

// RESTITUISCE LO STESSO COMANDO : nel primo uso process, nel secondo yargs
// let command = process.argv[2]; === let command = argv._[0];
// console.log("Command: ", command);          // visualizza il terzo paramentro della linea di comando
// console.log("Process: ", process.argv);     // visualizza l'intero array nella linea di comando con process

// console.log("Yargs: ", argv);               // visualizza l'intero array nella linea di comando con yargs
