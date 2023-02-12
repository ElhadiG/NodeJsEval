
const app= require('./app')

const port = 3000


app.listen(port, () => {
    // On lancera une chaine de caractères en terminal pour avoir un retour pour être sure que tout fonctionne
    console.log("L'application tourne sur le port " + port)
})