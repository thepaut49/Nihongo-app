import * as types from "../actions/actionTypes";
import initialState from "./initialState";

// on a pas mis de nom pour l'export du coup quand on l'importe
// dans un autre fichier on peut lui donner le nom que l'on
// souhaite

export default function translationReducer(
  state = initialState.translation,
  action
) {
  switch (action.type) {
    case types.UPDATE_SENTENCE_SUCCESS:
      return { ...state, sentence: action.sentence };
    case types.UPDATE_QUANTITY_SUCCESS:
      return { ...state, quantity: action.quantity };
    case types.UPDATE_TYPE_OF_OBJECT_SUCCESS:
      return { ...state, typeSelect: action.typeSelect };
    case types.LOAD_LIST_OBJECT_SUCCESS:
      return { ...state, listObjects: action.listObjects };
    case types.LOAD_PARTS_SUCCESS:
      return { ...state, listParts: action.listParts };
    case types.EXTRACT_KANJI_FROM_SENTENCE_SUCCESS:
      return { ...state, listOfKanjis: action.listOfKanjis };
    case types.CLEAR_TRANSLATION_SUCCESS:
      return { ...state, listOfKanjis: [], listParts: [] };
    default:
      return state;
  }
}
