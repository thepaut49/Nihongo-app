import * as counterApi from "../../api/counterApi";
import * as types from "./actionTypes";
import { beginApiCall, apiCallError } from "./apiStatusActions";
import * as counterListActions from "./counterListActions";

export function loadCounterSuccess(counters) {
  return { type: types.LOAD_COUNTERS_SUCCESS, counters };
}

export function createCounterSuccess(counter) {
  return { type: types.CREATE_COUNTER_SUCCESS, counter };
}

export function updateCounterSuccess(counter) {
  return { type: types.UPDATE_COUNTER_SUCCESS, counter };
}

export function deleteCounterOptimistic(counter) {
  return { type: types.DELETE_COUNTER_OPTIMISTIC, counter };
}

export function loadCounters() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return counterApi
      .getCounters()
      .then((counters) => {
        dispatch(loadCounterSuccess(counters));
        dispatch(counterListActions.loadCounterSuccess(counters));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function saveCounter(counter) {
  //eslint-disable-next-line no-unused-vars
  return function (dispatch, getState) {
    dispatch(beginApiCall());
    return counterApi
      .saveCounter(counter)
      .then((savedCounter) => {
        if (counter.id) {
          dispatch(updateCounterSuccess(savedCounter));
          dispatch(counterListActions.updateCounterSuccess(savedCounter));
        } else {
          dispatch(createCounterSuccess(savedCounter));
          dispatch(counterListActions.createCounterSuccess(savedCounter));
        }
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function deleteCounter(counter) {
  return function (dispatch) {
    // Doing optimistic delete, so not dispatching begin/end api call
    // actions, or apiCallError action since we're not showing the loading status for this.
    dispatch(deleteCounterOptimistic(counter));
    dispatch(counterListActions.deleteCounterOptimistic(counter));
    return counterApi.deleteCounter(counter.id);
  };
}

export function updateNumberOfUse(id) {
  //eslint-disable-next-line no-unused-vars
  return function (dispatch, getState) {
    dispatch(beginApiCall());
    return counterApi
      .updateNumberOfUse(id)
      .then((savedCounter) => {
        dispatch(updateCounterSuccess(savedCounter));
        dispatch(counterListActions.updateCounterSuccess(savedCounter));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
