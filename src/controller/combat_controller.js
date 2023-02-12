const fs= require('fs')

exports.getByType=(request,response)=>{
    //utilisation de readFile pour lire le fichier
    fs.readFile('./src/model/pokedex.json',(err,data)=>{
        //si erreur
        if(err){
            //renvoie erreur + message
            response.status(500).json({
                message:"Erreur sur le chemin du fichier",
                error:err
            })
        }else{
            response.status(200).json(JSON.parse(data).combat)
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
            const data_name=manip_data.combat.find(
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
exports.getTypeById=(request, response) =>{
    //utiliser readFile pour lire fichier pokedex
    fs.readFile('./src/model/pokedex.json',(err,data)=>{
        if(err){
            //renvoie erreur + message
            response.status(500).json({
                message:"erreur sur la recherche d'id",
                error:err
            })
            //sinon
        }else{
            //transformer la data en JSON 
            const manip_data=JSON.parse(data);
            //recherche dans le fichier si l'id de la route est bien presente sur la route
            const data_id=manip_data.combat.find(
                (obj)=> obj.id=== parseInt(request.params.id)
            )
        //si on trouve l'id
        if (data_id){
            //renvoyez status ok plus contenu
            response.status(200).json(data_id)
        }
        else{
            //renvoyez un message d'erreur (404)
            response.status(404).json({
                message:"id non trouvé",
                error:err
                })
            }
        }
    })
}
exports.updateData=(request,response)=>{
    //Lecture fichier pokedex
    fs.readFile("./src/model/pokedex.json",(err,data)=>{
        //condition si erreur
        if(err){
            //affichage de l'erreur et du message
            response.status(500).json({
                message:"erreur de la lecture ",
                error:err
            })
        }else{
            //stocker les données qui existent
            const existing_data=JSON.parse(data);
            //rechercher via l'id si le parametre est bien present
            const data_id=existing_data.combat.find(
                //find recupere et retourne le premier element du tableau qui est vrai pour la condition passée en param 
                // cela va chercher dans l'url si le numero passée en param est un id d'un ojbet contenu dans le tableau 
            (obj)=> obj.id=== parseInt(request.params.id)
            )//si on ne trouve pas l'objet avec l'id 
            if(!data_id){
                //renvoie message d'erreur + (404)
                response.status(404).json({
                    message:"aucun objet avec cet id ",
                    error:err
                })//sinon on trouve l'objet
            } else{
                //La nouvee donnée sera la requete executé dans le body thunder
                data_id.name=request.body.name;
                //réecriture des données avec la nouvelle donnée 
                fs.writeFile("./src/model/pokedex.json",JSON.stringify(existing_data),(writeErr)=>{
                    //si erreur reponse 500 avec message 
                if (writeErr){
                    response.status(500).json({
                        message:"erreur lors de la réecriture réessaie!",
                        error:err
                    })
                }   else{
                    response.status(200).json({
                        message:"Réecriture reussie!"
                    })
                    }
                })
            }
        }
    })
}
exports.DeleteById=(request,response)=>{
    //Lecture fichier pokedex
    fs.readFile("./src/model/pokedex.json",(err,data)=>{
        if(err){
            //affichage de l'erreur et du message 
            response.status(500).json({
                message:"erreur lors de la lecture du fichier ",
                error:err
            })
        } else{
            //stocker les données existantes
            const existing_data=JSON.parse(data);
            //rechercher bia l'id si le param est present
            const data_id=existing_data.combat.find(
                (obj)=> obj.id=== parseInt(request.params.id)
            )
            if(!data_id){
                response.status(404).json({
                    message:"aucun objet avec cet id ",
                    error:err
                })
            }else{
                existing_data.combat=existing_data.combat.filter(
                    (obj)=>obj.id != parseInt(request.params.id))
                    fs.writeFile("./src/model/pokedex.json",JSON.stringify(existing_data),
                    (writeErr)=>{
                            if(writeErr){
                                response.status(500).json({
                                    message:"erreur lors de la suppression!",
                                    error:err
                                })
                            } else{
                                response.status(200).json({
                                    message:"Siuppression reussie!!"
                        })
                    }
                })
            }
        }
    })
}
exports.CreateData=(request,response)=>{
    fs.readFile("./src/model/pokedex.json",(err,data)=>{
        if(err){
            response.status(500).json({
                message:"erreur lecture",
                error:err
            })
        } else{
            const existing_data=JSON.parse(data);
            //enregistre le tableau combat seulement
            const dataID = existing_data.combat
            //crée un tableau d'objet id grace a map  
            const Tri= dataID.map((obj)=> obj.id)
            //math.max prend l'id le plus grand 
            const lastData= Math.max(...Tri)
            //je rajoute +1 a la valeur de l'id stocké
            const LastId= lastData+1
            // const tri=
            //rajouter cette donnée a partir de ce qu'on a ecrit dans le body
            existing_data.combat.push({
            "id":LastId,
            "name": request.body.name,
            "numero": request.body.numero
            })
            existing_data.combat.push(request.body);
            fs.writeFile("./src/model/pokedex.json",JSON.stringify(existing_data),(writeErr)=>{
                if(writeErr){
                    response.status(500).json({
                        message:"erreur lors de l'ecriture",
                        error:err
                    })
                }else{
                    response.status(200).json({
                        message:"Data Ajoutée vous avez reussi!"
                    })
                }
            })
        }
    })
}