import * as particuleApi from "../../api/particuleApi";
import * as types from "./actionTypes";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadParticuleSuccess(particules) {
  return { type: types.LOAD_PARTICULES_SUCCESS, particules };
}

export function createParticuleSuccess(particule) {
  return { type: types.CREATE_PARTICULE_SUCCESS, particule };
}

export function updateParticuleSuccess(particule) {
  return { type: types.UPDATE_PARTICULE_SUCCESS, particule };
}

export function deleteParticuleOptimistic(particule) {
  return { type: types.DELETE_PARTICULE_OPTIMISTIC, particule };
}

export function loadParticules() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return particuleApi
      .getParticules()
      .then((particules) => {
        dispatch(loadParticuleSuccess(particules));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function saveParticule(particule) {
  //eslint-disable-next-line no-unused-vars
  return function (dispatch, getState) {
    dispatch(beginApiCall());
    return particuleApi
      .saveParticule(particule)
      .then((savedparticule) => {
        particule.id
          ? dispatch(updateParticuleSuccess(savedparticule))
          : dispatch(createParticuleSuccess(savedparticule));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function deleteParticule(particule) {
  return function (dispatch) {
    // Doing optimistic delete, so not dispatching begin/end api call
    // actions, or apiCallError action since we're not showing the loading status for this.
    dispatch(deleteParticuleOptimistic(particule));
    return particuleApi.deleteParticule(particule.id);
  };
}
