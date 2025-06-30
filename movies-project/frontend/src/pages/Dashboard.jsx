import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import MovieForm from '../components/MovieForm'
import MovieItem from '../components/MovieItem'
import Spinner from '../components/Spinner'
import { getMovies, reset } from '../features/movies/movieSlice'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Basically gets us the required states from the global state
  const { user } = useSelector((state) => state.auth)
  const {movies, isLoading, isError, message} = useSelector((state) => state.movies)


  // Is triggered when a page is loaded
  // Decided where to take user (login or dashboard)
  useEffect(() => {
    if (!user) {
      navigate('/login')
    } else {
      dispatch(getMovies())
    }

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, dispatch]) 

  // Added this error handling seperately due to infinite loop issue
  // Ideally can be combined with useEffect above
  useEffect(() => {
    if(isError) {
      console.log(message)
    }
  }, [isError, message])


  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Your Movies</p>
      </section>

      <MovieForm />

      <section className='content'>
        {movies.length > 0 ? (
          <div className='movies'>
            {movies.map((movie) => (
              <MovieItem key={movie._id} movie={movie} />
            ))}
          </div>
        ) : (
          <h3>You have not added any movies</h3>
        )}
      </section>
    </>
  )
}

export default Dashboard