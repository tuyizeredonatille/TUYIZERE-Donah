const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Niba ufite password kuri MySQL uyishyiremo hano
    database: 'intership'
});

db.connect((err) => {
    if (err) {
        console.error('Kunanirwa guhura na Database:', err.message);
        return;
    }
    console.log('Database ya MySQL yabonetse neza!');
});

// --- ROUTES ---

// 1. Kwerekana niba API ikora
app.get('/', (req, res) => {
    res.send('Murakaza neza kuri API yacu!');
});

// 2. Kuzana abantu bose (GET ALL)
app.get('/api/users', (req, res) => {
    const sql = 'SELECT * FROM information';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// 3. Kuzana umuntu umwe (GET BY ID)
app.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM information WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ error: "Ntabwo uyu muntu abonetse" });
        res.json(results[0]);
    });
});

// 4. Kongeramo umuntu mushya (POST)
app.post('/api/users', (req, res) => {
    const { fname, lname, age, location } = req.body;
    
    // Gusuzuma niba amakuru yose yagezeho
    if (!fname || !lname) {
        return res.status(400).json({ error: "Fname na Lname ntibigomba kubura" });
    }

    const sql = 'INSERT INTO information (fname, lname, age, location) VALUES (?, ?, ?, ?)';
    db.query(sql, [fname, lname, age, location], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ 
            message: 'Umuntu yongewe mu mbonerahamwe neza',
            userId: results.insertId 
        });
    });
});

// 5. Guhindura amakuru y'umuntu (PUT)
app.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const { fname, lname, age, location } = req.body;
    const sql = 'UPDATE information SET fname = ?, lname = ?, age = ?, location = ? WHERE id = ?';
    
    db.query(sql, [fname, lname, age, location, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ error: "Uwo ushaka guhindura ntabonetse" });
        res.json({ message: 'Amakuru yavuguruwe neza' });
    });
});

// 6. Gusiba umuntu (DELETE)
app.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM information WHERE id = ?';
    
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ error: "Uwo ushaka gusiba ntabonetse" });
        res.json({ message: 'Umuntu yasibwe neza' });
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server ikorera kuri: http://localhost:${PORT}`);
});

app.get()