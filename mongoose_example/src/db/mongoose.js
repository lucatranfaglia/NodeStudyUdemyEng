const mongoose = require('mongoose');

pathDb = 'mongodb://127.0.0.1:32769/';
nameDb = 'task-manager-api';

mongoose.connect(pathDb+nameDb , {
    useNewUrlParser: true,
    useCreateIndex: true
});


// primo parametro : nome della stringa per il modello
// secondo parametro : definizione dei campo
const User = mongoose.model('User',{
    name:{
        type: String
    },
    age:{
        type: Number
    }

})

// creo un istanza con modello User
const utente = new User({
    name: 'Bilbo',
    age: 110
});

// per salvare l'istanza sul DB uso la funzione save()
utente.save()
.then((result)=>{
    console.log("Save: ", result);
})
.catch((error)=>{
    console.log("Error: ",error);
})