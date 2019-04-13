const doWorkPromises = new Promise ((resolve, reject) =>{
    setTimeout(() =>{
       
        resolve([1,4,7])                 // se ritorno resolve entra nel THEN => Success:  [ 1, 4, 7 ]
        reject('Things went Wrong!')        // se ritorno resolve entra nel CATCH => Error:  Things went Wrong!
    }, 2000)
})


doWorkPromises
.then((result)=>{
    console.log("Success: ",result);
})
.catch((error)=>{
    console.log("Error: ",error);
})



//
//                                      fulfilled
//                                  /
//  Promise         -- pending -->
//                                  \
//                                      rejected
//

