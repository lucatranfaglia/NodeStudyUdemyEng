const validator = require('validator');


let person = {
    name: "Luca"
};

person.age = 25;


debugger;       // eseguendo l'applicazione con inspector, l'applicazione si fermerà al questo punto

person.name = "Ugo";

person.email = "pippo@gmail.com";

person.website = "http:/mead.io";

console.log(person);


console.log(validator.isEmail(person.email));
console.log(validator.isURL(person.email));

