const express = require('express');
const PORT = 3001;
const app = express();
const notesData = require('./db/db.json');

app.use(express.static('public'));

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'notes.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/notes', (req, res) => res.json(notesData));

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});