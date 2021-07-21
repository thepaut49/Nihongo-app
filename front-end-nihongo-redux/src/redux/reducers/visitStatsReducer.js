import * as types from "../actions/actionTypes";
import initialState from "./initialState";

// on a pas mis de nom pour l'export du coup quand on l'importe
// dans un autre fichier on peut lui donner le nom que l'on
// souhaite

export default function visitStatsReducer(
  state = initialState.visitStats,
  action
) {
  switch (action.type) {
    case types.CREATE_VISITSTATS_SUCCESS:
      return [...state, { ...action.visitStat }];
    case types.LOAD_VISITSTATS_SUCCESS:
      return action.visitStats;
    default:
      return state;
  }
}
