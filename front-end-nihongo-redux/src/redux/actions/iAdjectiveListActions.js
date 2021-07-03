import * as iAdjectiveApi from "../../api/iAdjectiveApi";
import * as types from "./actionTypes";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function filterIAdjectiveSuccess(iAdjectives) {
  return { type: types.FILTER_I_ADJECTIVES_SUCCESS, iAdjectives };
}

export function loadIAdjectiveSuccess(iAdjectives) {
  return { type: types.LOAD_I_ADJECTIVES_SUCCESS, iAdjectives };
}

export function createIAdjectiveSuccess(iAdjective) {
  return { type: types.CREATE_I_ADJECTIVE_SUCCESS, iAdjective };
}

export function updateIAdjectiveSuccess(iAdjective) {
  return { type: types.UPDATE_I_ADJECTIVE_SUCCESS, iAdjective };
}

export function deleteIAdjectiveOptimistic(iAdjective) {
  return { type: types.DELETE_I_ADJECTIVE_OPTIMISTIC, iAdjective };
}

export function filterIAdjectives(iAdjectiveCriteria) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return iAdjectiveApi
      .filterIAdjectives(iAdjectiveCriteria)
      .then((iAdjectives) => {
        dispatch(filterIAdjectiveSuccess(iAdjectives));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
