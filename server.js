const express = require ('express')
const app = express()


const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];

  const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];






/*
Introduction
For each section in this lab, you will create an Express route that accepts requests at a specific URL and responds with res.send.

1. Be Polite, Greet the User
Task: Create a route that responds to URLs like /greetings/<username-parameter>.

Examples: Matches routes like /greetings/Christy or /greetings/Mathilda.

Response: Include the username from the URL in the response, such as “Hello there, Christy!” or “What a delight it is to see you once more, Mathilda.”

*/

app.get (`/`, (req,res)=>{
    res.send (`Hello, please start by entering an argument in the path`)
})

app.get('/greetings/:name', (req, res) => {
    const name = req.params.name
    res.send(`Hello there, ${name}!`)
  })


/*
2. Rolling the Dice
Task: Set up a route to handle URLs following the pattern /roll/<number-parameter>.

Examples: Matches routes like /roll/6 or /roll/20.

Validation: If the parameter is not a number, respond with “You must specify a number.” For instance, /roll/potato should trigger this response.

Functionality: If a valid number is provided, respond with a random whole number between 0 and the given number. For example, a request to /roll/16 might respond with “You rolled a 14.”

*/
app.get('/roll/:num', (req, res) => {
    const num = req.params.num
    const rollNum = Number(num);
  
    if (rollNum=="Nan") {
      res.send('You must Enter a valid number');
    } else {
      const rollNumAdjusted = Math.floor(Math.random() * (rollNum + 1));
      res.send(`You rolled a ${rollNumAdjusted}.`);
    }
  });

/*

3. I Want THAT One!
Task: Create a route for URLs like /collectibles/<index-parameter>.

Examples: Matches routes such as /collectibles/2 or /collectibles/0.

Data Array:

Copy
  const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];
Validation: If the index does not correspond to an item in the array, respond with “This item is not yet in stock. Check back soon!”

Response: Should describe the item at the given index, like “So, you want the shiny ball? For 5.95, it can be yours!” Include both the name and price properties.



*/

app.get('/collectibles/:index', (req, res) => {
    const index = req.params.index
    const indexNum = Number(index)
  
    if (collectibles[indexNum]) {
      const selected = collectibles[indexNum]
      res.send(`So, you want the ${selected.name}? For ${selected.price}, it can be yours!`)
    } else {
     res.send('This item is not yet in stock. Check back soon!')
    }
  })


/*

Using Query Parameters
In this section, you practice using query parameters to pass information from the URL to the server in an Express application.

Query parameters are added to the end of a URL after a ? and are formatted as key=value pairs. Multiple query parameters can be added to a URL by separating them with &. For example, the following URL has two query parameters, name and age:

localhost:3000/hello?name=Christy&age=32

Query parameters are available in the server’s req.query object. We can access the values of the name and age query parameters like so:

Copy
app.get('/hello', (req, res) => {
    res.send(`Hello there, ${req.query.name}! I hear you are ${req.query.age} years old!`);
});

4. Filter Shoes by Query Parameters
Use the following array of shoes in this challenge:

Copy
  const shoes = [
      { name: "Birkenstocks", price: 50, type: "sandal" },
      { name: "Air Jordans", price: 500, type: "sneaker" },
      { name: "Air Mahomeses", price: 501, type: "sneaker" },
      { name: "Utility Boots", price: 20, type: "boot" },
      { name: "Velcro Sandals", price: 15, type: "sandal" },
      { name: "Jet Boots", price: 1000, type: "boot" },
      { name: "Fifty-Inch Heels", price: 175, type: "heel" }
  ];
Task: Create a route /shoes that filters the list of shoes based on query parameters.

Query Parameters:

min-price: Excludes shoes below this price.
max-price: Excludes shoes above this price.
type: Shows only shoes of the specified type.
No parameters: Responds with the full list of shoes.
*/

// /shoes?minprice=20&maxprice=1000&type=sandal
app.get(`/shoes`,(req,res)=>{
const minPrice = req.query.minprice 
const maxPrice = req.query.maxprice
const type = req.query.type
let filterResult = shoes.filter((eachShoes)=>{
return eachShoes.price > parseInt(minPrice)
}) 
filterResult = filterResult.filter((eachShoes)=>{
  return eachShoes.price < parseInt(maxPrice)
  }) 
  filterResult = filterResult.filter((eachShoes)=>{
    return eachShoes.type == (type)
    }) 
console.log(filterResult)
res.send(filterResult)
})

 
  app.listen(3000, () => {
    console.log('Server running on http://localhost:3000')
  })