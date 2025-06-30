import { useDispatch } from 'react-redux'
import { deleteMovie } from '../features/movies/movieSlice'

// Takes in a movie to display
function MovieItem({ movie }) {
  const dispatch = useDispatch()

  // Essentially handles how the movie is rendered
  // Should be able to add CSS here to improve upon it
  return (
    <div className='movie'>
      <div>{new Date(movie.createdAt).toLocaleString('en-US')}</div>
      <h2>{movie.text}</h2>
      <button onClick={() => dispatch(deleteMovie(movie._id))} className='close'>
        X
      </button>
    </div>
  )
}

export default MovieItem