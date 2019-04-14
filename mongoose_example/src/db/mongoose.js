const mongoose = require('mongoose');
const validator = require('validator');

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
        type: String,
        require: true,
        trim : true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validator(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid');
            }
        }
    },
    password:{
        tyoe:String,
        required: true,
        minlenght: 7,
        trim: true,
        validator(value){
            if(value.toLowercase().includes("password")){
                throw new Error('Password cannot contain "password"');
            }
        }
    },
    age:{
        type: Number,
        default: 0,
        // funzione che mi permette di personalizzare (tramite condizione) il valore da ottenere (es. non voglio numeri negativi)
        validate(value){
            if(value<0){
                throw new Error('Age must be a positive number');
            }
        }
    }

})

const utente = new User({
    name: 'Gandalf   ',
    email: 'gandalf.ilbianco@wizard.com',
    age: 100                            // se inserisco il eta: '100' => di default inseri age: 0
})

utente.save()
.then((result)=>{
    console.log("Save: ",result);
})
.catch((error)=>{
    console.log("Error: ", error);
})