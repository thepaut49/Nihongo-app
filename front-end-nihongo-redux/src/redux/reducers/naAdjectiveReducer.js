import * as types from "../actions/actionTypes";
import initialState from "./initialState";

// on a pas mis de nom pour l'export du coup quand on l'importe
// dans un autre fichier on peut lui donner le nom que l'on
// souhaite

export default function naAdjectiveReducer(
  state = initialState.naAdjectives,
  action
) {
  switch (action.type) {
    case types.CREATE_NA_ADJECTIVE_SUCCESS:
      return [...state, { ...action.naAdjective }];
    case types.UPDATE_NA_ADJECTIVE_SUCCESS:
      return state.map((naAdjective) =>
        naAdjective.id === action.naAdjective.id
          ? action.naAdjective
          : naAdjective
      );
    case types.LOAD_NA_ADJECTIVES_SUCCESS:
      return action.naAdjectives;
    case types.DELETE_NA_ADJECTIVE_OPTIMISTIC:
      return state.filter(
        (naAdjective) => naAdjective.id !== action.naAdjective.id
      );
    case types.FILTER_NA_ADJECTIVES_SUCCESS:
      return action.naAdjectives;
    default:
      return state;
  }
}
