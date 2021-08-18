import * as kanjiActions from "./kanjiActions";
import * as verbActions from "./verbActions";
import * as naAdjectiveActions from "./naAdjectiveActions";
import * as iAdjectiveActions from "./iAdjectiveActions";
import * as nameActions from "./nameActions";
import * as wordActions from "./wordActions";
import translationConstants from "../../components/common/translationConstants";
import { loadListObjects } from "../../components/translation/loadListOfObjectsUtils";

export function loadListOfObjects(
  typeSelect,
  quantity,
  kanjis,
  iAdjectives,
  naAdjectives,
  names,
  words,
  verbs,
  setListObjects
) {
  loadListObjects(
    typeSelect,
    quantity,
    kanjis,
    iAdjectives,
    naAdjectives,
    names,
    words,
    verbs,
    setListObjects
  );
}

export function updateNumberOfUse(typeSelect, id) {
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
}

export const extractListOfKanji = (sentence, kanjis, setListOfKanji) => {
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
  sessionStorage.setItem(
    "listOfKanjis",
    JSON.stringify(listOfKanjisInSentence)
  );
  setListOfKanji(listOfKanjisInSentence);
};

export const extractListOfGrammarRules = (
  parts,
  grammarRules,
  setListOfGrammarRules
) => {
  let listOfGrammarRulesInSentence = [];
  let listOfPartsString = parts.map((part) => part.kanjis);
  for (let i = 0; i < grammarRules.length; i++) {
    let grammarRule = grammarRules[i];

    if (grammarRule.fourthKeyword) {
      if (
        areKeyWordPresents(listOfPartsString, [
          grammarRule.firstKeyWord,
          grammarRule.secondKeyWord,
          grammarRule.thirdKeyword,
          grammarRule.fourthKeyword,
        ])
      ) {
        listOfGrammarRulesInSentence.push(grammarRule);
      }
    } else if (grammarRule.thirdKeyword) {
      if (
        areKeyWordPresents(listOfPartsString, [
          grammarRule.firstKeyWord,
          grammarRule.secondKeyWord,
          grammarRule.thirdKeyword,
        ])
      ) {
        listOfGrammarRulesInSentence.push(grammarRule);
      }
    } else if (grammarRule.secondKeyword) {
      if (
        areKeyWordPresents(listOfPartsString, [
          grammarRule.firstKeyWord,
          grammarRule.secondKeyWord,
        ])
      ) {
        listOfGrammarRulesInSentence.push(grammarRule);
      }
    } else {
      if (listOfPartsString.includes(grammarRule.firstKeyWord)) {
        listOfGrammarRulesInSentence.push(grammarRule);
      }
    }
  }
  sessionStorage.setItem(
    "listOfGrammarRules",
    JSON.stringify(listOfGrammarRulesInSentence)
  );
  setListOfGrammarRules(listOfGrammarRulesInSentence);
};

const areKeyWordPresents = (listOfPartsString, keyWordsList) => {
  let index = 0;
  let countKeyWordPresent = 0;
  for (let i = 0; i < keyWordsList.length; i++) {
    let keyWord = keyWordsList[i];
    while (index < listOfPartsString.length) {
      if (keyWord === listOfPartsString[index]) {
        countKeyWordPresent++;
        index++;
        break;
      }
      index++;
    }
  }
  if (countKeyWordPresent === keyWordsList.length) {
    return true;
  }
};

export const updateQuantity = (quantity, setQuantity) => {
  sessionStorage.setItem("quantity", quantity);
  setQuantity(quantity);
};

export const updateTypeSelect = (typeSelect, setTypeSelect) => {
  sessionStorage.setItem("typeSelect", typeSelect);
  setTypeSelect(typeSelect);
};

export const updateSentence = (sentence, setSentence) => {
  sessionStorage.setItem("sentence", sentence);
  setSentence(sentence);
};

export const clearTranslation = (setListOfKanjis, setListParts) => {
  sessionStorage.setItem("listOfKanjis", JSON.stringify([]));
  sessionStorage.setItem("listParts", JSON.stringify([]));
  setListOfKanjis([]);
  setListParts([]);
};

export const loadParts = (listParts, setListParts) => {
  sessionStorage.setItem("listParts", JSON.stringify(listParts));
  setListParts(listParts);
};
