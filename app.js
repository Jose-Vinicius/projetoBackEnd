//modulos
const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const admin = require('./routes/admin');

//configurações
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//handlebars
app.engine('handlebars', handlebars({defaultLayout:'main'}));
app.set('view engine','handlebars');

//mongoose

//rotas
app.get('/', (req, res) => {
    res.send('rota principal');
});

app.use('/admin', admin);
//outros
const PORT = 8080;
app.listen(PORT, () => {
    console.log('Servidor iniciado');
});