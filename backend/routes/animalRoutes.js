const express = require("express");
const router = express.Router();

const { listarAnimais, buscarAnimalPorId } = require("../controllers/animalController");

router.get("/", listarAnimais);
router.get("/:id", buscarAnimalPorId);

module.exports = router;