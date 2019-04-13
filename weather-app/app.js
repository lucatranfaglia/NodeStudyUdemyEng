const chalk = require('chalk');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const yargs = require('yargs');
const _ = require('lodash');



// SELEZIONA il 3 parametro dalla linea di comando
let city = process.argv[2];
 
if(!city || city===undefined){
    console.log("Parameter not found!");
}else{
    // geocode(city, (error, geocodeData) =>{
    //     if(error){
    //         // error : ritorna una stringa di errore
    //         // data : ritorna undefined
    //         return console.log(chalk.red(error), geocodeData);
    //     }
    //     else{
    //         const location = geocodeData.place_name;
    //         const longitudine = geocodeData.longitudine;
    //         const latitudine = geocodeData.latitudine;
    //         console.log("Longitudine e latitudine: ", longitudine, latitudine);
    //         forecast(longitudine ,latitudine , (error, forecastData) => {
    //             if(error){
    //                 // error : ritorna una stringa di errore
    //                 // data : ritorna undefined
    //                 return console.log(chalk.red(error), forecastData);
    //             }
    //             else{
    //                 console.log("The day '"+forecastData.today+"' in "+location+", the maximum temperature is "+forecastData.maxTemperature+" degrees and the minimum temperature is "+forecastData.minTemperature+" degrees, with a probability of rain equal to "+forecastData.precipProbability+"!");
    //             }
    //         })
    //     }    
    // });

    // funzione con assegnamento di destrutturazione
    geocode(city, (error, {place_name, longitudine, latitudine}) =>{
        if(error){
            // error : ritorna una stringa di errore
            // data : ritorna undefined
            return console.log(chalk.red(error), geocodeData);
        }
        else{
            const location = place_name;
            console.log("Longitudine e latitudine: ", longitudine, latitudine);
            forecast(longitudine ,latitudine , (error, {today, maxTemperature, minTemperature, precipProbability}) => {
                if(error){
                    // error : ritorna una stringa di errore
                    // data : ritorna undefined
                    return console.log(chalk.red(error), forecastData);
                }
                else{
                    console.log("The day '"+chalk.gray(today)+"' in "+chalk.magenta(location)+", the maximum temperature is "+chalk.yellow(maxTemperature)+" degrees and the minimum temperature is "+chalk.yellow(minTemperature)+" degrees, with a probability of rain equal to "+chalk.blue(precipProbability)+"!");
                }
            })
        }    
    });
}

// setTimeout(()=>{
//     console.log('2 Second Timer.');
// }, 2000);

// setTimeout(()=>{
//     console.log('0 Second Timer.');
// }, 0);

// console.log("Stoppping");


// FUNZIONE CHE MI RESTITUISCE IL METEO rispetto alla latitudine e longitudine che gli viene passsata
// const url = "https://api.darksky.net/forecast/f03357e548ea841e3df926aa64b908fe/41.852294,12.569970?exclude=currently&lang=it&units=auto";
// request({url: url, json:true }, function (error, response, body) {
//     if(error){
//         console.log('Unable to connect to weather service:', error); // Print the error if one occurred
//     }
//     else if(response.body.error){
//         console.log('Unable to find locatiion: ',response.body.error);
//     }
//     else{
//         console.log('statusCode:', response && chalk.green(response.statusCode)); // Print the response status code if a response was received
//         // console.log('body:', body); // Print the HTML for the Google homepage.
//         // DATO CHE ABBIAMO INSERITRO json:true negli argomenti non è necessario fare il parse di response. Infatti impostando json:true, response.body è più una stringa
//         // const data = JSON.parse(response.body);
//         // contiene informazione sulla previsione corrente
//         // console.log("Previsione Corrente: ", data.currently);
//         const timezone = response.body.timezone;
//         const datas = response.body.daily.data;
//         const dataToday = datas[0];
//         const dataTomorrow = datas[2];
//         // DAY
//         const today = convertDay(dataToday.time);
//         const tomorrow = convertDay(dataTomorrow.time);
//         // TEMPERATURE
//         const todayTemperature = temperature(dataToday);
//         const tomorrowTemperature = temperature(dataTomorrow);
//         // Probabilità di Precipitazione  
//         const precipProbabilityToday = dataToday.precipProbability;
//         const precipProbabilityTomorrow = dataTomorrow.precipProbability;
//         console.log("The day '"+today+"' in "+timezone+", the maximum temperature is "+todayTemperature[0]+" degrees and the minimum temperature is "+todayTemperature[1]+" degrees, with a probability of rain equal to "+precipProbabilityToday+"!");
//     }
// });

// function convertDay(epochTime){
//     const day = new Date(0);
//     day.setUTCSeconds(epochTime);
//     return day;
// }

// function temperature(data){
//     const valueTemperature = [];
//     valueTemperature.push(data.temperatureMin);
//     valueTemperature.push(data.temperatureMax);
//     return valueTemperature;
// }


// FUNZIONE CHE MI RESTITUISCE latitudine e longitudine di una città che inserisco a parametro
// const url_location = "https://api.mapbox.com/geocoding/v5/mapbox.places/Rome.json?access_token=pk.eyJ1IjoiZWRzZ2VyIiwiYSI6ImNqc3Z5bjVqZjAzNnUzem81YTRwZjBpcmoifQ.lxMYZR5PV9vueeVCSH1j0Q";
// request({url: url_location, json:true }, function (error, response, body) {
//     if(error){
//         console.log(chalk.red("Unable to connect to location services!"));
//     }
//     else if(!response.body.features || response.body.features.length === 0){
//         console.log("Unable to find location. Try another services!");
//     }
//     else{
//         console.log('statusCode:', response && chalk.green(response.statusCode)); // Print the response status code if a response was received     
//         const data = response.body.features[0];
//         console.log(data );
//         const place_name = data.place_name;
//         const longitudine = data.center[0];
//         const latitudine = data.center[1];
//         console.log(place_name, longitudine, latitudine );
//     }
// });