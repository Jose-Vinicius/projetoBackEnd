const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('admin/index');
});

router.get('/posts', (req, res) => {
    res.send('pagina de posts');
});

//exibição das categorias todas juntas
router.get('/categorias', (req, res) => {
    res.render('admin/categorias')
});
//local para adicionar novas categorias
router.get('/categoria/add', (req, res) => {
    res.render('admin/addCategorias')
});
//local para ?
router.get('/categoria/nova', (req, res) => {
    res.render('admin/novaCategoria')
});

module.exports = router;