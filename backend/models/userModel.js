const db = require('../config/db');

const UserModel = {
  async findByEmail(email) {
    const [rows] = await db.promise().query('SELECT * FROM usuarios WHERE email = ?', [email]);
    return rows[0] || null;
  },

  async findById(id) {
    const [rows] = await db.promise().query(
      'SELECT id, tipo, nome, email, endereco, telefone, criado_em FROM usuarios WHERE id = ?',
      [id]
    );
    return rows[0] || null;
  },

  async create({ tipo, nome, email, endereco, telefone, senhaHash }) {
    const [result] = await db.promise().query(
      'INSERT INTO usuarios (tipo, nome, email, endereco, telefone, senha) VALUES (?, ?, ?, ?, ?, ?)',
      [tipo, nome, email, endereco, telefone, senhaHash]
    );
    return result.insertId;
  },
};

module.exports = UserModel;
