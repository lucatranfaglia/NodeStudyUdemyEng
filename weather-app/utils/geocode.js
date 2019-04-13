// OBIETTIVO : ottenere la longitudine e la latitudine di una città
// address: città di cui si vuole conoscere la longitudine e la latitudine
// callback : se url è corretto e il file json non è vuoto, tramite la callback ottengo le informazione che desidero


const request = require('request');
const chalk = require('chalk');

const geocode = (address, callback)=>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+address +".json?access_token=pk.eyJ1IjoiZWRzZ2VyIiwiYSI6ImNqc3Z5bjVqZjAzNnUzem81YTRwZjBpcmoifQ.lxMYZR5PV9vueeVCSH1j0Q";
    // request({url: url_location, json:true }, function (error, response, ) {
    //     // ERRORE DI CONNESSIONE
    //     if(error){
    //         console.log(chalk.red("Unable to connect to location services!"));
    //         callback(chalk.red("Unable to connect to location services!"), undefined);
    //     }
    //     // ERRORE FILE JSON (file json vuoto)
    //     else if(!response.body.features || response.body.features.length === 0){
    //         console.log("Unable to find location. Try another services!");
    //         callback("Unable to find location. Try another services!", undefined);
    //     }
    //     else{
    //         // STATO DEL CODICE
    //         console.log('Geocode statusCode:', response && chalk.green(response.statusCode)); // Print the response status code if a response was received
            
    //         // SELEZIONO il path in comune 
    //         const data = response.body.features[0];
    
    //         // OTTENGO il nome della città
    //         const place_name = data.place_name;
    //         // OTTENGO la longitudine
    //         const longitudine = data.center[0];
    //         // OTTENGO la latitudine
    //         const latitudine = data.center[1];
    
    //         callback(undefined, {
    //             place_name: place_name,
    //             longitudine: longitudine, 
    //             latitudine: latitudine
    //         })
    //     }
    // });

    // funzione con assegnamento di destrutturazione
    request({url, json:true }, function (error, {body}, ) {
        // ERRORE DI CONNESSIONE
        if(error){
            console.log(chalk.red("Unable to connect to location services!"));
            callback(chalk.red("Unable to connect to location services!"), undefined);
        }
        // ERRORE FILE JSON (file json vuoto)
        else if(!body.features || body.features.length === 0){
            console.log("Unable to find location. Try another services!");
            callback("Unable to find location. Try another services!", undefined);
        }
        else{
            // STATO DEL CODICE
            // console.log('Geocode statusCode:', response && chalk.green(response.statusCode)); // Print the response status code if a response was received
            
            // SELEZIONO il path in comune 
            const data = body.features[0];
    
            // OTTENGO il nome della città
            const place_name = data.place_name;
            // OTTENGO la longitudine
            const longitudine = data.center[0];
            // OTTENGO la latitudine
            const latitudine = data.center[1];
    
            callback(undefined, {
                place_name: place_name,
                longitudine: longitudine, 
                latitudine: latitudine
            })
        }
    });
}

module.exports = geocode;