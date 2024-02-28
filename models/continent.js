const mongoose = require('mongoose');
const { IntType } = require('three');

const continentSchema = mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  id: {
  type: Number,
  required: true,
  },
  nom: {
  type: String,
  required: true,
 },
	model:{
  type: String,
  required: true,
    },
  Richesse: {
  type: String,
  required: true,
    }, 
});

const Continent = mongoose.model('continent', continentSchema);

module.exports = Continent;
