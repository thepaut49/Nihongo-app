export const filterWords = (words, wordCriteria) => {
  let filteredWords = [];
  if (wordCriteriaEmpty(wordCriteria)) {
    filteredWords = words;
  } else {
    for (let index = 0; index < words.length; index++) {
      let word = words[index];
      let add = true;
      if (wordCriteria.kanjisCriteria) {
        add = word.includes(wordCriteria.kanjisCriteria);
      }
      if (wordCriteria.pronunciationCriteria) {
        add = checkStringArray(
          word.pronunciations.map((pro) => pro.pronunciation),
          wordCriteria.pronunciationCriteria
        );
      }
      if (wordCriteria.meaningCriteria) {
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
    !wordCriteria.kanjis ||
    !wordCriteria.pronunciation ||
    !wordCriteria.meaning
  ) {
    return false;
  } else {
    return true;
  }
};
