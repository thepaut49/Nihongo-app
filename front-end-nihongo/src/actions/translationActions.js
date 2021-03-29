import * as kanjiActions from "./kanjiActions";
import * as verbActions from "./verbActions";
import * as naAdjectiveActions from "./naAdjectiveActions";
import * as iAdjectiveActions from "./iAdjectiveActions";
import * as nameActions from "./nameActions";
import * as wordActions from "./wordActions";

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
