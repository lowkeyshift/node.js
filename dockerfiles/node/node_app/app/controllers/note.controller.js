const tracer = require('dd-trace').init({ service: 'node-express', // shows up as Service in Datadog UI
                                        hostname: 'agent', // references the `agent` service in docker-compose.yml
                                        env: 'staging',
                                        plugins: true,
                                        sampleRate: 1});


const Note = require('../models/note.model');

// Create and Save a new Note
var  MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

// Connection URL
const url = 'mongodb://demo-mongo:27017';

// Database Name
const dbName = 'Users';

exports.create = (req, res, next) => {
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    // Create a Note
    const noteNew = {
        title: req.body.title || "Untitled Note",
        content: req.body.content
    };

const insertDocuments = function(db, callback) {
    const collection = db.collection('notes');
    collection.insertOne(noteNew, function(err, result) {
      assert.equal(null, err);
      console.log('Note inserted');
      callback(result);
      console.log('Closed DB');
    });
};

    MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
      assert.equal(null, err);
      const db = client.db(dbName);
      insertDocuments(db, function() {
          client.close();
        });
    res.send('Successfully Posted To Database.');
  });
}


// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Note.find()
    .then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    Note.findById(req.params.noteId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.noteId
        });
    });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Find note and update it with the request body
    Note.findByIdAndUpdate(req.params.noteId, {
        title: req.body.title || "Untitled Note",
        content: req.body.content
    }, {new: true})
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.noteId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Note.findByIdAndRemove(req.params.noteId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.send({message: "Note deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.noteId
        });
    });
};
