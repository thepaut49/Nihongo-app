import { handleResponse, handleError } from "./apiUtils";
import { REACT_APP_API_URL } from "./apiConstants";
const baseUrl = REACT_APP_API_URL + "/api/auth/";

export function login(username, password) {
  return fetch(baseUrl + "signin", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  })
    .then(handleResponse)
    .catch(handleError);
}
