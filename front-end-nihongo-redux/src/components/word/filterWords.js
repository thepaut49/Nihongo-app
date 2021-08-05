export const filterWords = (words, wordCriteria) => {
  let filteredWords = [];
  if (wordCriteriaEmpty(wordCriteria)) {
    filteredWords = words;
  } else {
    for (let index = 0; index < words.length; index++) {
      let word = words[index];
      let add = true;
      if (wordCriteria.kanjisCriteria) {
        add = word.kanjis.includes(wordCriteria.kanjisCriteria);
      }
      if (add && wordCriteria.pronunciationCriteria) {
        add = checkStringArray(
          word.pronunciations.map((pro) => pro.pronunciation),
          wordCriteria.pronunciationCriteria
        );
      }
      if (add && wordCriteria.meaningCriteria) {
        add = checkStringArray(
          word.meanings.map((mean) => mean.meaning),
          wordCriteria.meaningCriteria
        );
      }

      if (add) {
        filteredWords.push(words[index]);
      }
    }
  }
  return filteredWords;
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

const wordCriteriaEmpty = (wordCriteria) => {
  if (!wordCriteria) {
    return true;
  } else if (
    wordCriteria.kanjisCriteria ||
    wordCriteria.pronunciationCriteria ||
    wordCriteria.meaningCriteria
  ) {
    return false;
  } else {
    return true;
  }
};
