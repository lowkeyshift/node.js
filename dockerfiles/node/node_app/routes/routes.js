module.exports = (app) => {
    const notes = require('../app/controllers/note.controller');
    const search = require('../app/controllers/search.controller');

    // Retrieve all Notes
    app.get('/all', notes.findAll);

    // Create a new Note
    app.post('/notes', notes.create);

    // Retrieve all Notes
    app.get('/notes', notes.findAll);

    // Retrieve a single Note with noteId
    app.get('/notes/:noteId', notes.findOne);

    // Update a Note with noteId
    app.put('/notes/:noteId', notes.update);

    // Delete a Note with noteId
    app.delete('/notes/:noteId', notes.delete);

    // Pull Data & Add to Redis
    app.get('/api/search', search.search);

}
