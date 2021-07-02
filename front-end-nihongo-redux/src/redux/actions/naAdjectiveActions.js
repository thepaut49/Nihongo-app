import * as naAdjectiveApi from "../../api/naAdjectiveApi";
import * as types from "./actionTypes";
import { beginApiCall, apiCallError } from "./apiStatusActions";
import * as naAdjectiveListActions from "./naAdjectiveListActions";

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

export function loadNaAdjectives() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return naAdjectiveApi
      .getNaAdjectives()
      .then((naAdjectives) => {
        dispatch(loadNaAdjectiveSuccess(naAdjectives));
        dispatch(naAdjectiveListActions.loadNaAdjectiveSuccess(naAdjectives));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function saveNaAdjective(naAdjective) {
  //eslint-disable-next-line no-unused-vars
  return function (dispatch, getState) {
    dispatch(beginApiCall());
    return naAdjectiveApi
      .saveNaAdjective(naAdjective)
      .then((savednaAdjective) => {
        if (naAdjective.id) {
          dispatch(updateNaAdjectiveSuccess(savednaAdjective));
          dispatch(
            naAdjectiveListActions.updateNaAdjectiveSuccess(savednaAdjective)
          );
        } else {
          dispatch(createNaAdjectiveSuccess(savednaAdjective));
          dispatch(
            naAdjectiveListActions.createNaAdjectiveSuccess(savednaAdjective)
          );
        }
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function deleteNaAdjective(naAdjective) {
  return function (dispatch) {
    // Doing optimistic delete, so not dispatching begin/end api call
    // actions, or apiCallError action since we're not showing the loading status for this.
    dispatch(deleteNaAdjectiveOptimistic(naAdjective));
    dispatch(naAdjectiveListActions.deleteNaAdjectiveOptimistic(naAdjective));
    return naAdjectiveApi.deleteNaAdjective(naAdjective.id);
  };
}

export function updateNumberOfUse(id) {
  //eslint-disable-next-line no-unused-vars
  return function (dispatch, getState) {
    dispatch(beginApiCall());
    return naAdjectiveApi
      .updateNumberOfUse(id)
      .then((savednaAdjective) => {
        dispatch(updateNaAdjectiveSuccess(savednaAdjective));
        dispatch(
          naAdjectiveListActions.updateNaAdjectiveSuccess(savednaAdjective)
        );
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
