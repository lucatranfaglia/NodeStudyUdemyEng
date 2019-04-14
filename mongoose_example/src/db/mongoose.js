const mongoose = require('mongoose');

pathDb = 'mongodb://127.0.0.1:32770/';
nameDb = 'task-manager-api';

mongoose.connect('mongodb://127.0.0.1:32770/task-manager-api' , {
    useNewUrlParser: true,
    useCreateIndex: true
});

// const utente = new User({
//     name: 'Gandalf   ',
//     email: 'gandalf.ilbianco@wizard.com',
//     age: 100                            // se inserisco il eta: '100' => di default inseri age: 0
// })

// utente.save()
// .then((result)=>{
//     console.log("Save: ",result);
// })
// .catch((error)=>{
//     console.log("Error: ", error);
// })