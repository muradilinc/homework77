import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../http/axiosApi';
import { NewNotation, Notation } from '../../types';

export const createNotation = createAsyncThunk<void, NewNotation>(
  'notation/create',
  async (notation) => {
    const formData = new FormData();
    formData.append('message', notation.message);
    if (notation.image && notation.author) {
      formData.append('image', notation.image);
      formData.append('author', notation.author);
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