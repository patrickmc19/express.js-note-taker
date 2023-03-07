const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/db/db.json'));
    console.info(`${req.method} request received to get notes`);
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
})

app.post('/api/notes', (req, res) => {
    console.info(`${req.method} received to add a new note`);
    const { title, text } = req.body;
    if (title && text) {
        const addNote = {
            title,
            text,
            // review_id: uuid(), - how do you include this?
        }
        fs.readFile('/db/db.json', "utf8", (err, data) => {
            if (err) {
                console.error(err);
            } else {
                const parsedNotes = JSON.parse(data);
                parsedNotes.push(addNote);

                fs.writeFile('/db/db.json', JSON.stringify(parsedNotes, null, 3), (err) =>
                err ? console.error(err):
                cnonsole.log(`Note for ${addNote.title} has been written to JSON file`)
                )
            }
        });
        const response = {
            status: "success",
            body: addNote,
        };
        console.log(response);
        res.status(201).json(response);    
    } else {
        res.status(500).json("Error in creating new note");
    }
});


app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);