import * as types from "../actions/actionTypes";
import initialState from "./initialState";

// on a pas mis de nom pour l'export du coup quand on l'importe
// dans un autre fichier on peut lui donner le nom que l'on
// souhaite

export default function suffixReducer(state = initialState.suffixs, action) {
  switch (action.type) {
    case types.CREATE_SUFFIX_SUCCESS:
      return [...state, { ...action.suffix }];
    case types.UPDATE_SUFFIX_SUCCESS:
      return state.map((suffix) =>
        suffix.id === action.suffix.id ? action.suffix : suffix
      );
    case types.LOAD_SUFFIXS_SUCCESS:
      return action.suffixs;
    case types.DELETE_SUFFIX_OPTIMISTIC:
      return state.filter((suffix) => suffix.id !== action.suffix.id);
    default:
      return state;
  }
}
