const express = require('express');
const fs = require ('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './db', 'db.json'));
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public', 'notes.html'));
})

app.post('/api/notes', (req, res) => {
    let addNote = req.body;
    let listNotes = JSON.parse(fs.readFileSync('./db/db.json', "utf8"));
    let notesLength = (listNotes.length).toString();
    
})