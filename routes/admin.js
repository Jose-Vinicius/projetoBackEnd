const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../models/Categoria');
const Categoria = mongoose.model('categorias');

router.get('/', (req, res) => {
    res.render('admin/index');
});

router.get('/posts', (req, res) => {
    res.send('pagina de posts');
});

//exibição das categorias todas juntas
router.get('/categorias', (req, res) => {
    res.render('admin/categorias');
});
//local para adicionar novas categorias
router.get('/categorias/add', (req, res) => {
    res.render('admin/addCategorias');
});
//local para ?
router.post('/categorias/nova', (req, res) => {
    const novaCategoria = {
        nome: req.body.nome,
        slug: req.body.slug
    }
    new Categoria(novaCategoria).save().then(() => {
        console.log('Sucesso na criação da categoria');
    }).catch((err) => {
        console.log(`Erro na criação da categoria, ERRO: ${err}`);
    });

    res.redirect('/admin/categorias/add')
});

module.exports = router;