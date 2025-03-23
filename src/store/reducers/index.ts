import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Employee, Filters, SortOptions, initialFilters, initialSort, initialEmployeeState } from '../../types';
import { fetchEmployees } from '../actions';
import { translateRole } from '../../types'

//стоковый стейт
const initialState = {
  ...initialEmployeeState,
  filters: initialFilters,
  sort: initialSort,
};

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    //редюсер для фильтров
    setFilters(state, action: PayloadAction<Filters>) {
      state.filters = action.payload;
    },
    //редюсер для сортировки
    setSort(state, action: PayloadAction<SortOptions>) {
      state.sort = action.payload;
    },
    //редюсер для добавления сотрудника
    addEmployee(state, action: PayloadAction<Employee>) {
      const normalizedEmployee = {
        ...action.payload,
        role: translateRole(action.payload.role), 
      };
      state.data.push(normalizedEmployee);
    },
    //редюсер для редактирования сотрудника
    updateEmployee(state, action: PayloadAction<Employee>) {
      const index = state.data.findIndex(emp => emp.id === action.payload.id);
      if (index !== -1) {
        const normalizedEmployee = {
          ...action.payload,
          role: translateRole(action.payload.role), 
        };
        state.data[index] = normalizedEmployee;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.map((emp) => ({
          ...emp,
          role: translateRole(emp.role), 
        }));
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addEmployee, updateEmployee, setSort, setFilters } = employeesSlice.actions;

export default employeesSlice.reducer;