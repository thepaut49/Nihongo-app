import * as iAdjectiveApi from "../../api/iAdjectiveApi";
import * as types from "./actionTypes";
import { beginApiCall, apiCallError } from "./apiStatusActions";
import * as iAdjectiveListActions from "./iAdjectiveListActions";

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
        dispatch(iAdjectiveListActions.loadIAdjectiveSuccess(iAdjectives));
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
        if (iAdjective.id) {
          dispatch(updateIAdjectiveSuccess(savediAdjective));
          dispatch(
            iAdjectiveListActions.updateIAdjectiveSuccess(savediAdjective)
          );
        } else {
          dispatch(createIAdjectiveSuccess(savediAdjective));
          dispatch(
            iAdjectiveListActions.createIAdjectiveSuccess(savediAdjective)
          );
        }
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
    dispatch(iAdjectiveListActions.deleteIAdjectiveOptimistic(iAdjective));
    return iAdjectiveApi.deleteIAdjective(iAdjective.id);
  };
}

export function updateNumberOfUse(id) {
  //eslint-disable-next-line no-unused-vars
  return function (dispatch, getState) {
    dispatch(beginApiCall());
    return iAdjectiveApi
      .updateNumberOfUse(id)
      .then((savediAdjective) => {
        dispatch(updateIAdjectiveSuccess(savediAdjective));
        dispatch(
          iAdjectiveListActions.updateIAdjectiveSuccess(savediAdjective)
        );
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
