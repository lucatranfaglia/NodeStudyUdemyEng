// // Versione 1 
// const square = function(x){
//     return x * x;
// }

// // Versione 2
// // dopo il segno uguale, la prima cosa che farò e impostare la mia lista di argomenti
// const square = (x) => { 
//     return x * x;
// }

// // Versione 3
// // dopo il segno uguale, la prima cosa che farò e impostare la mia lista di argomenti
// const square = (x) => x * x;

// console.log( square(3));


// const event = {
//     name : 'Birthday Party',
//     printGuestList: function(){
//         console.log('Guest list for '+this.name);
//     }
// }

// // la funzione a freccia '=>' non è in grado di trovare la proprietà del nome dell’oggetto (non associa i propri this, arguments, super o new.target) e questo è dovuto al fatto che le funzioni a freccia '=>' non vincolano il proprio valore, il che significa che non hanno accesso all'oggetto. Le funzioni a freccia sono sempre anonime. Questa notazione è maggiormente indicata per le funzioni che non sono metodi, e non possono essere usate come costruttori. 
// const event = {
//     printGuestList: ()=>{
//         console.log('Guest list for '+this.name);
//     }
// }


// PROBLEM Andrew is attending undefined
// const event = {
//     name : 'Birthday Party',
//     guestList: ['Andrew', 'Jen', 'Mike'],
//     printGuestList(){
//         console.log('Guest list for '+this.name);
//         this.guestList.forEach(function(guest){
//             // NON POSSO ACCEDERE a name
//             console.log(guest + ' is attending '+ this.name);
//         })
//     }
// }

// creo un riferimento ("that") nella funzione printGuestList così da accedere alla proprietà "name"
const event = {
    name : 'Birthday Party',
    guestList: ['Andrew', 'Jen', 'Mike'],
    printGuestList(){
        const that = this;

        console.log('Guest list for '+this.name);

        this.guestList.forEach(function(guest){
            console.log(guest + ' is attending '+ that.name);
        })
    }
}

event.printGuestList();