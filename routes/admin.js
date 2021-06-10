const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('pagina admin');
});

router.get('/posts', (req, res) => {
    res.send('pagina de posts');
});

router.get('/categorias', (req, res) => {
    res.send('pagina de adicionar categorias')
})

module.exports = router;