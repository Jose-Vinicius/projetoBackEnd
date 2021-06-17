//modulos
const express = require('express');
const app = express();
const admin = require('./routes/admin');
const path = require('path');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');

//sesão
    app.use(session({
        secret: "cursonode",
        resave: true,
        saveUninitialized: true
    }));
//flash
    app.use(flash());

//middleware
    app.use((req,res,next) => {
        res.locals.success_msg = req.flash('success_msg');
        res.locals.error_msg = req.flash('error_msg');
        next();
    });

//configurações
    app.use(express.urlencoded({extended: true}));
    app.use(express.json());

//handlebars
    app.engine('handlebars', handlebars({
        defaultLayout:'main', 
        runtimeOptions:{
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true
        }
    }));
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

    app.use((req,res,next) => {
        console.log('Oi eu sou um middleware');
        next();
    });

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