const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async(req, res, next) => {

    // l'utente deve fornire nell'intestazione il token valido
    try {

        const token = req.header('Authorization').replace('Bearer', '');
        const decoded = jwt.verify(token, 'testoacaso');
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

        if (!user) {
            throw new Error('Utente non trovato!');
        }

        // salvo le info dell'utente autenticato nel req
        req.user = user;

        // salvo il token nel req
        req.token = token;
        next();

    } catch (error) {
        console.log("error: ", error);
        res.status(401).send({ error: 'Please authenticate!' });
    }
};


module.exports = {
    auth
}