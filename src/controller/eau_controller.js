const fs = require('fs');


exports.getByType=(request,response) => {
    //Utiliser methode readFile du module fs pour lire le fichier
    fs.readFile("./src/model/pokedex.json",(err,data) =>{
        //condition si erreur
        if (err){
            // renvoie status 500 + message d'erreur
            response.status(500).json({
                message:"Erreur mec",
                error: err
            });
            // sinon envoie contenu du fichier avc status 200
        } else {
                response.status(200).json(JSON.parse(data).eau)
            }
    })
}
exports.getTypeByName=(request, response) =>{
    //utiliser readFile pour lire fichier pokedex
    fs.readFile('./src/model/pokedex.json',(err,data)=>{
        if(err){
            //renvoie erreur + message
            response.status(500).json({
                message:"erreur sur la recherche du name",
                error:err
            })
            //sinon
        }else{
            //transformer la data en JSON 
            const manip_data=JSON.parse(data);
            //recherche dans le fichier si le name de la route est bien presente sur la route
            const data_name=manip_data.eau.find(
                (obj)=> obj.name=== request.params.name
            )
        //si on trouve le name
        if (data_name){
            //renvoyez status ok plus contenu
            response.status(200).json(data_name)
        }
        else{
            //renvoyez un message d'erreur (404)
            response.status(404).json({
                message:"name non trouvé",
                error:err
                })
            }
        }
    })
}
exports.getTypeById=(request,response) =>{
    //lecture du fichier pokedex.json 
  fs.readFile("./src/model/pokedex.json",(err,data)=>{
        //condition si erreur
        if (err){
            // renvoie status 500 + message d'erreur
            response.status(500).json({
                message:"Erreur pas trouvé d'id",
                error: err
            })
        }   //sinon
            else{
                //transforme la data en jSON manipulable 
                const manip_data= JSON.parse(data);
                //Recherche dans le fichier si l'id de la route est présente dans le fichier
                const data_id= manip_data.eau.find(
                    (obj) => obj.id === parseInt(request.params.id)
                )
                //si on trouve cet id
                if (data_id){
                    //renvoi la reponse avec un status 200 et l'objet
                    response.status(200).json(data_id)
                }
                else{
                    //sinon renvoie un status 404
                    response.status(404).json({
                        message:"id non trouvé avec cet objet",
                        error:err
                    })
                }
        }
    })
}

exports.updateData= (request, response) => {
    // Lecture du fichier 
    fs.readFile("./src/model/pokedex.json", (err,data)=>{
        // Condition erreur de lecture (500)
        if (err) {
            // Afficher message et erreur
            response.status(500).json({
                message : "Erreur de lecture, Oh no",
                error: err,
            })
            // Sinon
        } else {
            // Stocker les données existantes
        const existing_data = JSON.parse(data);
        // Rechercher via l'id si parametre existant
        const data_id = existing_data.eau.find(
            //find recupere et retourne le premier element du tableau qui retourne true pour la condition passée en param
            // ca va chercher dans mon url si le numero passé en param est un id d'un objet contenu dans le tableau
        (obj) => obj.id === parseInt(request.params.id)
        );
        // condition si on trouve pas l'objet avec l'id
        if (!data_id) {
            // Reponse avec statut erreur 404
        response.status(404).json({
            // Message erreur recherche 
        message: "Aucun objet avec cet id ! WHY?",
        error: err,
        })
        // 'Sinon' on trouve l'objet donc ->
    } else {
        // La nouvelle donnée sera la requete executée dans le body thunder 
        data_id.name=request.body.name;
        // Réecriture de la donnée et sauvegarde
        fs.writeFile("./src/model/pokedex.json", JSON.stringify(existing_data),(writeErr) => {
        // Si Erreur reponse 500 avec message
        if (writeErr) {
            response.status(500).json({
                message: "Erreur lors de la réecriture try again !",
                error: err
            })
            // sinon status 200 succes message 
        } else {
            response.status(200).json({
                message: "Réecriture accomplie avec succès, Pouf!"
            })
        }
    })
        }
    }
})
}
exports.DeleteById=(request, response)=>{
    //lecture du fichier
    fs.readFile("./src/model/pokedex.json",(err,data)=>{
    if (err){  //si erreur renvoie status 500 + message d'erreur
        response.status(500).json({
            message:"Erreur lors de la lecture ",
            error:err
        })
        
    }   else{
        //stocker les données existantes
            const existing_data=JSON.parse(data);
            //chercher la donnée avec l'id passé en param
            const data_id= existing_data.eau.find(
                (obj) => obj.id === parseInt(request.params.id)
            );
        if(!data_id){
            //Erreur 404+ message d'erreur
            response.status(404).json({
                message:"id non trouvé avec cet objet",
                error:err
            })
    }   else{
            //Réassigne la donnée existante avec le param null pour ecrasé
            existing_data.eau=existing_data.eau.filter(
                (obj)=> obj.id != parseInt(request.params.id));
            //filtre le fichier et réecrit avec le param null
            fs.writeFile("./src/model/pokedex.json",JSON.stringify(existing_data),
                (writeErr)=>{
                    if (writeErr) {
                        //si erreur renvoie status 500 + message d'erreur
                        response.status(500).json({
                            message:"Erreur lors de la suppression",
                            error:err
                        })
                    }   else {
                        //sinon status 200+message reussite
                            response.status(200).json({
                                message:"SIUpression reussie"
                        })
                    }
                })
            }
        }
    })
}
exports.CreateData=(request,response)=> {
    //lecture du fichier
    fs.readFile("./src/model/pokedex.json",(err,data)=>{
        if(err){
            //renvoie status 500 + message d'erreur
            response.status(500).json({
                message:"Erreur lecture",
                error: err
            })
        } else {
            //transforme la data en JSON manipulable
            const existing_data= JSON.parse(data);
            //enregistre le tableau eau seulement
            const dataID = existing_data.eau
            //crée un tableau d'objet id grace a map  
            const Tri= dataID.map((obj)=> obj.id)
            //math.max prend l'id le plus grand 
            const lastData= Math.max(...Tri)
            //je rajoute +1 a la valeur de l'id stocké
            const LastId= lastData+1
            // const tri=
            //rajouter cette donnée a partir de ce qu'on a ecrit dans le body
            existing_data.eau.push({
            "id":LastId,
            "name": request.body.name,
            "numero": request.body.numero
            })
            //rajouter cette donnée a partir de ce qu'on a ecrit dans le body
            existing_data.eau.push(request.body);
            //réecrit le fichier stringify
            fs.writeFile("./src/model/pokedex.json",JSON.stringify(existing_data),(writeErr)=>{
                if(writeErr){
                    response.status(500).json({
                        message:"Erreur lors de l'ecriture",
                        error: err
                    })
            } else{
                response.status(200).json({
                    message:"data ajoutée avec succes, Yay"
                    })
                }
            })
        }
    })
}