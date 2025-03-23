import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../store/store";
import HomePage from "../pages/HomePage";

describe("HomePage", () => {
  it('открывает модальное окно при клике на "Добавить сотрудника"', () => {
    render(
      <Provider store={store}>
        <HomePage />
      </Provider>
    );
    fireEvent.click(screen.getByText("Добавить сотрудника"));
    expect(screen.getByLabelText("Имя")).toBeInTheDocument();
  });
});
