import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import EmployeeForm from "../components/EmployeeForm";

const mockStore = configureStore({
  reducer: {
    employees: (
      state = { data: [], loading: false, error: null, filters: {}, sort: {} }
    ) => state,
  },
});

jest.mock("../store/reducers", () => ({
  addEmployee: jest.fn(),
  updateEmployee: jest.fn(),
}));

describe("EmployeeForm", () => {
  const onClose = jest.fn();

  it("рендерит форму с пустыми полями для добавления", () => {
    render(
      <Provider store={mockStore}>
        <EmployeeForm isOpen={true} onClose={onClose} />
      </Provider>
    );
    expect(screen.getByLabelText("Имя")).toHaveValue("");
    expect(screen.getByLabelText("Должность")).toHaveValue("Повар");
  });

  it("показывает ошибки валидации при некорректных данных", () => {
    render(
      <Provider store={mockStore}>
        <EmployeeForm isOpen={true} onClose={onClose} />
      </Provider>
    );
    fireEvent.click(screen.getByText("Сохранить"));
    expect(screen.getByText("Имя обязательно")).toBeInTheDocument();
    expect(screen.getByText("Формат: +7 (XXX) XXX-XXXX")).toBeInTheDocument();
    expect(screen.getByText("Формат: DD.MM.YYYY")).toBeInTheDocument();
  });

  test("корректно отправляет форму", async () => {
    render(
      <Provider store={mockStore}>
        <EmployeeForm isOpen={true} onClose={onClose} />
      </Provider>
    );
    const phoneInput = screen.getByLabelText("Телефон") as HTMLInputElement;
    const birthdayInput = screen.getByLabelText(
      "Дата рождения"
    ) as HTMLInputElement;
    const saveButton = screen.getByText("Сохранить");

    fireEvent.input(phoneInput, { target: { value: "+7 (123) 456-7890" } });
    fireEvent.input(birthdayInput, { target: { value: "01.01.1990" } });

    await waitFor(() => {
      expect(phoneInput.value).toBe("+7 (123) 456-7890");
      expect(birthdayInput.value).toBe("01.01.1990");
    });

    fireEvent.click(saveButton);
  });
});
