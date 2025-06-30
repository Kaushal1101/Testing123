import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {createMovie} from '../features/movies/movieSlice'

function MovieForm() {
    const [text, setText] = useState('')

    const dispatch = useDispatch()
    
    const onSubmit = (e) => {
        e.preventDefault()

        console.log('createMovie: ', createMovie)
        dispatch(createMovie({ text }))
        console.log('E')
        setText('')
    } 

    return (
    <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <label htmlFor='text'>Movie</label>
            <input
                type = 'text'
                name = 'text'
                id = 'text'
                value = {text}
                onChange = {(e) => setText(e.target.value)}
             />
          </div>
          <div className="form-group">
            <button className="btn btn-block" type='submit'>
                Add Movie
            </button>
          </div>
        </form>
    </section>
  )
}

export default MovieForm