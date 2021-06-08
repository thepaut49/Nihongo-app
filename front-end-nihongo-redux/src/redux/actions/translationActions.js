import * as kanjiActions from "./kanjiActions";
import * as verbActions from "./verbActions";
import * as naAdjectiveActions from "./naAdjectiveActions";
import * as iAdjectiveActions from "./iAdjectiveActions";
import * as nameActions from "./nameActions";
import * as wordActions from "./wordActions";
import * as types from "./actionTypes";
import * as translationApi from "../../api/translationApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";
import translationConstants from "../../components/common/translationConstants";

export function updateSentenceSucces(sentence) {
  return { type: types.UPDATE_SENTENCE_SUCCESS, sentence };
}

export function updateQuantitySucces(quantity) {
  return { type: types.UPDATE_QUANTITY_SUCCESS, quantity };
}

export function updateTypeSelectSucces(typeSelect) {
  return { type: types.UPDATE_TYPE_OF_OBJECT_SUCCESS, typeSelect };
}

export function clearTranslationSucces() {
  return { type: types.CLEAR_TRANSLATION_SUCCESS };
}

export function extractListOfKanjiSucces(listOfKanjis) {
  return { type: types.EXTRACT_KANJI_FROM_SENTENCE_SUCCESS, listOfKanjis };
}

export function loadPartsSucces(listParts) {
  return { type: types.LOAD_PARTS_SUCCESS, listParts };
}

export function loadListObjectsSucces(listObjects) {
  return { type: types.LOAD_LIST_OBJECT_SUCCESS, listObjects };
}

export function loadListObjects(typeSelect, quantity) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return translationApi
      .getMostUsedObject(typeSelect, quantity)
      .then((listObjects) => {
        dispatch(loadListObjectsSucces(listObjects));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function updateNumberOfUse(typeSelect, id) {
  return function () {
    switch (typeSelect) {
      case translationConstants.TYPE_KANJI:
        kanjiActions.updateNumberOfUse(id);
        break;
      case translationConstants.TYPE_VERB:
        verbActions.updateNumberOfUse(id);
        break;
      case translationConstants.TYPE_NA_ADJECTIVE:
        naAdjectiveActions.updateNumberOfUse(id);
        break;
      case translationConstants.TYPE_I_ADJECTIVE:
        iAdjectiveActions.updateNumberOfUse(id);
        break;
      case translationConstants.TYPE_NAME:
        nameActions.updateNumberOfUse(id);
        break;
      case translationConstants.TYPE_WORD:
        wordActions.updateNumberOfUse(id);
        break;
      default:
    }
  };
}

export const extractListOfKanji = (sentence, kanjis) => {
  // je transforme ma chaine de charactère en tableau de type SEt pour que chaque element soit unique
  let sentenceSet = new Set(sentence);
  let lengthOfSentenceSet = 0;
  let index = 0;
  let listOfKanjisInSentence = [];
  while (index <= kanjis.length - 1 && lengthOfSentenceSet < sentenceSet.size) {
    if (
      listOfKanjisInSentence.indexOf(kanjis[index]) === -1 &&
      sentence.indexOf(kanjis[index].kanji) >= 0
    ) {
      listOfKanjisInSentence.push(kanjis[index]);
      lengthOfSentenceSet++;
    }
    index++;
  }
  return function (dispatch) {
    dispatch(extractListOfKanjiSucces(listOfKanjisInSentence));
  };
};

export const updateQuantity = (newQuantity) => {
  return function (dispatch) {
    dispatch(updateQuantitySucces(newQuantity));
  };
};

export const updateTypeSelect = (newType) => {
  return function (dispatch) {
    dispatch(updateTypeSelectSucces(newType));
  };
};

export const updateSentence = (newSentence) => {
  return function (dispatch) {
    dispatch(updateSentenceSucces(newSentence));
  };
};

export const clearTranslation = () => {
  return function (dispatch) {
    dispatch(clearTranslationSucces());
  };
};

export const loadParts = (parts) => {
  return function (dispatch) {
    dispatch(loadPartsSucces(parts));
  };
};
