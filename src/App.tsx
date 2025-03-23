import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import HomePage from "./pages/HomePage";
import "./styles/App.scss";

//рендер, раутинг предусмотрен
const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
