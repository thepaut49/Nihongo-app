import { filterNaAdjectives } from "../../../api/naAdjectiveApi";
import { filterIAdjectives } from "../../../api/iAdjectiveApi";
import { filterVerbs } from "../../../api/verbApi";
import { filterNames } from "../../../api/nameApi";
import { filterWords } from "../../../api/wordApi";
import { filterKanjis as _filterKanjis } from "../../../api/kanjiApi";
import translationConstants from "../../common/translationConstants";

const getResult = (results) => {
  return results;
};

export const filterKanjis = (criteria) => {
  _filterKanjis(criteria).then((kanjis) => {
    getResult(kanjis);
  });
};

export async function filterObjects(criteria) {
  const verbCriteria = {
    neutralForm: criteria.kanjis,
    pronunciation: criteria.pronunciation,
    meaning: criteria.meaning,
  };

  let [naAdjectives, iAdjectives, verbs, names, words] = await Promise.all([
    filterNaAdjectives(criteria),
    filterIAdjectives(criteria),
    filterVerbs(verbCriteria),
    filterNames(criteria),
    filterWords(criteria),
  ]);

  let results = [];
  naAdjectives.forEach((element) => {
    results.push({
      kanjis: element.kanjis,
      pronunciation: element.pronunciation,
      meaning: element.meaning,
      typeWord: translationConstants.TYPE_NA_ADJECTIVE,
    });
  });

  iAdjectives.forEach((element) => {
    results.push(
      (element = {
        kanjis: element.kanjis,
        pronunciation: element.pronunciation,
        meaning: element.meaning,
        typeWord: translationConstants.TYPE_I_ADJECTIVE,
      })
    );
  });

  verbs.forEach((element) => {
    results.push({
      neutralForm: element.neutralForm,
      pronunciation: element.pronunciation,
      meaning: element.meaning,
      typeWord: translationConstants.TYPE_VERB,
    });
  });

  names.forEach((element) => {
    results.push({
      kanjis: element.kanjis,
      pronunciation: element.pronunciation,
      meaning: element.meaning,
      typeWord: translationConstants.TYPE_NAME,
    });
  });

  words.forEach((element) => {
    results.push({
      kanjis: element.kanjis,
      pronunciation: element.pronunciation,
      meaning: element.meaning,
      typeWord: translationConstants.TYPE_WORD,
    });
  });

  return results;
}
