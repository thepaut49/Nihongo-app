import * as wordApi from "../../api/wordApi";
import * as types from "./actionTypes";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function filterWordSuccess(words) {
  return { type: types.FILTER_WORDS_SUCCESS, words };
}

export function loadWordSuccess(words) {
  return { type: types.LOAD_WORDS_SUCCESS, words };
}

export function createWordSuccess(word) {
  return { type: types.CREATE_WORD_SUCCESS, word };
}

export function updateWordSuccess(word) {
  return { type: types.UPDATE_WORD_SUCCESS, word };
}

export function deleteWordOptimistic(word) {
  return { type: types.DELETE_WORD_OPTIMISTIC, word };
}

export function filterWords(wordCriteria) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return wordApi
      .filterWords(wordCriteria)
      .then((words) => {
        dispatch(filterWordSuccess(words));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
