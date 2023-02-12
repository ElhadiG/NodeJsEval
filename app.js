//Déclarer constante qui contiendra l'import du module express
const express = require('express');
//declarer constante qui contiendra l'import du module body-parser
const bodyParser = require('body-parser');
//declarer constante qui contiendra l'import du module fs
const fs = require('fs');
// On déclare une constante qui lance une fonction express() qui crée une application express
const app= express();
const spectreRoute = require('./src/routes/spectre_route');
const feuRoute= require("./src/routes/feu_route")
const eauRoute= require("./src/routes/eau_route")
const planteRoute= require("./src/routes/plante_route")
const combatRoute= require("./src/routes/combat_route")
const electriqueRoute= require("./src/routes/electrique_route")
app.use(bodyParser.json())
//definir la route qui doit recuperer la methode GET vers le fichier pokedex.json
//ex:http://localhost:3000/
app.get('/',(request,response) =>{
    response.send("Oue Oue")
})
app.use(electriqueRoute)
app.use(spectreRoute)
app.use(eauRoute)
app.use(feuRoute)
app.use(planteRoute)
app.use(combatRoute)
app.get('/', (request, response)=>{
    response.send("On est la")
}
)
//récuperer id par une route défini
//ex:http://localhost:3000/Spectre/2
//on exporte la constante du port choisi
    module.exports=app;