import { handleResponse, handleError } from "./apiUtils";
import { REACT_APP_API_URL } from "./apiConstants";
const baseUrl = REACT_APP_API_URL + "/messages/";

export function getMessages() {
  return fetch(baseUrl + "all", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  })
    .then(handleResponse)
    .catch(handleError);
}

export function saveMessage(message) {
  const method = "POST"; // POST for create.
  let url = baseUrl + "create";
  return fetch(url, {
    method: method, // POST for create, PUT to update when id already exists.
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      ...message,
    }),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteMessage(messageId) {
  return fetch(baseUrl + messageId, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  })
    .then((response) => {
      if (!response.ok) throw new Error("Network response was not ok.");
      return response.text;
    })
    .catch(handleError);
}
