const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a postive number')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})


// CREO UN METODO (con nome findByCredentials) che viena aggiunto al modello User
userSchema.methods.generateAuthToken = async function() {
    // Ottengo le info dello user
    // user è un object
    // user._id è un intero
    const user = this;

    // Genero il token dell'utente
    const token = jwt.sign({ _id: user._id.toString() }, 'testoacaso')

    // salvo il token dell'utente nel db
    user.tokens = user.tokens.concat({ token });
    user.save();
    return token;
}


// CREO un Middlewere (con nome findByCredentials) che viena aggiunto al modello User
// 1. verifico l'esistenza della email nel db
// 2. verifica che la password, inserita dall'utente, sia uguale a quella salvata nel db
userSchema.statics.findByCredentials = async(email, password) => {
    // 1. step
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('Unable to login')
    }

    // 2. step
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

// MIDDLEWARE
// Hash the plain text password before saving
// Converte la password in hash, prima di salvarla nel db
userSchema.pre('save', async function(next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User