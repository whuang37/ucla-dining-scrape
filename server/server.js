const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());

// app.use('/login', (req, res) => {
//   res.send({
//     token: 'test123'
//   });
// });

app.use(express.json());
app.use(require("./routes/record"));

const { MongoClient } = require("mongodb");
// Connection URI
const uri =
  "mongodb+srv://rohan_sri:mongodb@cluster0.pbiwr.mongodb.net/?retryWrites=true&w=majority";
// Create a new MongoClient
const client = new MongoClient(uri);
// const path = require('path');
// app.get('/*', function(req, res) {
//   res.sendFile(path.join(__dirname, '../dining-log/public/index.html'), function(err) {
//     if (err) {
//       res.status(500).send(err)
//     }
//   })
// })

app.post('/login', async (req, res) => {
  console.log(req.body);
  await client.connect();
  client.db("diningLog").collection('users').insertOne(req.body, (err, data) => {
      if(err) return console.log(err);
      res.send(('saved to db: ' + data));
  })
  await client.close();
});

app.listen(8080, () => {

  //await foo();
  console.log(`Server is running on port: ${port}`);
  console.log('API is running on http://localhost:8080/login')
});