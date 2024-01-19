import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import captionReducer from '../features/post/postSlice'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    caption: captionReducer
  },
});
