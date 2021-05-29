import * as types from "../actions/actionTypes";
import initialState from "./initialState";

// on a pas mis de nom pour l'export du coup quand on l'importe
// dans un autre fichier on peut lui donner le nom que l'on
// souhaite

export default function sentenceReducer(
  state = initialState.sentences,
  action
) {
  switch (action.type) {
    case types.CREATE_SENTENCE_SUCCESS:
      return [...state, { ...action.sentence }];
    case types.UPDATE_SENTENCE_SUCCESS:
      return state.map((sentence) =>
        sentence.id === action.sentence.id ? action.sentence : sentence
      );
    case types.LOAD_SENTENCES_SUCCESS:
      return action.sentences;
    case types.DELETE_SENTENCE_OPTIMISTIC:
      return state.filter((sentence) => sentence.id !== action.sentence.id);
    case types.FILTER_SENTENCES_SUCCESS:
      return action.sentences;
    default:
      return state;
  }
}
