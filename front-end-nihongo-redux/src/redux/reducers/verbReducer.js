import * as types from "../actions/actionTypes";
import initialState from "./initialState";

// on a pas mis de nom pour l'export du coup quand on l'importe
// dans un autre fichier on peut lui donner le nom que l'on
// souhaite

export default function verbReducer(state = initialState.verbs, action) {
  switch (action.type) {
    case types.CREATE_VERB_SUCCESS:
      return [...state, { ...action.verb }];
    case types.UPDATE_VERB_SUCCESS:
      return state.map((verb) =>
        verb.id === action.verb.id ? action.verb : verb
      );
    case types.LOAD_VERBS_SUCCESS:
      return action.verbs;
    case types.DELETE_VERB_OPTIMISTIC:
      return state.filter((verb) => verb.id !== action.verb.id);
    case types.FILTER_VERBS_SUCCESS:
      return action.verbs;
    default:
      return state;
  }
}
