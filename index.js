const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); // Añadir path para resolver la ruta de vistas
const userRoutes = require('./routes/userRoutes');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configurar motor de vistas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Rutas
app.use('/api', userRoutes);

// Ruta para la interfaz de usuario
app.get('/', (req, res) => {
    res.render('index');
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
