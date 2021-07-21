import * as types from "../actions/actionTypes";
import initialState from "./initialState";

// on a pas mis de nom pour l'export du coup quand on l'importe
// dans un autre fichier on peut lui donner le nom que l'on
// souhaite

export default function messageReducer(state = initialState.messages, action) {
  switch (action.type) {
    case types.CREATE_MESSAGE_SUCCESS:
      return [...state, { ...action.message }];
    case types.LOAD_MESSAGES_SUCCESS:
      return action.messages;
    case types.DELETE_MESSAGE_OPTIMISTIC:
      return state.filter((message) => message.id !== action.message.id);
    default:
      return state;
  }
}
