const AnimalModel = require('../models/animalModel');

async function listar(req, res) {
  try {
    const { status, especie } = req.query;
    const animais = await AnimalModel.findAll({ status, especie });
    return res.json(animais);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro interno no servidor.' });
  }
}

async function detalhe(req, res) {
  try {
    const animal = await AnimalModel.findById(req.params.id);
    if (!animal) return res.status(404).json({ erro: 'Animal não encontrado.' });
    return res.json(animal);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro interno no servidor.' });
  }
}

async function cadastrar(req, res) {
  try {
    const { nome, especie, raca, data_nascimento, descricao } = req.body;

    if (!nome || !especie) {
      return res.status(400).json({ erro: 'Nome e espécie são obrigatórios.' });
    }

    const id = await AnimalModel.create({
      nome, especie, raca, data_nascimento, descricao,
      ong_id: req.usuario.id,
    });

    return res.status(201).json({ mensagem: 'Animal cadastrado com sucesso.', id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro interno no servidor.' });
  }
}

module.exports = { listar, detalhe, cadastrar };
