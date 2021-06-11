//modulos
const express = require('express');
const app = express();
const admin = require('./routes/admin');
const path = require('path');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//configurações
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//handlebars
app.engine('handlebars', handlebars({defaultLayout:'main'}));
app.set('view engine','handlebars');

//mongoose
mongoose.connect('mongodb://localhost/projetoBackEnd',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Banco de dados rodando normalmente');
}).catch((err) => {
    console.log(`Houve um erro: ${err}`);
});

//public
app.use(express.static(path.join(__dirname,'public')))


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