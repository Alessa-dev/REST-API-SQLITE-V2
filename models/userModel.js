const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

/* // Crear tabla de usuarios
db.serialize(() => {
    db.run(`CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT,
        age TEXT,
        address TEXT
    )`);
}); */

module.exports = db;
