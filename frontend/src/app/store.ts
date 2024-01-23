import { configureStore } from '@reduxjs/toolkit';
import { notationReducer } from '../store/notation/notationSlice';

export const store = configureStore({
  reducer: {
    notation: notationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;