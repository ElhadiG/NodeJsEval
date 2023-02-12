const express = require('express')
const router= express.Router()
const combatController= require("../controller/combat_controller")

router.get("/pokedex/combat",combatController.getByType);

router.get("/pokedex/combat/:id", combatController.getTypeById);

router.put("/pokedex/combat/:id", combatController.updateData);

router.delete("/pokedex/combat/:id", combatController.DeleteById);

router.post("/pokedex/combat",combatController.CreateData);

router.get("/pokedex/combat/search/:name",combatController.getTypeByName)


module.exports = router;