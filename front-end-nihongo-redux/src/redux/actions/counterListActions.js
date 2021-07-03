import * as counterApi from "../../api/counterApi";
import * as types from "./actionTypes";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function filterCounterSuccess(counters) {
  return { type: types.FILTER_COUNTERS_SUCCESS, counters };
}

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

export function filterCounters(counterCriteria) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return counterApi
      .filterCounters(counterCriteria)
      .then((counters) => {
        dispatch(filterCounterSuccess(counters));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
