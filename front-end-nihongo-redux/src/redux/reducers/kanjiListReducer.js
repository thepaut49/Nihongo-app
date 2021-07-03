import * as types from "../actions/actionTypes";
import initialState from "./initialState";

// on a pas mis de nom pour l'export du coup quand on l'importe
// dans un autre fichier on peut lui donner le nom que l'on
// souhaite

export default function kanjiReducer(state = initialState.kanjisList, action) {
  switch (action.type) {
    case types.CREATE_KANJI_SUCCESS:
      return [...state, { ...action.kanji }];
    case types.UPDATE_KANJI_SUCCESS:
      return state.map((kanji) =>
        kanji.id === action.kanji.id ? action.kanji : kanji
      );
    case types.LOAD_KANJIS_SUCCESS:
      return action.kanjis;
    case types.DELETE_KANJI_OPTIMISTIC:
      return state.filter((kanji) => kanji.id !== action.kanji.id);
    case types.FILTER_KANJIS_SUCCESS:
      return action.kanjis;
    default:
      return state;
  }
}
