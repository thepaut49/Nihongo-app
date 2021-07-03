import * as nameApi from "../../api/nameApi";
import * as types from "./actionTypes";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function filterNameSuccess(names) {
  return { type: types.FILTER_NAMES_SUCCESS, names };
}

export function loadNameSuccess(names) {
  return { type: types.LOAD_NAMES_SUCCESS, names };
}

export function createNameSuccess(name) {
  return { type: types.CREATE_NAME_SUCCESS, name };
}

export function updateNameSuccess(name) {
  return { type: types.UPDATE_NAME_SUCCESS, name };
}

export function deleteNameOptimistic(name) {
  return { type: types.DELETE_NAME_OPTIMISTIC, name };
}

export function filterNames(nameCriteria) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return nameApi
      .filterNames(nameCriteria)
      .then((names) => {
        dispatch(filterNameSuccess(names));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
