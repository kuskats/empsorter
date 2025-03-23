import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import App from "./App";

describe("App", () => {
  it('рендерит HomePage по пути "/"', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText("Список сотрудников")).toBeInTheDocument();
  });
});
