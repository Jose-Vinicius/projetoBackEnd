const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../models/Categoria');
require('../models/Postagem');
const Categoria = mongoose.model('categorias');
const Postagem = mongoose.model('postagem');
//pagina inicial
    router.get('/', (req, res) => {
        res.render('admin/index');
    });
//pagina posts
    router.get('/posts', (req, res) => {
        res.send('pagina de posts');
    });

//CATEGORIAS
    //pagina de exibição das categorias ja criadas
        router.get('/categorias', (req, res) => {
            Categoria.find().lean().sort({date:'desc'}).then((categorias) => {
                res.render("admin/categorias", {categorias: categorias});
            }).catch((err) => {
                res.flash('error_msg', "Houve um erro na listagem das categorias");
                res.render('admin/categorias');
            });
        });

    //local para adicionar novas categorias
        router.get('/categorias/add', (req, res) => {
            res.render('admin/addCategorias');
        });
    //salvar categorias
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

    //pagina que é possivel editar as categorias
        router.get('/categorias/edit/:id', (req, res) => {
            Categoria.findOne({_id:req.params.id}).then((categoria) => {
                res.render('admin/editCategorias', {categoria: categoria});
            }).catch((err) => {
                req.flash('error_msg', "Esta categoria não existe");
                res.redirect('/admin/categorias');
            });
        });

    //rota onde é enviado a edição da categoria para o servidor
        router.post('/categorias/edit', (req, res) => {
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
                Categoria.findOne({_id:req.body.id}).then((categoria) => {
                    res.render('admin/editCategorias', {erros: erros, categoria: categoria});
                }).catch((err) => {
                    req.flash('error_msg', 'Erro na alteração de dados');
                    res.redirect('/admin/categorias');
                });
                
            } else{
                Categoria.findOne({_id:req.body.id}).then((categoria) => {
                    categoria.nome = req.body.nome;
                    categoria.slug = req.body.slug;

                    categoria.save().then(() => {
                        req.flash('success_msg', 'Os dados foram alterados com sucesso');
                        res.redirect('/admin/categorias');
                    }).catch((err) => {
                        req.flash('error_msg', 'Houve um erro no momento de salvar a alteração');
                        res.redirect('/admin/categorias');
                    });
                }).catch((err) => {
                    req.flash('error_msg', 'Erro na alteração de dados');
                    res.redirect('/admin/categorias');
                });
            };
        });

    //rota onde a categoria é deletada do servidor
        router.post('/categorias/delet', (req, res) => {
            Categoria.deleteOne({_id: req.body.id}).then(() => {
                req.flash('success_msg','A categoria foi deletada com sucesso');
                res.redirect('/admin/categorias');
            }).catch((err) => {
                req.flash('error_msg', 'Houve um erro ao deletar a categoria!');
                res.redirect('/admin/categorias');
            });
        });

//POSTAGENS
    //pagina onde sera exibida todas as postagens ja criadas
        router.get('/postagens', (req, res) => {
            res.render("admin/postagens")
        });
    //pagina para criar postagem
        router.get('/postagens/add', (req, res) => {
            Categoria.find().then((categorias) => {
                 res.render("admin/addPostagem", {categorias: categorias});
            }).catch((err) => {
                req.flash('error_msg', 'Houve um erro na hora de carregar o formulario');
                res.redirect('/admin/postagens')
            });
    });
    //rota para salvar postagens
        router.post('/postagens/nova', (req, res) => {
            let erros = [];

            if(erros.length > 0){
                res.render('admin/addCategorias', {erros: erros});
            } else{
                const novaPostagem = {
                    titulo: req.body.titulo,
                    slug: req.body.slug,
                    descricao: req.body.descricao,
                    conteudo: req.body.conteudo,
                    categoria: req.body.categoria
                };
            
                new Postagem(novaPostagem).save().then(() => {
                    req.flash("success_msg", "Postagem criada com sucesso");
                    res.redirect('/admin/postagens')
                }).catch((err) => {
                    req.flash("error_msg", `Houve um erro na hora da criação da postagem  ERRO: ${err}`);
                    res.redirect('/admin/postagens')
                });
            };
        });
module.exports = router;

