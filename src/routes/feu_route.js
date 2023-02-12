const express = require('express');
const router = express.Router();
const feuController= require("../controller/feu_controller")

router.get("/pokedex/feu",feuController.getByType);

router.get("/pokedex/feu/:id",feuController.getTypeById);

router.put("/pokedex/feu/:id",feuController.updateData);

router.delete("/pokedex/feu/:id",feuController.DeleteById);

router.post("/pokedex/feu",feuController.CreateData);

router.get("/pokedex/combat/search/:name",feuController.getTypeByName)


module.exports = router;