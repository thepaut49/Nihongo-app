import * as types from "../actions/actionTypes";
import initialState from "./initialState";

// on a pas mis de nom pour l'export du coup quand on l'importe
// dans un autre fichier on peut lui donner le nom que l'on
// souhaite

export default function particuleReducer(
  state = initialState.particules,
  action
) {
  switch (action.type) {
    case types.CREATE_PARTICULE_SUCCESS:
      return [...state, { ...action.particule }];
    case types.UPDATE_PARTICULE_SUCCESS:
      return state.map((particule) =>
        particule.id === action.particule.id ? action.particule : particule
      );
    case types.LOAD_PARTICULES_SUCCESS:
      return action.particules;
    case types.DELETE_PARTICULE_OPTIMISTIC:
      return state.filter((particule) => particule.id !== action.particule.id);
    default:
      return state;
  }
}
