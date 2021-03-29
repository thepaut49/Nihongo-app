import dispatcher from "../appDispatcher";
import * as verbApi from "../api/verbApi";
import actionTypes from "./actionTypes";
import { toast } from "react-toastify";

export function saveVerb(verb) {
  return verbApi.saveVerb(verb).then((savedVerb) => {
    // Hey dispatcher go tell all the stores that a verb was created.
    dispatcher.dispatch({
      actionType: verb.id ? actionTypes.UPDATE_VERB : actionTypes.CREATE_VERB,
      verb: savedVerb,
    });
  });
}

export function deleteVerb(id) {
  return verbApi.deleteVerb(id).then(() => {
    dispatcher.dispatch({
      actionType: actionTypes.DELETE_VERB,
      id: id,
    });
    toast.success("Verb deleted.");
  });
}

export function loadVerbs() {
  return verbApi.getVerbs().then((verbs) => {
    dispatcher.dispatch({
      actionType: actionTypes.LOAD_VERBS,
      verbs: verbs,
    });
  });
}

export function filterVerbs(verbCriteria) {
  return verbApi.filterVerbs(verbCriteria).then((verbs) => {
    dispatcher.dispatch({
      actionType: actionTypes.FILTER_VERBS,
      verbs: verbs,
    });
  });
}

export function updateNumberOfUse(id) {
  return verbApi.updateNumberOfUse(id).then((updatedverb) => {
    // Hey dispatcher go tell all the stores that a kanji was created.
    dispatcher.dispatch({
      actionType: actionTypes.UPDATE_VERB,
      verb: updatedverb,
    });
  });
}
