import * as visitstatApi from "../../api/visitStatApi";
import * as types from "./actionTypes";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadVisitStatSuccess(visitstats) {
  return { type: types.LOAD_VISITSTATS_SUCCESS, visitstats };
}

export function createVisitStatSuccess(visitstat) {
  return { type: types.CREATE_VISITSTATS_SUCCESS, visitstat };
}

export function loadVisitStats() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return visitstatApi
      .getVisitStats()
      .then((visitstats) => {
        dispatch(loadVisitStatSuccess(visitstats));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function saveVisitStat(visitstat) {
  //eslint-disable-next-line no-unused-vars
  return function (dispatch, getState) {
    dispatch(beginApiCall());
    return visitstatApi
      .saveVisitStat(visitstat)
      .then((savedVisitStat) => {
        dispatch(createVisitStatSuccess(savedVisitStat));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
