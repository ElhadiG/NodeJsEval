const fs = require('fs');

exports.getByType= (request,response)=>{
    //readFile pour lire le fichier
    fs.readFile("./src/model/pokedex.json",(err,data)=>{
        //message d'erreur+status(500)
    if(err){
        response.status(500).json({
            message:"erreur fichier introuvable",
            error:err
        })//sinon status ok avec le contenu du fichier
        }else{
            response.status(200).json(JSON.parse(data).electrique)
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
            const data_name=manip_data.electrique.find(
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
exports.getTypeById= (request,response)=>{
    fs.readFile("./src/model/pokedex.json",(err,data)=>{
        //si erreur = message d'erreur+status(500)
        if(err){
            response.status(500).json({
                message:"erreur id introuvable",
                error:err
            })
            //sinon
        }else{
            //transforme la data du fichier en JSON
            const manip_data=JSON.parse(data);
            //recherche dans le fichier si l'id passé en param et present
            const data_id=manip_data.electrique.find(
                (obj)=> obj.id === parseInt(request.params.id)
            )
            if(data_id){
                //renvoyez le status 200(ok) plus le contenu du fichier
                response.status(200).json(data_id)
            }
            else{
                //renvoyez message d'erreur +status (404)
                response.status(404).json({
                    message:"id pas présent dans le fichier",
                    error:err
                })
            }
        }
    })
}
exports.updateData=(request,response)=>{
    fs.readFile("./src/model/pokedex.json",(err,data)=>{
        if (err){
            response.status(500).json({
                message:"erreur fichier introuvable",
                error:err
            })
        }else{
            //stock des données existantes
            const existing_data=JSON.parse(data);
            const data_id=existing_data.electrique.find(
                (obj)=> obj.id === parseInt(request.params.id)
            )
            if(!data_id){
                response.status(404).json({
                    message:"aucun objet trouvé avec cet id",
                    error:err
                })
            }else{
                data_id.name=request.body.name;
                fs.writeFile("./src/model/pokedex.json", JSON.stringify(existing_data),(writeErr)=>{
                    if(writeErr){
                        response.status(500).json({
                            message:"erreur lors de la réecriture veuillez réessayez",
                            error:err
                        })
                    }else{
                        response.status(200).json({
                            message:" réecriture reussie"
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
            message:"Erreur lors de la lecture du fichier",
            error:err
        })
    } else {
        //stocker les données qui existent
        const existing_data=JSON.parse(data);
        //rechercher via l'id si le parametre est bien present
        const data_id=existing_data.electrique.find(
            //find recupere et retourne le premier element du tableau qui est vrai pour la condition passée en param 
            // cela va chercher dans l'url si le numero passée en param est un id d'un objet contenu dans le tableau 
        (obj)=> obj.id === parseInt(request.params.id)
        )//si on ne trouve pas l'objet avec l'id 
        if(!data_id){
            //message erreur +status 404
            response.status(404).json({
                message:"aucun objet avec cet id",
                error:err
            })
        }   else{
            existing_data.electrique=existing_data.electrique.filter(
                (obj)=>obj.id != parseInt(request.params.id))
                //filtre le fichier et reecrit avec le param null
                fs.writeFile("./src/model/pokedex.json",JSON.stringify(existing_data),
                (writeErr)=>{
                    //si erreur reponse 500 avec message
                    if(writeErr){
                        response.status(500).json({
                            message:"erreur lors de la suppression",
                            error:err
                        })
                    }   else{
                        response.status(200).json({
                            message:"SIUppression réussie!",
                            error:err
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
            //renvoie status d'erreur 500 + message d'erreur
            response.status(500).json({
                message:"Erreur lecture",
                error: err
            })
        } else {
            //transforme la data en JSON 
            const existing_data= JSON.parse(data);
            //enregistre le tableau electrique seulement
            const dataID = existing_data.electrique
            //crée un tableau d'objet id grace a map  
            const Tri= dataID.map((obj)=> obj.id)
            //math.max prend l'id le plus grand 
            const lastData= Math.max(...Tri)
            //je rajoute +1 a la valeur de l'id stocké
            const LastId= lastData+1
            // const tri=
            //rajouter cette donnée a partir de ce qu'on a ecrit dans le body
            existing_data.electrique.push({
            "id":LastId,
            "name": request.body.name,
            "numero": request.body.numero
            });
            //réecrit le fichier stringify
            fs.writeFile("./src/model/pokedex.json",JSON.stringify(existing_data),(writeErr)=>{
                if(writeErr){
                    response.status(500).json({
                        message:"Erreur lors de l'ecriture",
                        error: err
                    })
                } else{
                    response.status(200).json({
                    message:"data ajoutée avec succes, Siuper"
                    })
                }
            })
        }
    })
}