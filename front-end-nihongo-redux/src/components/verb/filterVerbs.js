export const filterVerbs = (verbs, verbCriteria) => {
  let filteredVerbs = [];
  if (verbCriteriaEmpty(verbCriteria)) {
    filteredVerbs = verbs;
  } else {
    for (let index = 0; index < verbs.length; index++) {
      let verb = verbs[index];
      let add = true;
      if (verbCriteria.neutralFormCriteria) {
        add = verb.kanjis.includes(verbCriteria.neutralFormCriteria);
      }
      if (add && verbCriteria.pronunciationCriteria) {
        add = checkStringArray(
          verb.pronunciations.map((pro) => pro.pronunciation),
          verbCriteria.pronunciationCriteria
        );
      }
      if (add && verbCriteria.meaningCriteria) {
        add = checkStringArray(
          verb.meanings.map((mean) => mean.meaning),
          verbCriteria.meaningCriteria
        );
      }
      if (add && verbCriteria.groupeCriteria) {
        add = verb.groupe === verbCriteria.groupeCriteria;
      }

      if (add) {
        filteredVerbs.push(verbs[index]);
      }
    }
  }
  return filteredVerbs;
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

const verbCriteriaEmpty = (verbCriteria) => {
  if (!verbCriteria) {
    return true;
  } else if (
    verbCriteria.neutralFormCriteria ||
    verbCriteria.pronunciationCriteria ||
    verbCriteria.meaningCriteria ||
    verbCriteria.groupeCriteria
  ) {
    return false;
  } else {
    return true;
  }
};
