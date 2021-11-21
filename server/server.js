const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());

app.use('/login', (req, res) => {
  res.send({
    token: 'test123'
  });
});

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

app.listen(8080,async () => {

  await foo();
  console.log(`Server is running on port: ${port}`);
  console.log('API is running on http://localhost:8080/login')
});

async function foo() {
  try {
    // Connect the client to the server
    await client.connect();
    // Establish and verify connection
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to server");

    const diningBase = client.db("diningLog");
    const users = diningBase.collection("users");

    // const doc = {
    //   email: "ryannguyen6392@gmail.com",
    //   password: "barr"
    // };
    // const result = users.insertOne(doc);

  } catch {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}