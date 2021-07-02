require('./db/mongoose');
const express = require('express');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT || 3000

const morgan = require('morgan');
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded());

app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})



// --------------------------------------------------
// ------------- MIDDLEWARE -------------------------
// --------------------------------------------------
// Without middleware: new request -> run route handler
// With middleware: new request -> do something -> run route handler



// --------------------------------------------------
// --------------------------------------------------
// --------------------------------------------------
const jwt = require('jsonwebtoken');

const myFunction = async() => {
    // lo scopo di jwt non è nascondere i dati (tramite il token alcune informazioni sono reperibili a tutti),
    // ma renderli inutilizzabili a chiunque non sappia la codifica (ovvero il contenuto della stringa)
    // infatti la terza parte del token 

    // sign ( <object>, string, <object> )
    // 1. parameter: identificativo univico
    // 2. parameter: contenuto random
    // 3. parameter: tempo per far scadere il token
    const token = jwt.sign({ _id: 'asdqwe' }, 'testoacaso', { expiresIn: '1 day' });

    // return string (codifica Base64)
    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJhZCIsImlhdCI6MTYyNDk2MjI1MH0.M6ckc_7Zoh9-CFmv6P7aH06QcYDXeCGd4vbVu4w6dBM
    // 1. eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9 -> header/intestazione: meta con l'informazioni su che tipo di token sia (jwt, algoritmo usato)
    // 2. eyJfaWQiOiJhZCIsImlhdCI6MTYyNDk2MjI1MH0 -> body: dati che forniamo noi (nell'esempio è _id) -> {"_id":"asdqwe","iat":1624962834} -> iat epoch time
    // 3. M6ckc_7Zoh9-CFmv6P7aH06QcYDXeCGd4vbVu4w6dBM -> verifica del token

    try {
        const verifica = jwt.verify(token, 'testoacaso');

    } catch (error) {
        console.log("Token error: token errato o scaduto", error);
    }

    console.log("Token: ", token);
    console.log("Token verifica: ", verifica);
}