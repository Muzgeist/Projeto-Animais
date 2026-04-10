const db = require("../config/db");

async function listarAnimais(req, res) {
    try {
        const [rows] = await db.promise().query(`
            SELECT 
                a.id,
                a.nome,
                a.especie,
                a.raca,
                a.data_nascimento,
                a.status,
                a.destaque,

                u.nome AS ong_nome,

                (
                    SELECT url 
                    FROM imagens_animais 
                    WHERE animal_id = a.id 
                    LIMIT 1
                ) AS imagem

            FROM animais a
            JOIN usuarios u ON a.ong_id = u.id
            WHERE a.status = 'disponivel'
        `);

        res.json(rows);

    } catch (error) {
        console.error("Erro ao buscar animais:", error);
        res.status(500).json({ erro: "Erro ao buscar animais" });
    }
}

module.exports = {
    listarAnimais
};