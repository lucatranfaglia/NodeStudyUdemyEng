// Accedere a proprietà su un oggetto situato in un altro file
// l'obiettivo è creare un oggetto utente e vogliamo che il loro nome e la loro età provengano da queste variabili.
// salePrice : se il valore è undefined il prodotto non è in vendita 

const product = {
    label : 'Red notebook',
    price : 3,
    stock: 201,
    salePrice : undefined,
    rating: 4.2
}


// sintassi : creiamo una const 
// successivamente all'uguale, inseriamo l'oggetto che stiamo cercando di strutturare
// invece di accedere all'etichetta del prodotto e al punto del prodotto. voglio un'etichetta individuale e una variabile, questo lo ottengo all'interno delle parentesi graffe.
// all'interno delle graffe inserisco le proprietà che cerco di estrarre dal prodotto 

// se rating non è stato assegnato restuirà undefined. Se invece gli viene assegnato un valore nella const (e non nell'oggetto product) restituirà tale valore.
// Se rating viene assegnato sia nell'oggetto product che nella const, verrà restituito il valore assegnatogli dall'oggetto product
// rating = 5 è il valore di default in caso non sia assegnato nessun valore nell'oggetto

// ESEMPIO
// const {label , stock, rating = 5} = product; 
// console.log(label);
// console.log(stock);
// console.log(rating); 



// Ora abbiamo una variabile di etichetta locale che possiamo usare. Possiamo strutturare l'argomento proprio nella lista degli argomenti.
// Quindi, invece di dare un nome a quell'argomento, semplicemente impostiamo le parentesi graffe e ora possiamo strutturare qualsiasi cosa vogliamo fuori da quella variabile senza mai avere accesso all'intero oggetto.
// Quindi qui avremo accesso solo ai valori che scegliamo per la struttura D.


// const transaction = (type, myProduct) =>{
//     console.log(type, myProduct.label, myProduct.rating);
// };



const transaction = (type, {label, rating}) =>{
    console.log(type, label, rating);
};
transaction('order', product);

