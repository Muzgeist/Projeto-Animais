const express = require('express');
const router  = express.Router();
const db      = require('../config/db');
const { autenticar } = require('../middlewares/authMiddleware');

// POST /api/interesses — adotante demonstra interesse
router.post('/', autenticar, async (req, res) => {
    const { animal_id } = req.body;
    const usuario_id    = req.usuario.id;

    if (req.usuario.tipo === 'ong') {
        return res.status(403).json({ erro: 'ONGs não podem demonstrar interesse em adoção.' });
    }
    if (!animal_id) {
        return res.status(400).json({ erro: 'animal_id é obrigatório.' });
    }

    try {
        // Verifica se já existe interesse pendente/aprovado deste usuário para este animal
        const [existente] = await db.query(
            "SELECT id FROM interesses WHERE usuario_id = ? AND animal_id = ? AND status != 'recusado'",
            [usuario_id, animal_id]
        );
        if (existente.length > 0) {
            return res.status(409).json({ erro: 'Você já demonstrou interesse neste animal.' });
        }

        await db.query(
            'INSERT INTO interesses (usuario_id, animal_id) VALUES (?, ?)',
            [usuario_id, animal_id]
        );

        // Muda status do animal para em_processo
        await db.query(
            "UPDATE animais SET status = 'em_processo' WHERE id = ?",
            [animal_id]
        );

        return res.status(201).json({ mensagem: 'Interesse registrado com sucesso.' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ erro: 'Erro interno no servidor.' });
    }
});

module.exports = router;
