import "./App.css";
import App from "./App.jsx";
import store from "./store/index.js";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Toaster />
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
