import * as sentenceApi from "../../api/sentenceApi";
import * as types from "./actionTypes";
import { beginApiCall, apiCallError } from "./apiStatusActions";
import * as sentenceListActions from "./sentenceListActions";

export function loadSentenceSuccess(sentences) {
  return { type: types.LOAD_SENTENCES_SUCCESS, sentences };
}

export function createSentenceSuccess(sentence) {
  return { type: types.CREATE_SENTENCE_SUCCESS, sentence };
}

export function updateSentenceSuccess(sentence) {
  return { type: types.UPDATE_SENTENCE_SUCCESS, sentence };
}

export function deleteSentenceOptimistic(sentence) {
  return { type: types.DELETE_SENTENCE_OPTIMISTIC, sentence };
}

export function loadSentences() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return sentenceApi
      .getSentences()
      .then((sentences) => {
        dispatch(loadSentenceSuccess(sentences));
        dispatch(sentenceListActions.loadSentenceSuccess(sentences));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function saveSentence(sentence) {
  //eslint-disable-next-line no-unused-vars
  return function (dispatch, getState) {
    dispatch(beginApiCall());
    return sentenceApi
      .saveSentence(sentence)
      .then((savedsentence) => {
        if (sentence.id) {
          dispatch(updateSentenceSuccess(savedsentence));
          dispatch(sentenceListActions.updateSentenceSuccess(savedsentence));
        } else {
          dispatch(createSentenceSuccess(savedsentence));
          dispatch(sentenceListActions.createSentenceSuccess(savedsentence));
        }
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function deleteSentence(sentence) {
  return function (dispatch) {
    // Doing optimistic delete, so not dispatching begin/end api call
    // actions, or apiCallError action since we're not showing the loading status for this.
    dispatch(deleteSentenceOptimistic(sentence));
    dispatch(sentenceListActions.deleteSentenceOptimistic(sentence));
    return sentenceApi.deleteSentence(sentence.id);
  };
}
