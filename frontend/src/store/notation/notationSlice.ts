import { Notation } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getNotations } from './notationThunk';

interface NotationState {
  notations: Notation[];
  getNotationsLoading: boolean;
}

const initialState: NotationState = {
  notations: [],
  getNotationsLoading: false,
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
  },
});

export const notationReducer = notationSlice.reducer;
export const selectNotations = (state: RootState) => state.notation.notations;
export const selectGetNotationsLoading = (state: RootState) => state.notation.notations;