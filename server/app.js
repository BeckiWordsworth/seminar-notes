var {express } = require('express');
var express = require('express');
var validate = require('express-jsonschema').validate;
var postNotes = require(`./schemas/Note`)
var bodyParser = require('body-parser');
var Note = require(`./models/Note`)
var cors = require("cors");
var app = express();
var dbEngine = require('tingodb')();
var db = new dbEngine.Db(`${__dirname}/data/`, {});

app.use(express.json())
app.use(cors());

// Initialize the database with data if there is none
const initializeDb = () => {
  const initialNotes = require('./initial-notes.json');
  let collection = db.collection("notes");

  initialNotes.forEach((note) => {
     collection.update(
      { initial_id: note.initial_id },
      note,
      { upsert: true }
    )
  });
}

initializeDb();

app.get("/getnotes", function(req, res ) {
  let collection = db.collection("notes");
  
  collection.find().toArray((err, result) => {
    if (result) {
      res.send(result);
    } else {
      console.log("Error fetching notes.");
      res.send({"error": "Failed to fetch notes"});
    }
  });
});

app.post("/addnote", function(req, res) {
  console.log("Hello")
  console.log("note", req.body)
  let collection = db.collection("notes");

  // VALIDATION - Apply Schema , validate({body: postNotes})

  const note = new Note({
    content : req.body.content,
    user: {
      name: req.body.userName,
      img: req.body.userImage
    },
    created: Date(),
    modified: Date(),
})

console.log(note)

// SAVE TO DATABASE
// collection.insertOne(note);
// return collection.findOne(note.id);

  
});

app.listen(3001, function() {
  console.log("Example app listening on port 3001!");
});
