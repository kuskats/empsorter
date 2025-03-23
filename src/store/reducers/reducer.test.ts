import employeesReducer, { setFilters, setSort, addEmployee, updateEmployee } from '.';
import { fetchEmployees } from '../actions';
import { Employee, Filters, SortOptions, initialEmployeeState, initialFilters, initialSort } from '../../types';

interface EmployeesState {
  data: Employee[];
  loading: boolean;
  error: string | null;
  filters: Filters;
  sort: SortOptions;
}

const initialState: EmployeesState = {
  ...initialEmployeeState,
  filters: initialFilters,
  sort: initialSort,
  error: null,
};

describe('employees reducer', () => {
  it('должен обрабатывать setFilters', () => {
    const newFilters: Filters = { role: 'Повар', isArchive: true };
    const newState = employeesReducer(initialState, setFilters(newFilters));
    expect(newState.filters).toEqual(newFilters);
  });

  it('должен обрабатывать setSort', () => {
    const newSort: SortOptions = { field: 'birthday', order: 'desc' };
    const newState = employeesReducer(initialState, setSort(newSort));
    expect(newState.sort).toEqual(newSort);
  });

  it('должен добавлять сотрудника через addEmployee', () => {
    const newEmployee: Employee = {
      id: 1,
      name: 'Иван',
      role: 'driver',
      phone: '+7 (123) 456-7890',
      birthday: '01.01.1990',
      isArchive: false,
    };
    const newState = employeesReducer(initialState, addEmployee(newEmployee));
    expect(newState.data).toHaveLength(1);
    expect(newState.data[0]).toEqual({ ...newEmployee, role: 'Водитель' }); 
  });

  it('должен обновлять сотрудника через updateEmployee', () => {
    const employee: Employee = {
      id: 1,
      name: 'Иван',
      role: 'Повар',
      phone: '+7 (123) 456-7890',
      birthday: '01.01.1990',
      isArchive: false,
    };
    const stateWithEmployee: EmployeesState = {
      ...initialState,
      data: [employee],
    };
    const updatedEmployee: Employee = { ...employee, name: 'Петр', role: 'waiter' };
    const newState = employeesReducer(stateWithEmployee, updateEmployee(updatedEmployee));
    expect(newState.data[0].name).toBe('Петр');
    expect(newState.data[0].role).toBe('Официант'); 
  });

  it('должен устанавливать loading при fetchEmployees.pending', () => {
    const newState = employeesReducer(initialState, fetchEmployees.pending(''));
    expect(newState.loading).toBe(true);
    expect(newState.error).toBe(null);
  });

  it('должен обновлять данные при fetchEmployees.fulfilled', () => {
    const fetchedEmployees: Employee[] = [
      {
        id: 1,
        name: 'Илья',
        role: 'driver',
        phone: '+7 (883) 508-3269',
        birthday: '12.02.1982',
        isArchive: false,
      },
    ];
    const newState = employeesReducer(initialState, fetchEmployees.fulfilled(fetchedEmployees, ''));
    expect(newState.loading).toBe(false);
    expect(newState.data).toEqual([{ ...fetchedEmployees[0], role: 'Водитель' }]); 
  });

  it('должен устанавливать ошибку при fetchEmployees.rejected', () => {
    const errorMessage = 'Network error';
    const action = {
      type: fetchEmployees.rejected.type,
      error: { message: errorMessage },
    };
    const newState = employeesReducer(initialState, action);
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(errorMessage);
  });
});