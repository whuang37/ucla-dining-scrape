const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
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
  console.log(app.get('profile'));
  res.send(app.get('profile'));
});

app.post('/user', async (req, res) => {
  await client.connect();
  
  const users = client.db("diningLog").collection('profiles');

  const cursor = users.find({username: req.body.username})

  const user = cursor.next();
  user.then((u) => {
      app.set('profile', {allergens: u.allergens, calories: u.calories});
      res.redirect('/profile');
    });
});



app.listen(8080, () => {
  console.log(`Server is running on port: 8080`);
  console.log('API is running on http://localhost:8080')
});