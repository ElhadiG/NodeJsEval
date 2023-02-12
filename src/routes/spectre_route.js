const express = require('express');
const router = express.Router();
const spectreController= require("../controller/spectre_controller")

router.get("/pokedex/spectre",spectreController.getByType);

router.get("/pokedex/spectre/:id",spectreController.getTypeById);

router.put("/pokedex/spectre/:id",spectreController.updateData);

router.delete("/pokedex/spectre/:id",spectreController.DeleteById);

router.post("/pokedex/spectre",spectreController.CreateData);

router.get("/pokedex/combat/search/:name",spectreController.getTypeByName)


module.exports = router;