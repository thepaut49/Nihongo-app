import * as suffixApi from "../../api/suffixApi";
import * as types from "./actionTypes";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadSuffixSuccess(suffixs) {
  return { type: types.LOAD_SUFFIXS_SUCCESS, suffixs };
}

export function createSuffixSuccess(suffix) {
  return { type: types.CREATE_SUFFIX_SUCCESS, suffix };
}

export function updateSuffixSuccess(suffix) {
  return { type: types.UPDATE_SUFFIX_SUCCESS, suffix };
}

export function deleteSuffixOptimistic(suffix) {
  return { type: types.DELETE_SUFFIX_OPTIMISTIC, suffix };
}

export function loadSuffixs() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return suffixApi
      .getSuffixs()
      .then((suffixs) => {
        dispatch(loadSuffixSuccess(suffixs));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function saveSuffix(suffix) {
  //eslint-disable-next-line no-unused-vars
  return function (dispatch, getState) {
    dispatch(beginApiCall());
    return suffixApi
      .saveSuffix(suffix)
      .then((savedsuffix) => {
        suffix.id
          ? dispatch(updateSuffixSuccess(savedsuffix))
          : dispatch(createSuffixSuccess(savedsuffix));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function deleteSuffix(suffix) {
  return function (dispatch) {
    // Doing optimistic delete, so not dispatching begin/end api call
    // actions, or apiCallError action since we're not showing the loading status for this.
    dispatch(deleteSuffixOptimistic(suffix));
    return suffixApi.deleteSuffix(suffix.id);
  };
}
