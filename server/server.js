const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());

app.use(express.json());
app.use(require("./routes/record"));

const { MongoClient } = require("mongodb");
// Connection URI
const uri =
  "mongodb+srv://rohan_sri:mongodb@cluster0.pbiwr.mongodb.net/?retryWrites=true&w=majority";
// Create a new MongoClient
const client = new MongoClient(uri);

app.get('/auth', function(req, res){
  res.send({response:app.get('response')});
});

app.get('/signedup', function(req, res){
  res.send({response:app.get('su')});
});

app.post('/signup', async (req, res) => {
  await client.connect();

  const users = client.db("diningLog").collection('users');


  const cursor = users.find({username: req.body.username})

  const user = cursor.next();
  user.then((u) => {
      if(u)
      {
        app.set('su', 'failed');
          res.redirect('/signedup');
      }
      else
      {
        users.insertOne(req.body, (err, data) => {
          if(err) return console.log(err);
          
        });
        app.set('su', 'success');
          res.redirect('/signedup');
      }
    });
  });


app.post('/login', async (req, res) => {
  await client.connect();

  const users = client.db("diningLog").collection('users');


  const cursor = users.find({username: req.body.username})


  const user = cursor.next();
  user.then((u) => {
      if(u)
      {
        if(req.body.password == u.password)
        {
          app.set('response', 'authorized');
          res.redirect('/auth');
        }
        else
        {
          app.set('response', 'failed');
          res.redirect('/auth');
        }
      }
      else
      {
        app.set('response', 'new');
          res.redirect('/auth');
        
      }
    });

});




app.post('/foodfilter', async (req, res) => {
  await client.connect();

  const users = client.db("diningLog").collection('users');

  const query = {
  };

  // const req = {
  //   meal = "breakfast",
  //   hall = "bplate",
  //   username = "test",

  // };

  if (req.body.meal == ''){
    query.meal = {$exists: true}
  }

  if (req.body.hall == ''){
    query.hall = {$exists: true}
  }

  if (req.body.meal != ''){
    query.meal = req.body.meal;
  }

  if (req.body.hall != ''){
    query.hall = req.body.hall;
  }

  var selected_calories = 0;
  selected_calories = req.body.selectedFoods.reduce((partial_sum, a) => partial_sum + a["calories"], 0);

  var user_cursor = client.db("diningLog").collection('profiles').find({
    username: req.body.username
  });

  var calorie_limit;
  query.allergens = [];

  function getInfo(doc){
    // if the user has selected to filter by allergens
    if (req.body.allergens){
      query.allergens = doc.allergens;
    } 
    calorie_limit = doc.calorie_limit;
  }

  // if the user has selected to filter by calories
  if (req.body.calories){
    query.calories = calorie_limit - selected_calories;
  } else {
    query.calories = {$exists: true};
  }

  user_cursor.forEach(getInfo, errorFunc);

  var cursor = client.db("diningLog").collection('food').find({ 
    meal: query.meal,
    allergens: {$nin: query.allergens},
    calories: { $lt: query.calories },
    hall: query.hall
  });

  function iterateFunc(doc) {
    console.log(JSON.stringify(doc, null, 4));
  }
 
  function errorFunc(error) {
    console.log(error);
  }

  cursor.forEach(iterateFunc, errorFunc);

  });

app.listen(8080, async() => {
  console.log(`Server is running on port: ${port}`);
  console.log('API is running on http://localhost:8080/login')

  await client.connect();

  const meal = "dinner";

  var cursor = client.db("diningLog").collection('food').find({ 
    meal: meal,
    allergens: {$nin: []},
    calories: { $lt: 300 },
    hall: "de_neve"
  });

  var user_cursor = client.db("diningLog").collection('users').find({
    username: "test"
  });

  var password;

  user_cursor.forEach(getInfo, errorFunc);

  function getInfo(doc){
    // console.log(JSON.stringify(doc, ["password"], 4));
    password = doc.password;
    console.log(password);
  }
  

  // function iterateFunc(doc) {
  //   console.log(JSON.stringify(doc, null, 4));
  // }
 
  function errorFunc(error) {
    console.log(error);
  }

  // cursor.forEach(iterateFunc, errorFunc);
});