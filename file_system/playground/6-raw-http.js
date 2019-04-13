const https = require('https');
const url = "https://api.darksky.net/forecast/f03357e548ea841e3df926aa64b908fe/12.3888,43.1121?exclude=currently&lang=it&units=auto";
 
const request = https.request(url, (response)=>{
    // si usa LET quando si riassegna il valore nel tempo
    let data = '';

    // funzione di callback che viene eseguita ogni volta che si avranno dei dati (response)
    response.on('data' , (chunk)=>{
        data = data + chunk.toString();
        console.log(data);
    });

    // funzione di callback che viene eseguita quando gli eventi sono terminati
    response.on('end' , ()=>{
        const body = JSON.parse(data);
        console.log(body);
    });
})
request.on('error' , (error)=>{
    console.log("Error: ", error);
});



request.end();