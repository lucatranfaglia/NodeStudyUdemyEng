const mongoose = require('mongoose');
const validator = require('validator');


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
        type :String,
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


module.exports = User;