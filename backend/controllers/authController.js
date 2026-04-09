const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');

const JWT_SECRET = process.env.JWT_SECRET || 'segredo_dev';
const SALT_ROUNDS = 10;

async function register(req, res) {
  try {
    const { tipo, nome, email, endereco, telefone, senha } = req.body;

    if (!tipo || !nome || !email || !endereco || !telefone || !senha) {
      return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
    }
    if (!['ong', 'adotante'].includes(tipo)) {
      return res.status(400).json({ erro: 'Tipo inválido.' });
    }

    const existente = await UserModel.findByEmail(email);
    if (existente) {
      return res.status(409).json({ erro: 'Email já cadastrado.' });
    }

    const senhaHash = await bcrypt.hash(senha, SALT_ROUNDS);
    const id = await UserModel.create({ tipo, nome, email, endereco, telefone, senhaHash });

    return res.status(201).json({ mensagem: 'Cadastro realizado com sucesso.', id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro interno no servidor.' });
  }
}

async function login(req, res) {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ erro: 'Email e senha são obrigatórios.' });
    }

    const usuario = await UserModel.findByEmail(email);
    if (!usuario) {
      return res.status(401).json({ erro: 'Credenciais inválidas.' });
    }

    const senhaOk = await bcrypt.compare(senha, usuario.senha);
    if (!senhaOk) {
      return res.status(401).json({ erro: 'Credenciais inválidas.' });
    }

    const token = jwt.sign(
      { id: usuario.id, tipo: usuario.tipo, nome: usuario.nome },
      JWT_SECRET,
      { expiresIn: '8h' }
    );

    return res.json({ token, tipo: usuario.tipo, nome: usuario.nome });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro interno no servidor.' });
  }
}

module.exports = { register, login };
