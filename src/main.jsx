import { StrictMode } from "react";
import ReactDom from "react-dom/client";
import { ThroughProvider } from "react-through";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store, persistor } from "./app/store";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

ReactDom.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <BrowserRouter>
          <ThroughProvider>
            <App />
          </ThroughProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);
