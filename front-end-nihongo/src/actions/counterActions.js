import dispatcher from "../appDispatcher";
import * as counterApi from "../api/counterApi";
import actionTypes from "./actionTypes";
import { toast } from "react-toastify";

export function saveCounter(counter) {
  return counterApi.saveCounter(counter).then((savedCounter) => {
    // Hey dispatcher go tell all the stores that a counter was created.
    dispatcher.dispatch({
      actionType: counter.id
        ? actionTypes.UPDATE_COUNTER
        : actionTypes.CREATE_COUNTER,
      counter: savedCounter,
    });
  });
}

export function deleteCounter(id) {
  return counterApi.deleteCounter(id).then(() => {
    dispatcher.dispatch({
      actionType: actionTypes.DELETE_COUNTER,
      id: id,
    });
    toast.success("Counter deleted.");
  });
}

export function loadCounters() {
  return counterApi.getCounters().then((counters) => {
    dispatcher.dispatch({
      actionType: actionTypes.LOAD_COUNTERS,
      counters: counters,
    });
  });
}

export function filterCounters(counterCriteria) {
  return counterApi.filterCounters(counterCriteria).then((counters) => {
    dispatcher.dispatch({
      actionType: actionTypes.FILTER_COUNTERS,
      counters: counters,
    });
  });
}

export function updateNumberOfUse(id) {
  return counterApi.updateNumberOfUse(id).then((updatedCounter) => {
    // Hey dispatcher go tell all the stores that a kanji was created.
    dispatcher.dispatch({
      actionType: actionTypes.UPDATE_COUNTER,
      counter: updatedCounter,
    });
  });
}
