const request = require('request');
const chalk = require('chalk');

// FUNZIONE CHE MI RESTITUISCE IL METEO rispetto alla latitudine e longitudine che gli viene passsata


function convertDay(epochTime){
    const day = new Date(0);
    day.setUTCSeconds(epochTime);
    return day;
}

function temperature(data){
    const valueTemperature = [];
    valueTemperature.push(data.temperatureMin);
    valueTemperature.push(data.temperatureMax);
    return valueTemperature;
}

const forecast = (longitudine, latitudine, callback) =>{

    const url = "https://api.darksky.net/forecast/f03357e548ea841e3df926aa64b908fe/"+latitudine+","+longitudine+"?exclude=currently&lang=it&units=auto";
    // request({url: url, json:true }, function (error, response) {
    //     if(error){
    //         // console.log('Unable to connect to weather service:', error); // Print the error if one occurred
    //         callback('Unable to connect to weather service:', undefined); // Print the error if one occurred
    //     }
    //     else if(response.body.error){
    //         // console.log('Unable to find locatiion: ',response.body.error);
    //         callback('Unable to find locatiion: ',undefined);
    //     }
    //     else{
    //         console.log('Forecast statusCode:', response && chalk.green(response.statusCode)); // Print the response status code if a response was received
           
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

    //         callback (undefined,{
    //             today:today,
    //             timezone: timezone,
    //             maxTemperature: todayTemperature[0],
    //             minTemperature : todayTemperature[1],  
    //             precipProbability : precipProbabilityToday
    //         })

    //         // console.log("The day '"+today+"' in "+timezone+", the maximum temperature is "+todayTemperature[0]+" degrees and the minimum temperature is "+todayTemperature[1]+" degrees, with a probability of rain equal to "+precipProbabilityToday+"!");
    //     }
    // })

    // funzione con assegnamento di destrutturazione
    request({url, json:true }, function (error, {body}) {
        if(error){
            // console.log('Unable to connect to weather service:', error); // Print the error if one occurred
            callback('Unable to connect to weather service:', undefined); // Print the error if one occurred
        }
        else if(body.error){
            // console.log('Unable to find locatiion: ',response.body.error);
            callback('Unable to find locatiion: ',undefined);
        }
        else{
            // console.log('Forecast statusCode:', response && chalk.green(response.statusCode)); // Print the response status code if a response was received
           
            const timezone = body.timezone;
            const datas = body.daily.data;
            const dataToday = datas[0];
            const dataTomorrow = datas[2];
            // DAY
            const today = convertDay(dataToday.time);
            const tomorrow = convertDay(dataTomorrow.time);
            // TEMPERATURE
            const todayTemperature = temperature(dataToday);
            const tomorrowTemperature = temperature(dataTomorrow);
            // Probabilità di Precipitazione  
            const precipProbabilityToday = dataToday.precipProbability;
            const precipProbabilityTomorrow = dataTomorrow.precipProbability;

            callback (undefined,{
                today:today,
                timezone: timezone,
                maxTemperature: todayTemperature[0],
                minTemperature : todayTemperature[1],  
                precipProbability : precipProbabilityToday
            })

            // console.log("The day '"+today+"' in "+timezone+", the maximum temperature is "+todayTemperature[0]+" degrees and the minimum temperature is "+todayTemperature[1]+" degrees, with a probability of rain equal to "+precipProbabilityToday+"!");
        }
    })
}

module.exports=forecast;