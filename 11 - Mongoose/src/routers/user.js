const { auth } = require('../middleware/auth');

const express = require('express')
const User = require('../models/user')
const router = new express.Router()



router.post('/users', async(req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        const token = await user.generateAuthToken();

        res.status(201).send({ user, token });
    } catch (e) {
        res.status(400).send(e);
    }
})

router.post('/users/login', async(req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
            // richiamo il metodo per la generazione del token
        const token = await user.generateAuthToken();

        // con il metodo toJSON non è più necessario richiamare il metodo getPubicProfile
        // const userPrivate = user.getPubicProfile();

        res.send({ user, token })
    } catch (e) {
        console.log("error: ", e);
        res.status(400).send();
    }
})

// Sostituisce l'ultimo token (autentico) con uno vecchio, così da fare il logout
router.post('/users/logout', auth, async(req, res) => {
    try {

        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        })

        await req.user.save();

        res.send();
    } catch (e) {
        console.log("error: ", e);
        res.status(500).send();
    }
})


// Rimuove tutti i token dallo user
router.post('/users/logoutAll', auth, async(req, res) => {
    try {

        req.user.tokens = []

        await req.user.save();

        res.send();
    } catch (e) {
        console.log("error: ", e);
        res.status(500).send();
    }
})

// ----------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------

router.get('/users', async(req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/users/me', auth, async(req, res) => {
    try {
        // tramite il middleware 'auth' viene autenticato l'utente
        // e vengono salvate le sue info in req.user
        console.log("req.user: ", req.user);

        // con il metodo toJSON non è più necessario richiamare il metodo getPubicProfile
        // const userPrivate = req.user.getPubicProfile();

        res.send({ user: req.user });
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/users/:id', async(req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})

// ----------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------
// da evitare perché potrebbe capitare che un utente modifichi per sbaglio un'altro profilo
router.patch('/users/:id', async(req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const user = await User.findById(req.params.id)

        updates.forEach((update) => user[update] = req.body[update])
        await user.save()

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Modifica dello user dal db
// Middleware -> auth (autenticazione tramite token)
router.patch('/update/users/me', auth, async(req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }
    try {
        // Test1
        // const user = await User.findById(req.user._id)
        // console.log("user1: ", user);
        updates.forEach((update) => req.user[update] = req.body[update])

        await req.user.save();
        // Test2
        // const user2 = await User.findById(req.user._id)
        // console.log("user2: ", user2);

        if (!req.user) {
            return res.status(404).send()
        }

        res.send(req.user)
    } catch (e) {
        console.log("error: ", e);
        res.status(400).send();
    }
})

// ----------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------

// da evitare perché potrebbe capitare che un utente elimini per sbaglio un'altro profilo
router.delete('/users/:id', async(req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})

// Rimuovo lo user dal db
// Middleware -> auth (autenticazione tramite token)
router.delete('/users/me', auth, async(req, res) => {
    try {
        // metodo mongoose: remove()
        await req.user.remove();

        res.send(req.user);
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router