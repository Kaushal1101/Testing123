// This file sets up the redux store for the entire react app
// Essentially the place where the app state lives

// Configure store is a helper function that automatically adds useful middleware and simplifies 
// store setup 
import { configureStore } from '@reduxjs/toolkit';

// Imports authReducer from authSlice
import authReducer from '../features/auth/authSlice'

// Import movie reducer from movieSlice
import movieReducer from '../features/movies/movieSlice'

// For our main app, whenver something affects authentication, authReducer is called 
// to decide how it's handled
export const store = configureStore({
  reducer: {
    auth: authReducer,
    movies: movieReducer
  },
});
