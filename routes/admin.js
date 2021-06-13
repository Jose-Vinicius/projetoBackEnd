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
    //validação formulario

    let erros = [];

    if(!req.body.nome){
        erros.push({texto:'Nome invalido'});
    };

    if(req.body.nome.length < 2){
        erros.push({texto: 'O nome é muito pequeno!'});
    };

    if(!req.body.slug){
        erros.push({texto:'Slug invalido'});
    };

    if(!req.body.slug.trim){
        erros.push({texto: 'O slug não pode conter espaço'});
    };

    if(!req.body.slug.toUpperCase){
        erros.push({texto: 'O slug não pode conter letras maiúsculas'});
    };

    if(req.body.slug.length < 2){
        erros.push({texto: 'O slug é muito pequeno!'});
    };

    if(erros.length > 0){
        res.render('admin/addCategorias', {erros: erros});
    } else{
        const novaCategoria = {
            nome: req.body.nome,
            slug: req.body.slug
        };
    
        new Categoria(novaCategoria).save().then(() => {
            req.flash("success_msg", "Categoria criada com sucesso");
            res.redirect('/admin/categorias')
        }).catch((err) => {
            req.flash("error_msg", `Houve um erro na hora da criação da categoria  ERRO: ${err}`);
            res.redirect('/admin/categorias')
        });
    };
});

module.exports = router;