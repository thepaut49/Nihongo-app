import * as types from "../actions/actionTypes";
import initialState from "./initialState";

// on a pas mis de nom pour l'export du coup quand on l'importe
// dans un autre fichier on peut lui donner le nom que l'on
// souhaite

export default function iAdjectiveReducer(
  state = initialState.iAdjectivesList,
  action
) {
  switch (action.type) {
    case types.CREATE_I_ADJECTIVE_SUCCESS:
      return [...state, { ...action.iAdjective }];
    case types.UPDATE_I_ADJECTIVE_SUCCESS:
      return state.map((iAdjective) =>
        iAdjective.id === action.iAdjective.id ? action.iAdjective : iAdjective
      );
    case types.LOAD_I_ADJECTIVES_SUCCESS:
      return action.iAdjectives;
    case types.DELETE_I_ADJECTIVE_OPTIMISTIC:
      return state.filter(
        (iAdjective) => iAdjective.id !== action.iAdjective.id
      );
    case types.FILTER_I_ADJECTIVES_SUCCESS:
      return action.iAdjectives;
    default:
      return state;
  }
}
