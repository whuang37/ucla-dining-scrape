const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());

app.use(express.json());
app.use(require("./routes/record"));

const { MongoClient } = require("mongodb");
const { application } = require("express");
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

app.get('/query', function(req, res){
  // console.log(JSON.stringify(app.get('query_result'), null, 4));
  res.send(app.get('query_result'));
});

app.post('/signup', async (req, res) => {
  await client.connect();

  const users = client.db("diningLog").collection('users');
  const profiles = client.db("diningLog").collection('profiles');

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
        profiles.insertOne({username:req.body.username, allergens:req.body.allergens, calories:req.body.calories}, (err, data) => {
          if(err) return console.log(err);
          
        });
        users.insertOne({username: req.body.username, password: req.body.password}, (err, data) => {
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

app.get('/profile', function(req, res){
  res.send(app.get('profile'));
});

app.post('/user', async (req, res) => {
  await client.connect();

  const users = client.db("diningLog").collection('profiles');

  const cursor = users.find({username: req.body.username})

  const user = cursor.next();
  user.then((u) => {
    if(u)
    {
      app.set('profile', {allergens: u.allergens, calories: u.calories});
      res.redirect('/profile');
    }
  });
});


app.post('/foodfilter', async (req, res) => {
  await client.connect();
  //console.log('AM I BEING USED');
  const users = client.db("diningLog").collection('users');

  const query = {
  };

  if (req.body.meal == "Breakfast"){
    req.body.meal = "breakfast";
  }

  if (req.body.meal == "Lunch"){
    req.body.meal = "lunch";
  }

  if (req.body.meal == "Dinner"){
    req.body.meal = "dinner";
  }

  if (req.body.hall == "Bruin Plate"){
    req.body.hall = "bplate";
  }

  if (req.body.hall == "De Neve"){
    req.body.hall = "de_neve";
  }

  if (req.body.hall == "Epicuria"){
    req.body.hall = "epicuria";
  }

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
  // console.log(selected_calories);

  var user_cursor = client.db("diningLog").collection('profiles').find({
    username: req.body.username
  }); 

  console.log(req.body);

  var calorie_limit;
  query.allergens = {$nin: []};

  function getInfo(doc){
    // if the user has selected to filter by allergens
    // console.log(req.body.allergens);
    if (req.body.allergens){
      query.allergens = {$nin: doc.allergens};
    } 
    calorie_limit = doc.calories;
  }

  await user_cursor.forEach(getInfo);

  // if the user has selected to filter by calories
  
  if (req.body.calories){
    let calorie_query = calorie_limit - selected_calories;
    // console.log(calorie_query);
    query.calories = { $lt: calorie_query};
  } else {
    query.calories = {$exists: true};
  }

  // console.log(query);

  var cursor = client.db("diningLog").collection('food').find(query);

  cursor.toArray().then((data) => {app.set('query_result', {usercalories:calorie_limit, foods:data}); res.redirect('/query');});

});


app.post('/logmeal', async (req1, res) => {
  // console.log("AM I BEING RUN");
  const foods = 
  [{
      "name": "Salad",
      "allergens": "soy, dairy, nuts",
      "calories": 218 },
  {
      "name": "Brown rice",
      "allergens": "gluten",
      "calories": 175 },
  {
      "name": "Egg Whites Omelet",
      "allergens": "eggs",
      "calories": 174 },
  {
      "name": "Prosciutto Sandwich",
      "allergens": "gluten",
      "calories": 800 },
  {
      "name": "Grilled Chicken",
      "calories": 112 },
  {
      "name": "Blueberry Topping",
      "calories": 41 }
  ]
    /* 
    TODO: 

    pushing to db
      get selected foods from frontend post
        must include name, meal, and food objects
      append on a date

      push ^^^ into mongodb database under history collection
    
    pulling from db to history page
      separate post request to pull history data
        by username and date (singular date)
        will have to show breafkast, lunch, dinner + foods so pull all three objects

      get the objects under the user and date
      return <3 object for each meal, send empty objects for nonexistant meals
    */


  const req = {
    body: {
      username: "rohan",
      meal: "lunch",
      selectedFoods: foods
    }
  };
  var today = new Date();

  var date = (today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear();
  var insert_object = Object.assign(req);
  insert_object.body.date = date;

  console.log(JSON.stringify(insert_object, null, 2));
  
  // to check if the current date exists already
  const check_exist_query = {
    username: insert_object.body.username,
    meal: insert_object.body.meal,
    date: date
  }

  await client.connect();

  const history = client.db("diningLog").collection('history');
// deletes existing record on curr date, user, meal
  history.deleteMany(check_exist_query, (err, data) => {
    if(err) return console.log(err);
  });
// insert the received data
  history.insertOne(insert_object.body, (err, data) => {
    if(err) return console.log(err);
  });
  // const cursor = users.find({username: req.body.username})

    
  // const user = cursor.next();
  // user.then((u) => {
  //   if(u)
  //   {
  //     app.set('profile', {allergens: u.allergens, calories: u.calories});
  //     res.redirect('/profile');
  //   }
  //   });
});


app.listen(8080, () => {
  console.log(`Server is running on port: 8080`);
  console.log('API is running on http://localhost:8080');
});
