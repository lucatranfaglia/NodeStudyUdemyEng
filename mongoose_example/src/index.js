const express = require('express');
// il file viene eseguito in modo che Mongoose si colleghi al database
require('./db/mongoose');
// richiamo i modelli 
const User = require('./models/user');



const app = express();
const port = process.env.PORT || 3002;

app.use(express.json())


// POST /users => create user
app.post('/users', (req, res)=>{
    // creo una nuova istanza User
    const user = new User(req.body);

    user.save()
    .then((user)=>{
        // POST 201 || GET 200
        res.status(200).send(user);
    })
    .catch((error)=>{
        res.send("Error: ", error);
    })
    res.send('Connect POST /users');
})

// GET /users => find users all (senza condizione), find user one (se inserisco la condizione)
app.get('/users', (req, res)=>{
    
    User.find({})
    .then((users)=>{
        // POST 201 || GET 200
        console.log("GET", users);
        res.status(200).send(users)
    })
    .catch((error)=>{
        res.status(500).send();
    })
    res.send('Connect!', );
})

app.get('/users/:name', (req, res)=>{
    const nameUser = req.params.name;
    
    // User.find({name: nameUser})
    User.findOne({name: nameUser})
    .then((user)=>{
        // POST 201 || GET 200
        console.log("User: ",user);
        res.status(200).send(user);
    })
    .catch((error)=>{
        res.status(500).send();
    })
    res.send('Connect!');
})
// Mongoose converte automaticamente la stringa dell'ID in ObjectID
app.get('/users/:id', (req, res)=>{
    const id = req.params.id;    

    // User.find({_id: id})
    // User.findOne({_id: id})
    User.findById({_id: id})
    .then((user)=>{
        if(!user){
            return res.status(404).send();
        }

        // POST 201 || GET 200
        res.status(200).send(user);
    })
    .catch((error)=>{
        res.status(500).send();
    })
    res.send('Connect!');
})

app.listen(port, ()=>{
    console.log('Server is up on port: ', port);
}) 