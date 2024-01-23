import { Notation } from '../../types';
import { createSlice } from '@reduxjs/toolkit';

interface NotationState {
  notations: Notation[];
}

const initialState: NotationState = {
  notations: [],
};

export const notationSlice = createSlice({
  name: 'notation',
  initialState,
  reducers: {},
  extraReducers: () => {},
});

export const notationReducer = notationSlice.reducer;