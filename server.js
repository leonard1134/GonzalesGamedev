const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'notes_db'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// API Endpoints

// Get all notes
app.get('/api/notes', (req, res) => {
    db.query('SELECT * FROM notes', (err, results) => {
        if (err) {
            res.status(500).json({ error: err });
        } else {
            res.json(results);
        }
    });
});

// Get a single note by ID
app.get('/api/notes/:id', (req, res) => {
    db.query('SELECT * FROM notes WHERE id = ?', [req.params.id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err });
        } else {
            res.json(result);
        }
    });
});

// Add a new note
app.post('/api/notes', (req, res) => {
    const { text } = req.body;
    db.query('INSERT INTO notes (text) VALUES (?)', [text], (err, result) => {
        if (err) {
            res.status(500).json({ error: err });
        } else {
            res.json({ id: result.insertId, text });
        }
    });
});

// Update a note
app.put('/api/notes/:id', (req, res) => {
    const { text } = req.body;
    db.query('UPDATE notes SET text = ? WHERE id = ?', [text, req.params.id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err });
        } else {
            res.json({ message: 'Note updated successfully' });
        }
    });
});

// Delete a note
app.delete('/api/notes/:id', (req, res) => {
    db.query('DELETE FROM notes WHERE id = ?', [req.params.id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err });
        } else {
            res.json({ message: 'Note deleted successfully' });
        }
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
