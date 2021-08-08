import { handleResponse, handleError } from "./apiUtils";
import { REACT_APP_API_URL } from "./apiConstants";
const baseUrl = REACT_APP_API_URL + "/sentences/";

export function getSentences() {
  return fetch(baseUrl + "all")
    .then(handleResponse)
    .catch(handleError);
}

export function getSentenceByKanjis(kanjis) {
  return fetch(baseUrl + "findByKanjis/" + kanjis)
    .then(handleResponse)
    .catch(handleError);
}

export function saveSentence(sentence) {
  const method = sentence.id ? "PUT" : "POST"; // POST for create, PUT to update when id already exists.
  let url = baseUrl;
  if (method === "POST") {
    url = url + "create";
  } else {
    url = url + sentence.id;
  }
  return fetch(url, {
    method: method, // POST for create, PUT to update when id already exists.
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
    body: JSON.stringify({
      ...sentence,
    }),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteSentence(sentenceId) {
  return fetch(baseUrl + sentenceId, {
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

export function filterSentences(sentenceCriteria) {
  let url = baseUrl + "findWithCriteria?";
  let numberOfParameters = 0;
  if (sentenceCriteria.kanjis) {
    url = url + "kanjis=" + sentenceCriteria.kanjis;
    numberOfParameters++;
  }
  if (sentenceCriteria.pronunciation) {
    numberOfParameters++;
    if (numberOfParameters === 0) {
      url = url + "pronunciation=" + sentenceCriteria.pronunciation;
    } else {
      url = url + "&pronunciation=" + sentenceCriteria.pronunciation;
    }
  }

  if (sentenceCriteria.meaning) {
    numberOfParameters++;
    if (numberOfParameters === 0) {
      url = url + "meaning=" + sentenceCriteria.meaning;
    } else {
      url = url + "&meaning=" + sentenceCriteria.meaning;
    }
  }

  if (sentenceCriteria.topic) {
    numberOfParameters++;
    if (numberOfParameters === 0) {
      url = url + "topic=" + sentenceCriteria.topic;
    } else {
      url = url + "&topic=" + sentenceCriteria.topic;
    }
  }

  return fetch(url)
    .then((response) => {
      if (response.ok) {
        const result = response.json();
        if (result) return result;
        else return {};
      }
      if (response.status === 400) {
        // So, a server-side validation error occurred.
        // Server side validation returns a string error message, so parse as text instead of json.
        const error = response.text();
        throw new Error(error);
      }
      throw new Error("Network response was not ok.");
    })
    .catch(handleError);
}
