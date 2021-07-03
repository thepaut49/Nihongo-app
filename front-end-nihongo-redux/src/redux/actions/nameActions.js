import * as nameApi from "../../api/nameApi";
import * as types from "./actionTypes";
import { beginApiCall, apiCallError } from "./apiStatusActions";
import * as nameListActions from "./nameListActions";

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

export function loadNames() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return nameApi
      .getNames()
      .then((names) => {
        dispatch(loadNameSuccess(names));
        dispatch(nameListActions.loadNameSuccess(names));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function saveName(name) {
  //eslint-disable-next-line no-unused-vars
  return function (dispatch, getState) {
    dispatch(beginApiCall());
    return nameApi
      .saveName(name)
      .then((savedname) => {
        if (name.id) {
          dispatch(updateNameSuccess(savedname));
          dispatch(nameListActions.updateNameSuccess(savedname));
        } else {
          dispatch(createNameSuccess(savedname));
          dispatch(nameListActions.createNameSuccess(savedname));
        }
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function deleteName(name) {
  return function (dispatch) {
    // Doing optimistic delete, so not dispatching begin/end api call
    // actions, or apiCallError action since we're not showing the loading status for this.
    dispatch(deleteNameOptimistic(name));
    dispatch(nameListActions.deleteNameOptimistic(name));
    return nameApi.deleteName(name.id);
  };
}

export function updateNumberOfUse(id) {
  //eslint-disable-next-line no-unused-vars
  return function (dispatch, getState) {
    dispatch(beginApiCall());
    return nameApi
      .updateNumberOfUse(id)
      .then((savedname) => {
        dispatch(updateNameSuccess(savedname));
        dispatch(nameListActions.updateNameSuccess(savedname));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
