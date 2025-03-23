import { selectFilteredEmployees } from '../selectors/index';
import { RootState } from '../store';

describe('selectFilteredEmployees', () => {
  const employees = [
    { id: 1, name: 'Алексей', role: 'Повар', phone: '', birthday: '01.01.1990', isArchive: false },
    { id: 2, name: 'Борис', role: 'Официант', phone: '', birthday: '02.02.1992', isArchive: true },
    { id: 3, name: 'Виктор', role: 'Повар', phone: '', birthday: '03.03.1993', isArchive: false },
  ];

  it('должен фильтровать по роли', () => {
    const state: RootState = {
      employees: {
        data: employees,
        loading: false,
        error: null,
        filters: { role: 'Повар', isArchive: false },
        sort: { field: 'name', order: 'asc' },
      },
    };
    const filtered = selectFilteredEmployees(state);
    expect(filtered).toHaveLength(2);
    expect(filtered[0].name).toBe('Алексей');
    expect(filtered[1].name).toBe('Виктор');
  });

  it('должен фильтровать по статусу архива', () => {
    const state: RootState = {
      employees: {
        data: employees,
        loading: false,
        error: null,
        filters: { role: null, isArchive: true },
        sort: { field: 'name', order: 'asc' },
      },
    };
    const filtered = selectFilteredEmployees(state);
    expect(filtered).toHaveLength(1);
    expect(filtered[0].name).toBe('Борис');
  });

  it('должен сортировать по имени по возрастанию', () => {
    const state: RootState = {
      employees: {
        data: employees,
        loading: false,
        error: null,
        filters: { role: null, isArchive: false },
        sort: { field: 'name', order: 'asc' },
      },
    };
    const filtered = selectFilteredEmployees(state);
    expect(filtered[0].name).toBe('Алексей');
    expect(filtered[1].name).toBe('Виктор');
  });

  it('должен сортировать по дате рождения по убыванию', () => {
    const state: RootState = {
      employees: {
        data: employees,
        loading: false,
        error: null,
        filters: { role: null, isArchive: false },
        sort: { field: 'birthday', order: 'desc' },
      },
    };
    const filtered = selectFilteredEmployees(state);
    expect(filtered[0].name).toBe('Виктор');
    expect(filtered[1].name).toBe('Алексей');
  });
});