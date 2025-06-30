import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import journalReducer from '../features/journals/journalSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    journals: journalReducer
  },
  devTools: process.env.NODE_ENV !== 'production',
});
