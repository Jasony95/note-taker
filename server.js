const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const notesData = require('./db/db.json');
const path = require('path');
const uuid = require('./helpers/uuid');
const fs = require('fs');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/api/notes', (req, res) => res.json(notesData));

app.post('/api/notes', (req, res) => {
  console.info(`${req.method} request received to add a note`);

  console.log(req.body);

  fs.readFile("./db/db.json", 'utf8', (error, data) => {
    let notes = JSON.parse(data);
    const newlyNote = { "title": `${req.body.title}`, "text": `${req.body.text}`, "note_id": uuid() };
    notes.push(newlyNote);
    notesjson = JSON.stringify(notes);
    fs.writeFile("./db/db.json", notesjson, (err) => {
      if (err) return res.status().json({ status: "error" })
      res.status(200).json({status: "success"})
    })
  })
});

app.delete('/api/notes/:id', (req, res) => {
  
})

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});