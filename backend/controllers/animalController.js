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

async function buscarAnimalPorId(req, res) {
    try {
        const { id } = req.params;
        const [rows] = await db.promise().query(`
            SELECT 
                a.*,
                u.nome AS ong_nome,
                TIMESTAMPDIFF(MONTH, a.data_nascimento, CURDATE()) AS idade_meses,
                (
                    SELECT url 
                    FROM imagens_animais 
                    WHERE animal_id = a.id 
                    LIMIT 1
                ) AS foto_url
            FROM animais a
            JOIN usuarios u ON a.ong_id = u.id
            WHERE a.id = ?
        `, [id]);

        if (rows.length === 0) {
            return res.status(404).json({ erro: "Animal não encontrado" });
        }

        const animal = rows[0];
        const meses = animal.idade_meses;
        if (meses !== null && meses !== undefined) {
            if (meses < 3)       animal.faixa_etaria = 'filhote';
            else if (meses < 12) animal.faixa_etaria = 'jovem';
            else if (meses < 84) animal.faixa_etaria = 'adulto';
            else                 animal.faixa_etaria = 'idoso';
        }

        res.json(animal);

    } catch (error) {
        console.error("Erro ao buscar animal:", error);
        res.status(500).json({ erro: "Erro ao buscar animal" });
    }
}

module.exports = {
    listarAnimais,
    buscarAnimalPorId
};