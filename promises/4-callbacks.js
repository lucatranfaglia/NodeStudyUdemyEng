const doWorkCallback = (callback) =>{
    setTimeout(() =>{
        // il primo paramentro è error e il secondo e result - l'ordine degli argomenti gioca un ruolo importante
        // callback('This is my error', undefined)      // return => Error: This is my error
        // callback(undefined)                          // return => Success : undefined
        callback(undefined, [1,4,7])                    // return => Success : [1,4,7]
    }, 2000)
}


doWorkCallback((error, result)=>{
    if(error){
        return console.log("Error:", error);
    }
    console.log("Success: ",result);
})
