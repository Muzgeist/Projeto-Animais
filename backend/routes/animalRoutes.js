const express = require('express');
const router = express.Router();
const { listar, detalhe, cadastrar } = require('../controllers/animalController');
const { autenticar, apenasOng } = require('../middlewares/authMiddleware');

router.get('/', listar);
router.get('/:id', detalhe);
router.post('/', autenticar, apenasOng, cadastrar);

module.exports = router;
