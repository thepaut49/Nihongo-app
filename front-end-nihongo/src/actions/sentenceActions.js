import dispatcher from "../appDispatcher";
import * as sentenceApi from "../api/sentenceApi";
import actionTypes from "./actionTypes";
import { toast } from "react-toastify";

export function saveSentence(sentence) {
  return sentenceApi.saveSentence(sentence).then((savedSentence) => {
    // Hey dispatcher go tell all the stores that a sentence was created.
    dispatcher.dispatch({
      actionType: sentence.id
        ? actionTypes.UPDATE_SENTENCE
        : actionTypes.CREATE_SENTENCE,
      sentence: savedSentence,
    });
  });
}

export function deleteSentence(id) {
  return sentenceApi.deleteSentence(id).then(() => {
    dispatcher.dispatch({
      actionType: actionTypes.DELETE_SENTENCE,
      id: id,
    });
    toast.success("Sentence deleted.");
  });
}

export function loadSentences() {
  return sentenceApi.getSentences().then((sentences) => {
    dispatcher.dispatch({
      actionType: actionTypes.LOAD_SENTENCES,
      sentences: sentences,
    });
  });
}

export function filterSentences(sentenceCriteria) {
  return sentenceApi.filterSentences(sentenceCriteria).then((sentences) => {
    dispatcher.dispatch({
      actionType: actionTypes.FILTER_SENTENCES,
      sentences: sentences,
    });
  });
}
