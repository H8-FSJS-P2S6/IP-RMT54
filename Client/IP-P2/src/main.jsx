import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {Provider} from "react-redux"
import stores from "./stores/index.js"
// import './index.css'
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={stores}>
      <App />
    </Provider>
  </StrictMode>
);
