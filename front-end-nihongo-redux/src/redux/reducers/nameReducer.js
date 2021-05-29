import * as types from "../actions/actionTypes";
import initialState from "./initialState";

// on a pas mis de nom pour l'export du coup quand on l'importe
// dans un autre fichier on peut lui donner le nom que l'on
// souhaite

export default function nameReducer(state = initialState.names, action) {
  switch (action.type) {
    case types.CREATE_NAME_SUCCESS:
      return [...state, { ...action.name }];
    case types.UPDATE_NAME_SUCCESS:
      return state.map((name) =>
        name.id === action.name.id ? action.name : name
      );
    case types.LOAD_NAMES_SUCCESS:
      return action.names;
    case types.DELETE_NAME_OPTIMISTIC:
      return state.filter((name) => name.id !== action.name.id);
    case types.FILTER_NAMES_SUCCESS:
      return action.names;
    default:
      return state;
  }
}
