const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "", // ou sua senha se tiver configurado
    database: "projeto_animais"
});

module.exports = connection;