import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../http/axiosApi';
import { Notation } from '../../types';

export const getNotations = createAsyncThunk(
  'notation/getAll',
  async () => {
    const response = await axiosApi.get<Notation[]>('/notations');
    if (!response) {
      return [];
    }

    return response.data;
  },
);