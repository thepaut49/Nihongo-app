import * as kanjiActions from "./kanjiActions";
import * as verbActions from "./verbActions";
import * as naAdjectiveActions from "./naAdjectiveActions";
import * as iAdjectiveActions from "./iAdjectiveActions";
import * as nameActions from "./nameActions";
import * as wordActions from "./wordActions";
import dispatcher from "../appDispatcher";
import actionTypes from "./actionTypes";

import translationConstants from "../components/common/translationConstants";

export function updateNumberOfUse(typeSelect, id) {
  switch (typeSelect) {
    case translationConstants.TYPE_KANJI:
      kanjiActions
        .updateNumberOfUse(id)
        .then((updatedKanji) => {
          console.log("Kanji updated");
        })
        .catch((error) => console.log(error));
      break;
    case translationConstants.TYPE_VERB:
      verbActions
        .updateNumberOfUse(id)
        .then((updatedVerb) => {
          console.log("Verb updated");
        })
        .catch((error) => console.log(error));
      break;
    case translationConstants.TYPE_NA_ADJECTIVE:
      naAdjectiveActions
        .updateNumberOfUse(id)
        .then((updatedNaAdj) => {
          console.log("Na-Adjective updated");
        })
        .catch((error) => console.log(error));
      break;
    case translationConstants.TYPE_I_ADJECTIVE:
      iAdjectiveActions
        .updateNumberOfUse(id)
        .then((updatedIAdj) => {
          console.log("I-Adjective updated");
        })
        .catch((error) => console.log(error));
      break;
    case translationConstants.TYPE_NAME:
      nameActions
        .updateNumberOfUse(id)
        .then((updatedName) => {
          console.log("Name updated");
        })
        .catch((error) => console.log(error));
      break;
    case translationConstants.TYPE_WORD:
      wordActions
        .updateNumberOfUse(id)
        .then((updatedWord) => {
          console.log("Word updated");
        })
        .catch((error) => console.log(error));
      break;
    default:
  }
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
  dispatcher.dispatch({
    actionType: actionTypes.EXTRACT_KANJI_FROM_SENTENCE,
    listOfKanjis: listOfKanjisInSentence,
  });
};

export const clearTranslation = () => {
  debugger;
  dispatcher.dispatch({
    actionType: actionTypes.CLEAR_TRANSLATION,
  });
};

export const updateQuantity = (newQuantity) => {
  dispatcher.dispatch({
    actionType: actionTypes.UPDATE_QUANTITY,
    quantity: newQuantity,
  });
};

export const updateTypeSelect = (newType) => {
  dispatcher.dispatch({
    actionType: actionTypes.UPDATE_TYPE_OF_OBJECT,
    typeSelect: newType,
  });
};

export const updateSentence = (newSentence) => {
  dispatcher.dispatch({
    actionType: actionTypes.UPDATE_SENTENCE,
    sentence: newSentence,
  });
};

export const loadParts = (parts) => {
  dispatcher.dispatch({
    actionType: actionTypes.LOAD_PARTS,
    listParts: parts,
  });
};
