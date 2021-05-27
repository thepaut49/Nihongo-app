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

export function loadIAdjectives() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return iAdjectiveApi
      .getIAdjectives()
      .then((iAdjectives) => {
        dispatch(loadIAdjectiveSuccess(iAdjectives));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function saveIAdjective(iAdjective) {
  //eslint-disable-next-line no-unused-vars
  return function (dispatch, getState) {
    dispatch(beginApiCall());
    return iAdjectiveApi
      .saveIAdjective(iAdjective)
      .then((savediAdjective) => {
        iAdjective.id
          ? dispatch(updateIAdjectiveSuccess(savediAdjective))
          : dispatch(createIAdjectiveSuccess(savediAdjective));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function deleteIAdjective(iAdjective) {
  return function (dispatch) {
    // Doing optimistic delete, so not dispatching begin/end api call
    // actions, or apiCallError action since we're not showing the loading status for this.
    dispatch(deleteIAdjectiveOptimistic(iAdjective));
    return iAdjectiveApi.deleteIAdjective(iAdjective.id);
  };
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

export function updateNumberOfUse(id) {
  //eslint-disable-next-line no-unused-vars
  return function (dispatch, getState) {
    dispatch(beginApiCall());
    return iAdjectiveApi
      .updateNumberOfUse(id)
      .then((savediAdjective) =>
        dispatch(updateIAdjectiveSuccess(savediAdjective))
      )
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
