import * as kanjiApi from "./kanjiApi";
import * as verbApi from "./verbApi";
import * as naAdjectiveApi from "./naAdjectiveApi";
import * as iAdjectiveApi from "./iAdjectiveApi";
import * as nameApi from "./nameApi";
import * as wordApi from "./wordApi";
import translationConstants from "../components/common/translationConstants";

export function getMostUsedObject(typeSelect, quantity) {
  debugger;
  switch (typeSelect) {
    case translationConstants.TYPE_KANJI:
      return kanjiApi.getMostUsedKanjis(quantity);
    case translationConstants.TYPE_VERB:
      return verbApi.getMostUsedVerbs(quantity);
    case translationConstants.TYPE_NA_ADJECTIVE:
      return naAdjectiveApi.getMostUsedNaAdjectives(quantity);
    case translationConstants.TYPE_I_ADJECTIVE:
      return iAdjectiveApi.getMostUsedIAdjectives(quantity);
    case translationConstants.TYPE_NAME:
      return nameApi.getMostUsedNames(quantity);
    case translationConstants.TYPE_WORD:
      return wordApi.getMostUsedWords(quantity);
    default:
      return kanjiApi.getMostUsedKanjis(quantity);
  }
}
