const db = require('../config/db');

const AnimalModel = {
  async findAll(filters = {}) {
    let query = `
      SELECT a.*, u.nome AS ong_nome,
        TIMESTAMPDIFF(MONTH, a.data_nascimento, CURDATE()) AS idade_meses
      FROM animais a
      JOIN usuarios u ON a.ong_id = u.id
      WHERE 1=1
    `;
    const params = [];

    if (filters.status) {
      query += ' AND a.status = ?';
      params.push(filters.status);
    }
    if (filters.especie) {
      query += ' AND a.especie = ?';
      params.push(filters.especie);
    }
    if (filters.ong_id) {
      query += ' AND a.ong_id = ?';
      params.push(filters.ong_id);
    }

    query += ' ORDER BY a.criado_em DESC';

    const [rows] = await db.query(query, params);
    return rows.map(calcularFaixaEtaria);
  },

  async findById(id) {
    const [rows] = await db.query(
      `SELECT a.*, u.nome AS ong_nome,
        TIMESTAMPDIFF(MONTH, a.data_nascimento, CURDATE()) AS idade_meses
       FROM animais a
       JOIN usuarios u ON a.ong_id = u.id
       WHERE a.id = ?`,
      [id]
    );
    return rows[0] ? calcularFaixaEtaria(rows[0]) : null;
  },

  async create({ nome, especie, raca, data_nascimento, descricao, ong_id }) {
    const [result] = await db.query(
      'INSERT INTO animais (nome, especie, raca, data_nascimento, descricao, ong_id) VALUES (?, ?, ?, ?, ?, ?)',
      [nome, especie, raca || null, data_nascimento || null, descricao || null, ong_id]
    );
    return result.insertId;
  },

  async updateStatus(id, status) {
    await db.query('UPDATE animais SET status = ? WHERE id = ?', [status, id]);
  },
};

// Calcula faixa etária dinamicamente — nunca armazenada
function calcularFaixaEtaria(animal) {
  const meses = animal.idade_meses;
  let faixa_etaria = null;

  if (meses !== null && meses !== undefined) {
    if (meses < 3) faixa_etaria = 'filhote';
    else if (meses < 12) faixa_etaria = 'jovem';
    else if (meses < 84) faixa_etaria = 'adulto';
    else faixa_etaria = 'idoso';
  }

  return { ...animal, faixa_etaria };
}

module.exports = AnimalModel;
