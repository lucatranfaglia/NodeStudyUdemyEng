// const names = ['Pop', 'Pippo', 'Pluto'];

// const shortNames = names.filter((name)=>{
//     return name.length<=4;
// })


// const geoCode = (address, callback) => {
//     setTimeout(() => {
//         const data = {
//             latitudine:0,
//             longitudi:0
//         }

//         callback(data);
//     }, 2000);
// }

// geoCode('Rome', (data)=>{
//     console.log(data);
// })


const add = (x1, x2 , callback) => {
    setTimeout(() => {
        
        const sum = x1+x2;
        callback(sum);
    }, 2000);
}

add (1,4, (sum)=>{
    console.log(sum);
})