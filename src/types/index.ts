//база сотрудника
export interface Employee {
  id: number;
  name: string;
  isArchive: boolean;
  role: string;
  phone: string;
  birthday: string;
}
 
export interface EmployeeState {
  data: Employee[];
  loading: boolean;
  error: string | null | undefined;
}

export const initialEmployeeState: EmployeeState = {
  data: [], 
  loading: false,
  error: null,
};

//интерфейс для фильтров и сортировки
export interface Filters {
  role: string | null;
  isArchive: boolean;
}
export interface SortOptions {
  field: "name" | "birthday";
  order: "asc" | "desc";
}

//глобальный стейт приложения
export interface AppState {
  employees: EmployeeState;
  filters: Filters;
  sort: SortOptions;
}

//базовые фильтры и сортировка
export const initialFilters: Filters = {
  role: null,
  isArchive: false,
};
export const initialSort: SortOptions = {
  field: "name",
  order: "asc",
};

//функция для перевода должности, можно было и без стандартизации
export const translateRole = (role: string): string => {
  const cleanedRole = role.trim().toLowerCase();
  const roleMap: Record<string, string> = {
    driver: "Водитель",
    cook: "Повар",
    waiter: "Официант",
  };
  const translatedRole = roleMap[cleanedRole] || cleanedRole;
  return translatedRole.charAt(0).toUpperCase() + translatedRole.slice(1);
};