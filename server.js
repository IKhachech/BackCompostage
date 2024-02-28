const express = require('express');

const mongoose = require('mongoose');

const Continent = require('./models/continent');

const bodyParser = require('body-parser');

const app = express()
  
  

app.use(bodyParser.urlencoded({ extended: false}));

//parse app/json
app.use(bodyParser.json());



app.get("/continent/:nom/dechets_3D", async (req, res) => {
  try {
    const { nom } = req.params;
    const continent = await Continent.findOne({ nom });

    if (!continent) {
      return res.status(404).send("Continent non trouvé");
    }

    const dechetsAzote = continent.dechets_riches_en_azote.map(dechet => ({
      nom: dechet.nom,
      lien_3D: dechet.lien_3D
    }));

    const dechetsCarbone = continent.dechets_riches_en_carbone.map(dechet => ({
      nom: dechet.nom,
      lien_3D: dechet.lien_3D
    }));

    res.json({ 
      dechets_riches_en_azote: dechetsAzote,
      dechets_riches_en_carbone: dechetsCarbone
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur serveur");
  }
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
      // Validate the request body data (optional)
      if (!req.body.nom || !req.body.id || !req.body.model || !req.body.Richesse) {
        return res.status(400).send({ message: 'Missing required fields in request body' });
      }
  
      // Create a new continent with input data
      const nouveauContinent = new Continent({
        nom: req.body.nom,
        id: req.body.id,
        model: req.body.model,
        Richesse: req.body.Richesse,
      });
  
      // Save the new continent to the database
      await nouveauContinent.save();
  
      // Send a success response
      res.send({ message: 'Nouveau continent ajouté avec succès' });
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'Erreur ajout du continent' });
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