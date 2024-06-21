const db = require('../models/userModel');

exports.createUser = (req, res) => {
    const { name, email, age, address } = req.body;
    const stmt = db.prepare('INSERT INTO users (name, email, age, address) VALUES (?, ?, ?, ?)');
    stmt.run(name, email, age, address, function(err) {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.status(201).json({ id: this.lastID });
    });
    stmt.finalize();
};

exports.getAllUsers = (req, res) => {
    db.all('SELECT * FROM users', (err, rows) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.json(rows);
    });
};

exports.getUserById = (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        if (!row) {
            return res.status(404).send('Usuario no encontrado');
        }
        res.json(row);
    });
};

exports.updateUser = (req, res) => {
    const { id } = req.params;
    const { name, email, age, address } = req.body;
    const stmt = db.prepare('UPDATE users SET name = ?, email = ? age = ? address =? WHERE id = ?');
    stmt.run(name, email, age, address, id, function(err) {
        if (err) {
            return res.status(500).send(err.message);
        }
        if (this.changes === 0) {
            return res.status(404).send('Usuario no encontrado');
        }
        res.send('Usuario actualizado exitosamente');
    });
    stmt.finalize();
};

exports.deleteUser = (req, res) => {
    const { id } = req.params;
    const stmt = db.prepare('DELETE FROM users WHERE id = ?');
    stmt.run(id, function(err) {
        if (err) {
            return res.status(500).send(err.message);
        }
        if (this.changes === 0) {
            return res.status(404).send('Usuario no encontrado');
        }
        res.send('Usuario eliminado exitosamente');
    });
    stmt.finalize();
};
