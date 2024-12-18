const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json());


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'chatbottests'
});


app.get('/getAllItems', (req, res) => {
    connection.query('SELECT * FROM items', (err, results) => {
        if (err) {
            console.error('Ошибка выполнения запроса:', err);
            res.json(null);
            return;
        }
        res.json(results);
    });
});


app.post('/addItem', (req, res) => {
    const { name, descr } = req.query;
    if (!name || !descr) {
        res.json(null);
        return;
    }

    connection.query('INSERT INTO items (name, descr) VALUES (?, ?)', [name, descr], (err, results) => {
        if (err) {
            console.error('Ошибка выполнения запроса:', err);
            res.json(null);
            return;
        }
        res.json({ id: results.insertId, name, descr });
    });
});


app.post('/deleteItem', (req, res) => {
    const { id } = req.query;
    if (!id || isNaN(id)) {
        res.json(null);
        return;
    }

    connection.query('DELETE FROM items WHERE id = ?', [id], (err, results) => {
        if (err || results.affectedRows === 0) {
            res.json({});
            return;
        }
        res.json({ id });
    });
});


app.post('/updateItem', (req, res) => {
    const { id, name, descr } = req.query;
    if (!id || isNaN(id) || !name || !descr) {
        res.json(null);
        return;
    }

    connection.query('UPDATE items SET name = ?, descr = ? WHERE id = ?', [name, descr, id], (err, results) => {
        if (err || results.affectedRows === 0) {
            res.json({});
            return;
        }
        res.json({ id, name, descr });
    });
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
