const MOVIE = require('../modules/moviesschema');
const express = require('express');
const router = express.Router();

// Middleware for parsing JSON in the request body
router.use(express.json());

// Get all cards
const getmovies = async (req, res) => {
  try {
    const allCard = await MOVIE.find();
    res.json(allCard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get cards one by one
const getByname = async (req, res) => {
  try {
    const oneCard = await MOVIE.findOne({ title: req.params.name });
    res.json(oneCard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Creation of movie cards
const postmovie = async (req, res) => {
  try {
    const movieCard = await MOVIE.create(req.body);
    res.status(200).json({ msg: 'Data created', movie: movieCard });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Create a list of movies
const postListMovie = async (req, res) => {
  try {
    const movieCards = await MOVIE.create(req.body);
    res.status(200).json({ msg: 'Data created', movies: movieCards });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Delete one card
const deletemovie = async (req, res) => {
  const personIdToDelete = req.params.id;

  try {
    const result = await MOVIE.findByIdAndRemove(personIdToDelete);

    if (result) {
      res.status(200).json({
        message: `Person with ID '${personIdToDelete}' deleted successfully`,
      });
    } else {
      res.status(404).json({ message: 'No matching record found for deletion' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete multiple cards
const deleteManyMovies = async (req, res) => {
  try {
    const movieTitlesToDelete = req.body;

    // Use deleteMany to delete movies with matching titles
    const result = await MOVIE.deleteMany({ title: { $in: movieTitlesToDelete } });

    res.status(200).json({
      message: `${result.deletedCount} movies deleted successfully`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update movie
const updatemovie = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'ID is required' });
    }

    const card = await MOVIE.findById(id);

    if (!card) {
      return res.status(404).json({ error: 'Person not found' });
    }

    // Assuming req.body contains the fields you want to update
    const updatedCard = await MOVIE.findByIdAndUpdate(id, req.body, { new: true });

    res.json({ msg: 'Person updated successfully', updatedCard });
  } catch (error) {
    console.error('Error updating person:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
// update all movies
const updatMultipulemovie = async (req, res) => {
  try {
    const updates = req.body;

    if (!updates || !Array.isArray(updates)) {
      return res.status(400).json({ error: 'Invalid update data' });
    }

    const updateResults = [];

    for (const update of updates) {
      const { id, updateData } = update;

      if (!id) {
        return res.status(400).json({ error: 'ID is required' });
      }

      const card = await MOVIE.findById(id);

      if (!card) {
        updateResults.push({ id, error: 'Movie not found' });
      } else {
        const { title, rating, MovieGenre } = updateData;

        // Use updateMany to update all movies with the specified title
        const result = await MOVIE.updateMany(
          { title: card.title },
          { $set: { title, rating, MovieGenre } }
        );

        updateResults.push({ id, updatedCount: result.nModified });
      }
    }

    res.json({
      msg: 'Movies updated successfully',
      updateResults,
    });
  } catch (error) {
    console.error('Error updating movies:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



module.exports = { getmovies, updatemovie, deletemovie, postmovie, getByname, postListMovie ,deleteManyMovies,updatMultipulemovie };

