const mongoose = require('mongoose');

const typesDeDechets = ['Déchets ménagers', 'Déchets agricoles', 'Déchets industriels','Déchets médicaux'];
const traitements = ['Compostage', 'Incinération', 'Décharge', 'Recyclage'];

const continentSchema = mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },

  types_de_dechets: {
    type: [String],
    enum: typesDeDechets,
    required: true,
  },

  traitements: {
    type: [String],
    enum: traitements,
    required: true,
  },

  dechets_riches_en_azote: [
    {
      nom: {
        type: String,
        required: true,
      },
      lien_3D: {
        type: String,
        required: true,
      },
    },
  ],

  dechets_riches_en_carbone: [
    {
      nom: {
        type: String,
        required: true,
      },
      lien_3D: {
        type: String,
        required: true,
      },
    },
  ],
});

const Continent = mongoose.model('continent', continentSchema);

module.exports = Continent;
