import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./components/App";

import configureStore from "./redux/configureStore";
import { Provider as ReduxProvider } from "react-redux";

const store = configureStore();
render(
  <ReduxProvider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ReduxProvider>,
  document.getElementById("app")
);

//store authentication tokens in sessionStorage
//sessionStorage.setItem("token", keycloak.token);
//sessionStorage.setItem("refreshToken", keycloak.refreshToken);
