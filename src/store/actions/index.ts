import { createAsyncThunk } from '@reduxjs/toolkit';
import { Employee} from '../../types';

export const fetchEmployees = createAsyncThunk(
  'employees/fetchAll', 
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/data/employees.json'); //посместил employees.json в public для симуляции API запроса
      return await response.json() as Employee[];
    } catch (error) {
      //хендлер ошибки
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);