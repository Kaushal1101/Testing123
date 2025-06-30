import axios from 'axios'

const API_URL = '/api/movies/'

// Create a movie
const createMovie = async (movieData, token) => {
  // config is an options object passed to the axios request
  // It sets the request header to include the JWT token
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

    const response = await axios.post(API_URL, movieData, config)

    return response.data    
}

// Get movies
const getMovies = async (token) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

    const response = await axios.get(API_URL, config)
    return response.data    
}

// Delete Movie
const deleteMovie = async (id, token) => {
  const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

  // Remember for delete, we need url and id of movie deleted
  const response = await axios.delete(API_URL + id, config)

  return response.data    
}

const movieService = {
    createMovie,
    getMovies,
    deleteMovie
}

export default movieService