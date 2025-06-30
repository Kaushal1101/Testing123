const express = require('express')
const router = express.Router()

// Import all the functions we need from the controller file
const { getMovies, setMovies, updateMovies, deleteMovies } = require('../controller/movieController')

// Import authorization function protect
// Added to all CRUD functions, to ensure user can only edit their own movies
const {protect} = require('../middleware/authMiddleware')


// CRUD calls, functions defined in the movieController file to abstract away 

// This is NOT performing two functions together, it's the same as
// router.get('/', getMovies)
// router.post('/', setMovies)
router.route('/').get(protect, getMovies).post(protect, setMovies)

// Update and Delete requires id of movie that needs to be accessed, hence the /:id
router.route('/:id').put(protect, updateMovies).delete(protect, deleteMovies)


module.exports = router