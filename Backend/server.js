const express = require('express')
const app = express()
const { MongoClient } = require('mongodb');
const dotenv=require('dotenv')
const bodyparser=require('body-parser');
const cors=require('cors');
dotenv.config()
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
app.use(cors());

// Database Name
const dbName = 'PassOP';
// console.log(process.env.MONGO_URI) 
 const port=3000;
 app.use(bodyparser.json());
  client.connect();
  console.log('Connected successfully to server');
  app.get('/', async(req, res)=>{
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();

  res.json(findResult);
//   console.log("Hello word");
})

app.post('/', async(req, res)=>{
    const password=req.body;
    const db = client.db(dbName);

    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password);

  res.send({success:true,result:findResult});
//   console.log("Hello word");
})

app.delete('/', async(req, res)=>{
    const password=req.body;
    const db = client.db(dbName);

    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password);

  res.send({success:true,result:findResult});
//   console.log("Hello word");
})

app.listen(port,()=>{
 console.log(`App is listen at http://localhost:${port}`)
})