const express = require('express');
const router = express.Router();
const eauController= require("../controller/eau_controller")

router.get("/pokedex/eau",eauController.getByType);

router.get("/pokedex/eau/:id",eauController.getTypeById);

router.put("/pokedex/eau/:id",eauController.updateData);

router.delete("/pokedex/eau/:id",eauController.DeleteById);

router.post("/pokedex/eau",eauController.CreateData);

router.get("/pokedex/eau/search/:name",eauController.getTypeByName)

module.exports = router;