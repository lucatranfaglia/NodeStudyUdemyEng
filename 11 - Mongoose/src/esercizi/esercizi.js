// require("./db");



const input = { "age": 17 };

// return only key of object
const updates = Object.keys(input);
console.log("Obj updates: ", updates);

const allowedUpdates = ['name', 'email', 'password', 'age'];

const isValidOperation = updates.every((update) => {
    console.log("Obj every: ", update);

    return allowedUpdates.includes(update);
})

console.log("isValidOperation: ", isValidOperation);


/* Simple Hello World in Node.js */
// const add = async(a, b) => {

//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(a + b);
//         }, 2000)
//     })
// }

// const doWork = async(text = 'default') => {
//     const sum = await add(1, 4);
//     console.log("sum: ", text, sum);
//     const sum2 = await add(sum, 4);
//     console.log("sum2: ", text, sum2);
//     const sum3 = await add(sum2, 4);
//     console.log("sum3: ", text, sum3);
//     return sum3;
// }

// console.log("------------")


// const work = doWork("work");
// console.log("work: ", typeof(work), work);

// console.log("------------")


// let stocks = {
//     Fruits: ["strawberry", "grapes", "banana", "apple"],
//     liquid: ["water", "ice"],
//     holder: ["cone", "cup", "stick"],
//     toppings: ["chocolate", "peanuts"],
// };


// -----------------------------------------------------------------
// let order = (call_production) => {
//     console.log("Order placed. Please call production")

//     // function 👇 is being called 
//     call_production();
// };

// let production = () => {

//     console.log("Production has started")

// };
// order(production);

// -----------------------------------------------------------------
// // Function 1
// let order = (fruit_name, call_production) => {
//     setTimeout(function() {

//         console.log(`${stocks.Fruits[fruit_name]} was selected`)

//         // Order placed. Call production to start
//         call_production();
//     }, 2000)
// };

// // Function 2
// let production = () => {
//     setTimeout(() => {
//         console.log("production has started")


//         setTimeout(() => {
//             console.log("The fruit has been chopped")
//         }, 2000)


//     }, 0000)
// };


// // Trigger 👇
// order(0, production);


// -----------------------------------------------------------------
// reject -> catch -> finally

// let is_shop_open = true;
// is_shop_open = false;

// // time: number
// // work: function
// let order = (time, work) => {
//     return new Promise((resolve, reject) => {
//         if (is_shop_open) {
//             setTimeout(() => {

//                 // work is 👇 getting done here
//                 resolve(work())

//                 // Setting 👇 time here for 1 work
//             }, time)
//         } else {
//             reject(console.log("Our shop is closed"))
//         }
//     })
// };
// // Set 👇 time here
// // step 1
// order(2000, () => console.log(`${stocks.Fruits[0]} was selected`))

// // step 2
// .then(() => {
//     return order(0000, () => console.log('production has started'))
// })

// // step 3
// .then(() => {
//     return order(2000, () => console.log("Fruit has been chopped"))
// })

// // step 4
// .then(() => {
//     return order(1000, () => console.log(`${stocks.liquid[0]} and ${stocks.liquid[1]} added`))
// })

// // step 5
// .then(() => {
//     return order(1000, () => console.log("start the machine"))
// })

// // step 6
// .then(() => {
//     return order(2000, () => console.log(`ice cream placed on ${stocks.holder[1]}`))
// })

// // step 7
// .then(() => {
//     return order(3000, () => console.log(`${stocks.toppings[0]} as toppings`))
// })

// // Step 8
// .then(() => {
//     return order(2000, () => console.log("Serve Ice Cream"))
// })

// .catch((e) => {
//     console.log("Customer left")
// })

// .finally(() => {
//     console.log("end of day")
// })

// -----------------------------------------------------------------
// PROMISE
// function kitchen() {

//     return new Promise((resolve, reject) => {
//         if (true) {
//             resolve("promise is fulfilled")
//         } else {
//             reject("error caught here")
//         }
//     })
// }

// kitchen() // run the code
//     .then() // next step
//     .then() // next step
//     .catch() // error caught here
//     .finally() // end of the promise [optional]

// -----------------------------------------------------------------
// ASYNC AWAIT

// async function abc() {
//     return console.log("abc exist");
// }

// //👇 Magical keyword
// async function kitchen() {

//     try {
//         // Let's create a fake problem      
//         await abc();
//     } catch (error) {
//         console.log("abc does not exist", error)
//     } finally {
//         console.log("Runs code anyways")
//     }
// }

// -----------------------------------------------------------------
// PROBLEM : async await
// -----------------------------------------------------------------

// A
// B
// C
// doing the dishes
// cleaning the tables
// taking orders
// which topping would you love?
// D
// E

// async function kitchen() {
//     console.log("A")
//     console.log("B")
//     console.log("C")
//     await toppings_choice()
//     console.log("D")
//     console.log("E")
// }

// function toppings_choice() {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(console.log("which topping would you love?"))
//         }, 3000)
//     })
// }

// kitchen() // run the code
//     .then(() => {
//         console.log("doing the dishes");
//         console.log("cleaning the tables");
//         console.log("taking orders");
//     })
//     .catch((e) => {
//         console.log("finished", e);
//     })
//     .finally(() => {
//         console.log("close");
//     })


// console.log("doing the dishes");
// console.log("cleaning the tables");
// console.log("taking orders");

// -----------------------------------------------------------------
// TIME : async await
// -----------------------------------------------------------------
// let is_shop_open = true;

// function time(ms) {
//     return new Promise((resolve, reject) => {
//         if (is_shop_open) {
//             setTimeout(resolve, ms);
//         } else {
//             reject(console.log("Shop is closed"))
//         }
//     });
// }

// async function kitchen() {
//     try {
//         // time taken to perform this 1 task
//         await time(2000)
//         console.log(`${stocks.Fruits[0]} was selected`)
//     } catch (error) {
//         console.log("Customer left", error)
//     } finally {
//         console.log("Day ended, shop closed")
//     }
// }

// // Trigger
// kitchen();