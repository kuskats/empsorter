import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import EmployeeTable from "../components/EmployeeTable";
import { RootState } from "../store/store";
import { selectFilteredEmployees } from "../store/selectors";

jest.mock("../store/selectors", () => ({
  selectFilteredEmployees: jest.fn(),
}));

const mockEmployees = [
  {
    id: 1,
    name: "Иван",
    role: "Повар",
    phone: "+7 (123) 456-7890",
    birthday: "01.01.1990",
    isArchive: false,
  },
  {
    id: 2,
    name: "Петр",
    role: "Официант",
    phone: "+7 (987) 654-3210",
    birthday: "02.02.1992",
    isArchive: true,
  },
];

const mockStore = (initialState: Partial<RootState>) =>
  configureStore({
    reducer: {
      employees: (state = initialState.employees) => state,
    },
  });

describe("EmployeeTable", () => {
  const onEdit = jest.fn();

  beforeEach(() => {
    (selectFilteredEmployees as unknown as jest.Mock).mockReturnValue(
      mockEmployees
    );
  });

  it("рендерит данные сотрудников", () => {
    const store = mockStore({
      employees: {
        data: mockEmployees,
        loading: false,
        error: null,
        filters: { role: null, isArchive: false },
        sort: { field: "name", order: "asc" },
      },
    });
    render(
      <Provider store={store}>
        <EmployeeTable onEdit={onEdit} />
      </Provider>
    );
    expect(screen.getByText("Иван")).toBeInTheDocument();
    expect(screen.getByText("Петр")).toBeInTheDocument();
  });

  it("вызывает onEdit при клике на строку", () => {
    const store = mockStore({
      employees: {
        data: mockEmployees,
        loading: false,
        error: null,
        filters: { role: null, isArchive: false },
        sort: { field: "name", order: "asc" },
      },
    });
    render(
      <Provider store={store}>
        <EmployeeTable onEdit={onEdit} />
      </Provider>
    );
    fireEvent.click(screen.getByText("Иван"));
    expect(onEdit).toHaveBeenCalledWith(1);
  });

  it("показывает loading при загрузке", () => {
    const store = mockStore({
      employees: {
        data: [],
        loading: true,
        error: null,
        filters: { role: null, isArchive: false },
        sort: { field: "name", order: "asc" },
      },
    });
    render(
      <Provider store={store}>
        <EmployeeTable onEdit={onEdit} />
      </Provider>
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
