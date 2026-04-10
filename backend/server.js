require('dotenv').config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ROTAS
const animalRoutes   = require("./routes/animalRoutes");
const authRoutes     = require("./routes/authRoutes");
const userRoutes     = require("./routes/userRoutes");
const interesseRoutes = require("./routes/interesseRoutes");

app.use("/api/animais",    animalRoutes);
app.use("/api",            authRoutes);       // POST /api/register  e  POST /api/login
app.use("/api",            userRoutes);       // GET  /api/perfil
app.use("/api/interesses", interesseRoutes);  // POST /api/interesses

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});