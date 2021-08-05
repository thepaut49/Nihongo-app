export const filterCounters = (counters, counterCriteria) => {
  let filteredCounters = [];
  if (counterCriteriaEmpty(counterCriteria)) {
    filteredCounters = counters;
  } else {
    for (let index = 0; index < counters.length; index++) {
      let counter = counters[index];
      let add = true;
      if (counterCriteria.kanjisCriteria) {
        add = counter.includes(counterCriteria.kanjisCriteria);
      }
      if (add && counterCriteria.pronunciationCriteria) {
        add = checkStringArray(
          counter.pronunciations.map((pro) => pro.pronunciation),
          counterCriteria.pronunciationCriteria
        );
      }
      if (add && counterCriteria.useCriteria) {
        add = counter.use.includes(counterCriteria.useCriteria);
      }

      if (add) {
        filteredCounters.push(counters[index]);
      }
    }
  }
  return filteredCounters;
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

const counterCriteriaEmpty = (counterCriteria) => {
  if (!counterCriteria) {
    return true;
  } else if (
    counterCriteria.kanjisCriteria ||
    counterCriteria.pronunciationCriteria ||
    counterCriteria.useCriteria
  ) {
    return false;
  } else {
    return true;
  }
};
