import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Employee, SortOptions } from '../../types';

//селекторы для получения данных из стейта
export const selectEmployees = (state: RootState) => state.employees.data;
//селекторы для получения статуса загрузки 
export const selectEmployeesLoading = (state: RootState) => state.employees.loading;
//селекторы для получения ошибки
export const selectEmployeesError = (state: RootState) => state.employees.error;

//селектор для фильтрации и сортировки сотрудников по должности и архивности
export const selectFilteredEmployees = createSelector(
  [
    selectEmployees, 
    (state: RootState) => state.employees.filters, 
    (state: RootState) => state.employees.sort, 
  ],
  (employees, filters, sort) => {
    const { role, isArchive } = filters;
    const { field, order } = sort;

    const filtered = employees.filter(emp => {
      const roleMatch = role ? emp.role === role : true;
      const archiveMatch = isArchive ? emp.isArchive : !emp.isArchive;
      return roleMatch && archiveMatch;
    });

    return sortEmployees(filtered, { field, order });
  }
);

//функция для сортировки сотрудников по имени и др
const sortEmployees = (employees: Employee[], sort: SortOptions): Employee[] => {
  if (!sort.field) return [...employees]; 

  return [...employees].sort((a, b) => {
    if (sort.field === 'name') {
      return sort.order === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }

    const dateA = parseDateString(a.birthday);
    const dateB = parseDateString(b.birthday);
    return sort.order === 'asc'
      ? dateA.getTime() - dateB.getTime()
      : dateB.getTime() - dateA.getTime();
  });
};

//парсер даты в обхект date
const parseDateString = (dateStr: string): Date => {
  const [day, month, year] = dateStr.split('.');
  return new Date(`${year}-${month}-${day}`);
};