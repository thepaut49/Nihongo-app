import * as messageApi from "../../api/messageApi";
import * as types from "./actionTypes";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadMessageSuccess(messages) {
  return { type: types.LOAD_MESSAGES_SUCCESS, messages };
}

export function createMessageSuccess(message) {
  return { type: types.CREATE_MESSAGE_SUCCESS, message };
}

export function deleteMessageOptimistic(message) {
  return { type: types.DELETE_MESSAGE_OPTIMISTIC, message };
}

export function loadMessages() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return messageApi
      .getMessages()
      .then((messages) => {
        dispatch(loadMessageSuccess(messages));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function saveMessage(message) {
  //eslint-disable-next-line no-unused-vars
  return function (dispatch, getState) {
    dispatch(beginApiCall());
    return messageApi
      .saveMessage(message)
      .then((savedMessage) => {
        dispatch(createMessageSuccess(savedMessage));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function deleteMessage(message) {
  return function (dispatch) {
    // Doing optimistic delete, so not dispatching begin/end api call
    // actions, or apiCallError action since we're not showing the loading status for this.
    dispatch(deleteMessageOptimistic(message));
    return messageApi.deleteMessage(message.id);
  };
}
