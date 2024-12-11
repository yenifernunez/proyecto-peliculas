const express = require('express');
const router = express.Router();
const Pelicula = require('../models/modes.pelicula');

// Crear una película
router.post('/crear', async (req, res) => {
  try {
    const nuevaPelicula = new Pelicula(req.body);
    const peliculaGuardada = await nuevaPelicula.save();
    res.status(201).json(peliculaGuardada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener todas las películas
router.get('/traer', async (req, res) => {
  try {
    const peliculas = await Pelicula.find();
    res.status(200).json(peliculas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener una película por ID
router.get('/:id', async (req, res) => {
  try {
    const pelicula = await Pelicula.findById(req.params.id);
    if (!pelicula) return res.status(404).json({ error: 'Película no encontrada' });
    res.status(200).json(pelicula);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar una película
router.put('/:id', async (req, res) => {
  try {
    const peliculaActualizada = await Pelicula.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!peliculaActualizada) return res.status(404).json({ error: 'Película no encontrada' });
    res.status(200).json(peliculaActualizada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar una película
router.delete('/:id', async (req, res) => {
  try {
    const peliculaEliminada = await Pelicula.findByIdAndDelete(req.params.id);
    if (!peliculaEliminada) return res.status(404).json({ error: 'Película no encontrada' });
    res.status(200).json({ message: 'Película eliminada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
