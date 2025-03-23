import fetchMock from 'jest-fetch-mock';
import { fetchEmployees } from '.';
import { store } from '../store';

fetchMock.enableMocks();

describe('fetchEmployees', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('диспатчит fulfilled с данными сотрудников', async () => {
    const mockData = [{ id: 1, name: 'Илья', role: 'Водитель', phone: '+7 (883) 508-3269', birthday: '12.02.1982', isArchive: false }];
    fetchMock.mockResponseOnce(JSON.stringify(mockData));
    await store.dispatch(fetchEmployees());
    const state = store.getState();
    expect(state.employees.data).toEqual(mockData);
    expect(state.employees.loading).toBe(false);
  });

  it('диспатчит rejected при ошибке', async () => {
    fetchMock.mockRejectOnce(new Error('Rejected'));
    await store.dispatch(fetchEmployees());
    const state = store.getState();
    expect(state.employees.error).toBe('Rejected');
  });
});