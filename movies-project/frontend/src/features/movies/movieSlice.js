import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import movieService from './movieService'

const initialState = {
    movies: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Create movie function
export const createMovie = createAsyncThunk('movies/create', 
    async (movieData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await movieService.createMovie(movieData, token)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Get user movies
export const getMovies = createAsyncThunk('movies/getAll', 
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await movieService.getMovies(token)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Delete user movie
export const deleteMovie = createAsyncThunk(
    'movies/delete',
    async (id, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await movieService.deleteMovie(id, token)
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
  )

export const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {
        reset: (state) => {
            state.movies = []
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        }
    }, 

    extraReducers: (builder) => {
        builder
            .addCase(createMovie.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createMovie.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                // Addd the movie to movies list for that user
                state.movies.push(action.payload)
            })
            .addCase(createMovie.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getMovies.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getMovies.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.movies = action.payload
            })
            .addCase(getMovies.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteMovie.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteMovie.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                // Filters out all movies that got deleted temporarily
                // If page is reloaded, getMovies will be called and it will be gone entirely
                // Happens since it's removed from backend, but not React store, so we need to filter out manually
                state.movies = state.movies.filter((movie) => movie._id !== action.payload.id)
            })
            .addCase(deleteMovie.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            
    }
})

export const {reset} = movieSlice.actions
export default movieSlice.reducer
