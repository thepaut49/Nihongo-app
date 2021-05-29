import * as verbApi from "../../api/verbApi";
import * as types from "./actionTypes";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function filterVerbSuccess(verbs) {
  return { type: types.FILTER_VERBS_SUCCESS, verbs };
}

export function loadVerbSuccess(verbs) {
  return { type: types.LOAD_VERBS_SUCCESS, verbs };
}

export function createVerbSuccess(verb) {
  return { type: types.CREATE_VERB_SUCCESS, verb };
}

export function updateVerbSuccess(verb) {
  return { type: types.UPDATE_VERB_SUCCESS, verb };
}

export function deleteVerbOptimistic(verb) {
  return { type: types.DELETE_VERB_OPTIMISTIC, verb };
}

export function loadVerbs() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return verbApi
      .getVerbs()
      .then((verbs) => {
        dispatch(loadVerbSuccess(verbs));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function saveVerb(verb) {
  //eslint-disable-next-line no-unused-vars
  return function (dispatch, getState) {
    dispatch(beginApiCall());
    return verbApi
      .saveVerb(verb)
      .then((savedverb) => {
        verb.id
          ? dispatch(updateVerbSuccess(savedverb))
          : dispatch(createVerbSuccess(savedverb));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function deleteVerb(verb) {
  return function (dispatch) {
    // Doing optimistic delete, so not dispatching begin/end api call
    // actions, or apiCallError action since we're not showing the loading status for this.
    dispatch(deleteVerbOptimistic(verb));
    return verbApi.deleteVerb(verb.id);
  };
}

export function filterVerbs(verbCriteria) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return verbApi
      .filterVerbs(verbCriteria)
      .then((verbs) => {
        dispatch(filterVerbSuccess(verbs));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function updateNumberOfUse(id) {
  //eslint-disable-next-line no-unused-vars
  return function (dispatch, getState) {
    dispatch(beginApiCall());
    return verbApi
      .updateNumberOfUse(id)
      .then((savedverb) => dispatch(updateVerbSuccess(savedverb)))
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
