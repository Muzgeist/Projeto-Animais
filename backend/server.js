const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ROTAS
const animalRoutes = require("./routes/animalRoutes");

app.use("/api/animais", animalRoutes);

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});