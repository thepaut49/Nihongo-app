export const filterNames = (names, nameCriteria) => {
  let filteredNames = [];
  if (nameCriteriaEmpty(nameCriteria)) {
    filteredNames = names;
  } else {
    for (let index = 0; index < names.length; index++) {
      let name = names[index];
      let add = true;
      if (nameCriteria.kanjisCriteria) {
        add = name.kanjis.includes(nameCriteria.kanjisCriteria);
      }
      if (add && nameCriteria.pronunciationCriteria) {
        add = checkStringArray(
          name.pronunciations.map((pro) => pro.pronunciation),
          nameCriteria.pronunciationCriteria
        );
      }
      if (add && nameCriteria.meaningCriteria) {
        add = checkStringArray(
          name.meanings.map((mean) => mean.meaning),
          nameCriteria.meaningCriteria
        );
      }

      if (add) {
        filteredNames.push(names[index]);
      }
    }
  }
  return filteredNames;
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

const nameCriteriaEmpty = (nameCriteria) => {
  if (!nameCriteria) {
    return true;
  } else if (
    nameCriteria.kanjisCriteria ||
    nameCriteria.pronunciationCriteria ||
    nameCriteria.meaningCriteria
  ) {
    return false;
  } else {
    return true;
  }
};
