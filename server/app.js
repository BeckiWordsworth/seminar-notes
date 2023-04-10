const express = require('express');
var validate = require('express-jsonschema').validate;
var postNotes = require(`./schemas/Note`)
var Note = require(`./models/Note`)
var User = require(`./models/User`)
var cors = require("cors");
var app = express();
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config()

const port = process.env.PORT || 3001;

app.use(express.json())
app.use(cors());

// DB Connection

const mongoUri = process.env.ATLAS_URI;
const dbClient = new MongoClient(mongoUri);

async function initDb() {
  try {
    const db = dbClient.db('seminar');
    const initialNotes = require('./initial-notes.json');
    let notesCollection = db.collection("notes");
  
    initialNotes.forEach((note) => {
       notesCollection.updateOne(
        { initial_id: note.initial_id },
        { $set: note },
        { upsert: true }
      )
    });

    const initialUsers = require('./initial-users.json');
    let usersCollection = db.collection("users");
  
    initialUsers.forEach((user) => {
       usersCollection.updateOne(
        { initial_id: user.initial_id },
        { $set: user },
        { upsert: true }
      )
    });
  } finally {
    await dbClient.close();
  }
}

initDb().catch(console.dir);

//Get all notes endpoint
app.get("/getnotes", async function(req, res ) {
  try {
    let collection = dbClient.db("seminar").collection("notes");
    let result = await collection.find().toArray();
    res.send(result);
  } catch (err) {
    res.send({"error": "Failed to fetch notes: " + err});
  }
});

//Add a note endpoint
app.post("/addnote", /*validate({body: postNotes}),*/ async function(req, res) {
  try {
    let noteCollection = dbClient.db("seminar").collection("notes");
    let userCollection = dbClient.db("seminar").collection("users");

    let user = await userCollection.findOne({ "_id": new ObjectId(req.body.userId) });
    
    if (!user) {
      res.send({"error": "Could not find user with given userId"});
      return;
    }

    const note = new Note({
      content : req.body.content,
      user: user,
      created: Date(),
      modified: Date(),
    })

    // SAVE TO DATABASE
    let result = await noteCollection.insertOne(note.toJSON());

    if (!result.insertedId) {
      res.send({"error": "Failed to add note to database."});
      return;
    }

    let record = await noteCollection.findOne({ "_id": result.insertedId })
    res.send(record);
  } catch (err) {
    console.log({err})
    res.send({"error": err.message});
  }
});

app.delete("/removenote", async function(req, res) {
 console.log("Remove a note")
});

app.get("/getusers", async function(req, res) {
  try {
    let collection = dbClient.db("seminar").collection("users");
    let result = await collection.find().toArray();

    console.log(result)
    res.send(result);
  } catch (err) {
    res.send({"error": "Failed to fetch notes: " + err});
  }
 });

 app.get("/getuser", async function(req, res) {
  try {
    let collection = dbClient.db("seminar").collection("users");
    let result = await collection.find({_id}).toArray();

    res.send(result);
  } catch (err) {
    res.send({"error": "Failed to fetch notes: " + err});
  }
 });

 app.get("/adduser", async function(req, res) {
  let collection = dbClient.db("seminar").collection("user");

  // VALIDATION - Apply Schema , validate({body: postNotes})
  const user = new User({
    content : req.body.content,
    user: {
      name: req.body.userName,
      img: req.body.userImage
    },
    created: Date(),
    modified: Date(),
  })

  // SAVE TO DATABASE
  let result = await collection.insertOne(user.toJSON());

  if (!result.insertedId) {
    res.send({"error": "Failed to add note to database."});
    return;
  }

  let record = await collection.findOne({ "_id": result.insertedId })
  res.send(record);
 });



app.listen(3001, function() {
  console.log("App is listening on port 3001!");
});
