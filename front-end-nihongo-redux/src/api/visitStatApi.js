import { handleResponse, handleError } from "./apiUtils";
import { REACT_APP_API_URL } from "./apiConstants";
const baseUrl = REACT_APP_API_URL + "/visitStats/";

export function getVisitStats() {
  return fetch(baseUrl + "all", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  })
    .then(handleResponse)
    .catch(handleError);
}

export function saveVisitStat(visitstat) {
  const method = "POST"; // POST for create.
  let url = baseUrl + "create";
  console.log({ ...visitstat });
  return fetch(url, {
    method: method, // POST for create, PUT to update when id already exists.
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      ...visitstat,
    }),
  })
    .then(handleResponse)
    .catch(handleError);
}
