// AVVIARE
// nodemon src/app.js -e js,hbs

const path = require('path');
const express = require('express'); 
const hbs = require('hbs');
const app = express();




// console.log(__dirname);
// console.log(path.join(__dirname, '../public'));
// console.log(__filename);

// PAGINE STATICHE
const publicDirectoryPath = path.join(__dirname, '../public');
// PAGINE DINAMICHE
const viewsPath = path.join(__dirname, '../templates/views/');


const partialsPath = path.join(__dirname, '../templates/partials/');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');

// express di default cerca le pagine dinamiche sulla cartella views
// express cercherà le VIEWS nella path personalizzata - templates/index.hbs
app.set('views', viewsPath);

hbs.registerPartials(partialsPath);


//non vedremo mai i gestore di root.
//Quindi abbiamo quattro pagine distinte, sebbene una provenga da una directory statica.
app.use(express.static(publicDirectoryPath));

app.get('', (req, res)=>{
    // index corrisponde al nome del modello all'interno della cartella VIEWS
    // render( nome della vista da renderizzare , oggetto contenente i valori)
    res.render('index', {
        title : 'Indice Views',
        col1: 'Image',
        col2: 'Mamoli',
        name: 'Tranfire'
    });
});

app.get('/help', (req, res)=>{
    res.render('help', {
        title : 'Help Views',
        subtitle: 'Sub Help',
        paragraph: 'asdasdasdasd, asdasdsad',
        name: 'Tranfire'
    });
});

app.get('/about', (req, res)=>{ 
    res.render('about', {
        title : 'About Views',
        paragraph: 'asdasdasdasd, asdasdsad',
        name: 'Tranfire'
    });
});

app.get('/weather', (req, res)=>{

    res.send([{
        location:"Roma",
        latitudine: 42,
        longitudine : 12
    },
    {
        location:"Milano",
        latitudine: 42,
        longitudine : 10
    }]);
});

//-------------------------- //
// 404 NOT FOUND

// È importante l'ordine di inserimento della ROUTE (se inserisco prima '*' le pagine not found  )
app.get('/header/*', (req, res)=>{
    res.send(
        'header not found'
    );
});
app.get('/help/*', (req, res)=>{
    res.render('404',{
        title: '404 Help',
        name: 'Tranfire',
        errorMessage: 'Page Help not found'
    });
});
app.get('/about/*', (req, res)=>{
    res.render('404',{
        title: '404 about',
        name: 'Tranfire',
        errorMessage: 'Page About not found'
    });
});
app.get('*', (req, res)=>{

    res.render('404',{
        title: '404 page',
        name: 'Tranfire',
        errorMessage: 'Page not found'
    });
});


app.listen(3000, ()=>{
    console.log("Server is up on port 3000.");
})