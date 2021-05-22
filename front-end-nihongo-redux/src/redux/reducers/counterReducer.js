import * as types from "../actions/actionTypes";
import initialState from "./initialState";

// on a pas mis de nom pour l'export du coup quand on l'importe
// dans un autre fichier on peut lui donner le nom que l'on
// souhaite

export default function counterReducer(state = initialState.counters, action) {
  switch (action.type) {
    case types.CREATE_COUNTER_SUCCESS:
      return [...state, { ...action.counter }];
    case types.UPDATE_COUNTER_SUCCESS:
      return state.map((counter) =>
        counter.id === action.counter.id ? action.counter : counter
      );
    case types.LOAD_COUNTERS_SUCCESS:
      return action.counters;
    case types.DELETE_COUNTER_OPTIMISTIC:
      return state.filter((counter) => counter.id !== action.counter.id);
    case types.FILTER_COUNTERS_SUCCESS:
      return action.courses;
    default:
      return state;
  }
}
