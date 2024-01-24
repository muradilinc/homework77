import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../http/axiosApi';
import { NewNotation, Notation } from '../../types';

export const createNotation = createAsyncThunk<void, NewNotation>(
  'notation/create',
  async (notation) => {
    const formData = new FormData();
    formData.append('message', notation.message);

    if (notation.author) {
      formData.append('author', notation.author);
    }

    if (notation.image) {
      formData.append('image', notation.image);
    }

    await axiosApi.post('/notations', formData);
  },
);

export const getNotations = createAsyncThunk<Notation[]>(
  'notation/getAll',
  async () => {
    const response = await axiosApi.get<Notation[]>('/notations');
    if (!response) {
      return [];
    }

    return response.data;
  },
);