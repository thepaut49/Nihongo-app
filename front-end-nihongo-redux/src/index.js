import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./components/App";
import Keycloak from "keycloak-js";

let keycloak = Keycloak("/keycloak.json");

//Initialization of the keycloak instance
keycloak
  .init({
    onLoad: "check-sso",
    silentCheckSsoRedirectUri:
      window.location.origin + "/silent-check-sso.html",
    pkceMethod: "S256",
  })
  .then((authenticated) => {
    console.log(authenticated);
    const authentify = sessionStorage.getItem("authentify");
    if (authenticated) {
      ReactDOM.render(<App />, document.getElementById("app"));
    } else if (authentify) {
      keycloak.login();
    } else {
      ReactDOM.render(<App />, document.getElementById("app"));
    }

    //store authentication tokens in sessionStorage
    sessionStorage.setItem("token", keycloak.token);
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
