const UserModel = require('../models/userModel');

async function getPerfil(req, res) {
  try {
    const usuario = await UserModel.findById(req.usuario.id);
    if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado.' });
    return res.json(usuario);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro interno no servidor.' });
  }
}

module.exports = { getPerfil };
