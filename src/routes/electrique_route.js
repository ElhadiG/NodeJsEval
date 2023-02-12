const express = require('express');
const router = express.Router();
const electriqueController= require("../controller/electrique_controller")

router.get("/pokedex/electrique",electriqueController.getByType);

router.get("/pokedex/electrique/:name",electriqueController.getTypeById);

router.put("/pokedex/electrique/:id",electriqueController.updateData);

router.delete("/pokedex/electrique/:id",electriqueController.DeleteById);

router.post("/pokedex/electrique",electriqueController.CreateData);

router.get("/pokedex/electrique/search/:name",electriqueController.getTypeByName)


module.exports = router;