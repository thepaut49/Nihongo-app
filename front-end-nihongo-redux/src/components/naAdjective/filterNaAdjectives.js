export const filterNaAdjectives = (naAdjectives, naAdjectiveCriteria) => {
  let filteredNaAdjectives = [];
  if (naAdjectiveCriteriaEmpty(naAdjectiveCriteria)) {
    filteredNaAdjectives = naAdjectives;
  } else {
    for (let index = 0; index < naAdjectives.length; index++) {
      let naAdjective = naAdjectives[index];
      let add = true;
      if (naAdjectiveCriteria.kanjisCriteria) {
        add = naAdjective.kanjis.includes(naAdjectiveCriteria.kanjisCriteria);
      }
      if (add && naAdjectiveCriteria.pronunciationCriteria) {
        add = checkStringArray(
          naAdjective.pronunciations.map((pro) => pro.pronunciation),
          naAdjectiveCriteria.pronunciationCriteria
        );
      }
      if (add && naAdjectiveCriteria.meaningCriteria) {
        add = checkStringArray(
          naAdjective.meanings.map((mean) => mean.meaning),
          naAdjectiveCriteria.meaningCriteria
        );
      }

      if (add) {
        filteredNaAdjectives.push(naAdjectives[index]);
      }
    }
  }
  return filteredNaAdjectives;
};

const checkStringArray = (stringArray, stringToFind) => {
  for (let index = 0; index < stringArray.length; index++) {
    let string = stringArray[index];
    if (string.includes(stringToFind)) {
      return true;
    }
  }
  return false;
};

const naAdjectiveCriteriaEmpty = (naAdjectiveCriteria) => {
  if (!naAdjectiveCriteria) {
    return true;
  } else if (
    naAdjectiveCriteria.kanjisCriteria ||
    naAdjectiveCriteria.pronunciationCriteria ||
    naAdjectiveCriteria.meaningCriteria
  ) {
    return false;
  } else {
    return true;
  }
};
