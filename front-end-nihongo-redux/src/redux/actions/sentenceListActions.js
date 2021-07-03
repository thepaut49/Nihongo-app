import * as sentenceApi from "../../api/sentenceApi";
import * as types from "./actionTypes";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function filterSentenceSuccess(sentences) {
  return { type: types.FILTER_SENTENCES_SUCCESS, sentences };
}

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

export function filterSentences(sentenceCriteria) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return sentenceApi
      .filterSentences(sentenceCriteria)
      .then((sentences) => {
        dispatch(filterSentenceSuccess(sentences));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
