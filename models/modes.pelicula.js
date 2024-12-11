const mongoose = require('mongoose');

const PeliculaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  director: { type: String, required: true },
  genero: { type: String, required: true },
  anioEstreno: { type: Number, required: true },
});

module.exports = mongoose.model('Pelicula', PeliculaSchema);

