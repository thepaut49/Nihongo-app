import * as types from "../actions/actionTypes";
import initialState from "./initialState";

// on a pas mis de nom pour l'export du coup quand on l'importe
// dans un autre fichier on peut lui donner le nom que l'on
// souhaite

export default function wordReducer(state = initialState.words, action) {
  switch (action.type) {
    case types.CREATE_WORD_SUCCESS:
      return [...state, { ...action.word }];
    case types.UPDATE_WORD_SUCCESS:
      return state.map((word) =>
        word.id === action.word.id ? action.word : word
      );
    case types.LOAD_WORDS_SUCCESS:
      return action.words;
    case types.DELETE_WORD_OPTIMISTIC:
      return state.filter((word) => word.id !== action.word.id);
    case types.FILTER_WORDS_SUCCESS:
      return action.words;
    default:
      return state;
  }
}
