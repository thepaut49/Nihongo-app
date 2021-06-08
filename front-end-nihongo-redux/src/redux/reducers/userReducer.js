import * as types from "../actions/actionTypes";
import initialState from "./initialState";

// on a pas mis de nom pour l'export du coup quand on l'importe
// dans un autre fichier on peut lui donner le nom que l'on
// souhaite

export default function userReducer(state = initialState.user, action) {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return [...state, { ...action.counter }];
    case types.LOGOUT_SUCCESS:
      return state.map((counter) =>
        counter.id === action.counter.id ? action.counter : counter
      );

    default:
      return state;
  }
}
