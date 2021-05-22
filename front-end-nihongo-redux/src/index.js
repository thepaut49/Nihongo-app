import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./components/App";
import Keycloak from "keycloak-js";
import configureStore from "./redux/configureStore";
import { Provider as ReduxProvider } from "react-redux";

//Get the keycloak configuration
let keycloak = Keycloak("/keycloak.json");

//Initialization of the keycloak instance
keycloak
  .init({ onLoad: "login-required" })
  .then((authenticated) => {
    console.log(keycloak);
    console.log(authenticated);
    // console.log(getState().keycloakLogin);
    if (!authenticated) {
      window.location.reload();
    } else {
      console.info("Authenticated");
    }

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
    sessionStorage.setItem("authentication", keycloak.token);
    sessionStorage.setItem("refreshToken", keycloak.refreshToken);

    //to regenerate token on expiry
    setTimeout(() => {
      keycloak
        .updateToken(70)
        .then((refreshed) => {
          if (refreshed) {
            console.debug("Token refreshed" + refreshed);
          } else {
            console.warn(
              "Token not refreshed, valid for " +
                Math.round(
                  keycloak.tokenParsed.exp +
                    keycloak.timeSkew -
                    new Date().getTime() / 1000
                ) +
                " seconds"
            );
          }
        })
        .catch(() => {
          console.error("Failed to refresh token");
        });
    }, 60000);
  })
  .catch(() => {
    console.error("Authenticated Failed");
  });
