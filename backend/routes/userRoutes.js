const express = require('express');
const router = express.Router();
const { getPerfil } = require('../controllers/userController');
const { autenticar } = require('../middlewares/authMiddleware');

router.get('/perfil', autenticar, getPerfil);

module.exports = router;
