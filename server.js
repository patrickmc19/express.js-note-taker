const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { readFromFile, readAndAppend, writeToFile } = require('./helpers/fsUtils');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
    console.info(`${req.method} request received to get notes`);
})

app.post('/api/notes', (req, res) => {
    console.info(`${req.method} received to add a new note`);
    const { title, text } = req.body;
    if (title && text) {
        const addNote = {
            title,
            text,
            id: uuidv4()
        }
        const parsedData = readAndAppend(addNote, './db/db.json');
        res.json(parsedData);
    } else {
        res.status(500).json("Error in creating new note");
    }
});

app.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((note) => note.id !== noteId);
            writeToFile('./db/db.json', result);
            res.json(result);
        })
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);