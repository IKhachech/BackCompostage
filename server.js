const express = require('express');

const mongoose = require('mongoose');

const Continent = require('./models/continent');

const bodyParser = require('body-parser');

const app = express()

import { FBXLoader } from '@loaders.gl/fbx';

const loader = new FBXLoader();

  
  

app.use(bodyParser.urlencoded({ extended: false}));

//parse app/json
app.use(bodyParser.json());



app.get('/model.fbx', (req, res) => {
    // Charger le modèle FBX
    const model = new THREE.FBXLoader().load('model.fbx');
  
    // Créer une scène et une caméra
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1100);
  
    // Ajouter le modèle à la scène
    scene.add(model);
  
    // Positionner la caméra
    camera.position.z = 500;
  
    // Créer un rendu
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
  
    // Ajouter le rendu à la page
    document.body.appendChild(renderer.domElement);
  
    // Animer la scène
    function animate() {
      requestAnimationFrame(animate);
  
      renderer.render(scene, camera);
    }
  
    animate();
  
    // Envoyer le modèle à la réponse
    res.send(model);
  });


app.get('/continents', async(req,res)=>{
  try{  
await Continent.find({}).then(resultat=>{
     res.send(resultat)
});
  }catch (err){
    console.log(err);
  }

});

app.get("/continents/:nom", async (req, res) => {
    try {
      const continent = await Continent.findOne({ nom: req.params.nom });
      if (!continent) {
        res.status(404).send("Continent non trouvé");
      } else {
        res.send(continent);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Erreur serveur");
    }
  });
  


app.post('/ajouterContinent', async (req, res) => {
    try {
        // Récupération des données du corps de la requête
        const { nom, types_de_dechets, traitements, dechets_riches_en_azote, dechets_riches_en_carbone } = req.body;
    
        // Création d'un nouveau continent
        const nouveauContinent = new Continent({
          nom,
          types_de_dechets,
          traitements,
          dechets_riches_en_azote,
          dechets_riches_en_carbone,
        });
  
      // Enregistrement du nouveau continent dans la base de données
      await nouveauContinent.save();
  
      // Envoi d'une réponse de succès
      res.send({ message: "Nouveau continent ajouté avec succès" });
    } catch (err) {
      console.log(err);
    }
  });
  
     


mongoose.connect("mongodb+srv://imenekhachech:imene7530khachech@cluster0.adv5y50.mongodb.net/MyData?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

const PORT = process.env.PORT || 5000
app.listen(5000,()=>console.log("serveur en marche"))

// mongodb+srv://imenekhachech:<password>@cluster0.adv5y50.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0