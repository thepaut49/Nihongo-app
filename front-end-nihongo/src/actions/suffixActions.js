import dispatcher from "../appDispatcher";
import * as suffixApi from "../api/suffixApi";
import actionTypes from "./actionTypes";
import { toast } from "react-toastify";

export function saveSuffix(suffix) {
  return suffixApi.saveSuffix(suffix).then((savedSuffix) => {
    // Hey dispatcher go tell all the stores that a suffix was created.
    dispatcher.dispatch({
      actionType: suffix.id
        ? actionTypes.UPDATE_SUFFIX
        : actionTypes.CREATE_SUFFIX,
      suffix: savedSuffix,
    });
  });
}

export function deleteSuffix(id) {
  return suffixApi.deleteSuffix(id).then(() => {
    dispatcher.dispatch({
      actionType: actionTypes.DELETE_SUFFIX,
      id: id,
    });
    toast.success("Suffix deleted.");
  });
}

export function loadSuffixs() {
  return suffixApi.getSuffixs().then((suffixs) => {
    debugger;
    dispatcher.dispatch({
      actionType: actionTypes.LOAD_SUFFIXS,
      suffixs: suffixs,
    });
  });
}
