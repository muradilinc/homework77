import { Notation } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { createNotation, getNotations } from './notationThunk';

interface NotationState {
  notations: Notation[];
  getNotationsLoading: boolean;
  createNotationLoading: boolean;
}

const initialState: NotationState = {
  notations: [],
  getNotationsLoading: false,
  createNotationLoading: false,
};

export const notationSlice = createSlice({
  name: 'notation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNotations.pending, (state) => {
      state.getNotationsLoading = true;
    });
    builder.addCase(getNotations.fulfilled, (state, {payload: notations}) => {
      state.getNotationsLoading = false;
      state.notations = notations;
    });
    builder.addCase(getNotations.rejected, (state) => {
      state.getNotationsLoading = false;
    });
    builder.addCase(createNotation.pending, (state) => {
      state.createNotationLoading = true;
    });
    builder.addCase(createNotation.fulfilled, (state) => {
      state.createNotationLoading = false;
    });
    builder.addCase(createNotation.rejected, (state) => {
      state.createNotationLoading = false;
    });
  },
});

export const notationReducer = notationSlice.reducer;
export const selectNotations = (state: RootState) => state.notation.notations;
export const selectGetNotationsLoading = (state: RootState) => state.notation.getNotationsLoading;
export const selectCreateNotationLoading = (state: RootState) => state.notation.createNotationLoading;