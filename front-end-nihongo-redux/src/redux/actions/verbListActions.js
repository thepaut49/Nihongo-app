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
