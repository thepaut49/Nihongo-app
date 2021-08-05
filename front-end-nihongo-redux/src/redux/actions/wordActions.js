import * as wordApi from "../../api/wordApi";
import * as types from "./actionTypes";
import { beginApiCall, apiCallError } from "./apiStatusActions";

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

export function loadWords() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return wordApi
      .getWords()
      .then((words) => {
        dispatch(loadWordSuccess(words));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function saveWord(word) {
  //eslint-disable-next-line no-unused-vars
  return function (dispatch, getState) {
    dispatch(beginApiCall());
    return wordApi
      .saveWord(word)
      .then((savedword) => {
        if (word.id) {
          dispatch(updateWordSuccess(savedword));
        } else {
          dispatch(createWordSuccess(savedword));
        }
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function deleteWord(word) {
  return function (dispatch) {
    // Doing optimistic delete, so not dispatching begin/end api call
    // actions, or apiCallError action since we're not showing the loading status for this.
    dispatch(deleteWordOptimistic(word));
    return wordApi.deleteWord(word.id);
  };
}

export function updateNumberOfUse(id) {
  //eslint-disable-next-line no-unused-vars
  return function (dispatch, getState) {
    dispatch(beginApiCall());
    return wordApi
      .updateNumberOfUse(id)
      .then((savedword) => {
        dispatch(updateWordSuccess(savedword));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
