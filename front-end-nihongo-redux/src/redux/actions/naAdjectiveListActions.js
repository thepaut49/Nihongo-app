import * as naAdjectiveApi from "../../api/naAdjectiveApi";
import * as types from "./actionTypes";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function filterNaAdjectiveSuccess(naAdjectives) {
  return { type: types.FILTER_NA_ADJECTIVES_SUCCESS, naAdjectives };
}

export function loadNaAdjectiveSuccess(naAdjectives) {
  return { type: types.LOAD_NA_ADJECTIVES_SUCCESS, naAdjectives };
}

export function createNaAdjectiveSuccess(naAdjective) {
  return { type: types.CREATE_NA_ADJECTIVE_SUCCESS, naAdjective };
}

export function updateNaAdjectiveSuccess(naAdjective) {
  return { type: types.UPDATE_NA_ADJECTIVE_SUCCESS, naAdjective };
}

export function deleteNaAdjectiveOptimistic(naAdjective) {
  return { type: types.DELETE_NA_ADJECTIVE_OPTIMISTIC, naAdjective };
}

export function filterNaAdjectives(naAdjectiveCriteria) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return naAdjectiveApi
      .filterNaAdjectives(naAdjectiveCriteria)
      .then((naAdjectives) => {
        dispatch(filterNaAdjectiveSuccess(naAdjectives));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
