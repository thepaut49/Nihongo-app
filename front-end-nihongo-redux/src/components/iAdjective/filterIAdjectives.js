export const filterIAdjectives = (iAdjectives, iAdjectiveCriteria) => {
  let filteredIAdjectives = [];
  if (iAdjectiveCriteriaEmpty(iAdjectiveCriteria)) {
    filteredIAdjectives = iAdjectives;
  } else {
    for (let index = 0; index < iAdjectives.length; index++) {
      let iAdjective = iAdjectives[index];
      let add = true;
      if (iAdjectiveCriteria.kanjisCriteria) {
        add = iAdjective.kanjis.includes(iAdjectiveCriteria.kanjisCriteria);
      }
      if (add && iAdjectiveCriteria.pronunciationCriteria) {
        add = checkStringArray(
          iAdjective.pronunciations.map((pro) => pro.pronunciation),
          iAdjectiveCriteria.pronunciationCriteria
        );
      }
      if (add && iAdjectiveCriteria.meaningCriteria) {
        add = checkStringArray(
          iAdjective.meanings.map((mean) => mean.meaning),
          iAdjectiveCriteria.meaningCriteria
        );
      }

      if (add) {
        filteredIAdjectives.push(iAdjectives[index]);
      }
    }
  }
  return filteredIAdjectives;
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

const iAdjectiveCriteriaEmpty = (iAdjectiveCriteria) => {
  if (!iAdjectiveCriteria) {
    return true;
  } else if (
    iAdjectiveCriteria.kanjisCriteria ||
    iAdjectiveCriteria.pronunciationCriteria ||
    iAdjectiveCriteria.meaningCriteria
  ) {
    return false;
  } else {
    return true;
  }
};
