const express = require('express');
const router = express.Router();
const planteController= require("../controller/plante_controller")

router.get("/pokedex/plante",planteController.getByType);

router.get("/pokedex/plante/:id",planteController.getTypeById);

router.put("/pokedex/plante/:id",planteController.updateData);

router.delete("/pokedex/plante/:id",planteController.DeleteById);

router.post("/pokedex/plante",planteController.CreateData);

router.get("/pokedex/eau/search/:name",planteController.getTypeByName)


module.exports = router;