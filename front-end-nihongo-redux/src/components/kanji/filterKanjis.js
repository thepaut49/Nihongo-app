export const filterKanjis = (kanjis, kanjiCriteria) => {
  let filteredKanjis = [];
  if (kanjiCriteriaEmpty(kanjiCriteria)) {
    filteredKanjis = kanjis;
  } else {
    for (let index = 0; index < kanjis.length; index++) {
      let kanji = kanjis[index];
      let add = true;
      if (kanjiCriteria.kanjisCriteria) {
        add = kanji.kanji.includes(kanjiCriteria.kanjisCriteria);
      }
      if (add && kanjiCriteria.pronunciationCriteria) {
        add = checkStringArray(
          kanji.pronunciations.map((pro) => pro.pronunciation),
          kanjiCriteria.pronunciationCriteria
        );
      }
      if (add && kanjiCriteria.meaningCriteria) {
        add = checkStringArray(
          kanji.meanings.map((mean) => mean.meaning),
          kanjiCriteria.meaningCriteria
        );
      }
      if (add && kanjiCriteria.strokeNumberCriteria) {
        add = kanjiCriteria.strokeNumberCriteria === kanji.strokeNumber;
      }
      if (add && kanjiCriteria.minStrokeNumber) {
        add = kanjiCriteria.minStrokeNumber <= kanji.strokeNumber;
      }
      if (add && kanjiCriteria.maxStrokeNumber) {
        add = kanjiCriteria.maxStrokeNumber >= kanji.strokeNumber;
      }
      if (add && kanjiCriteria.radicalsCriteria) {
        add = checkRadicals(kanji, kanjiCriteria.radicalsCriteria);
      }
      if (add) {
        filteredKanjis.push(kanjis[index]);
      }
    }
  }
  return filteredKanjis;
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

const checkRadicals = (kanji, radicalsCriteria) => {
  for (let index = 0; index < radicalsCriteria.length; index++) {
    let radical = radicalsCriteria[index];
    if (!kanji.radicals.includes(radical)) {
      return false;
    }
  }
  return true;
};

const kanjiCriteriaEmpty = (kanjiCriteria) => {
  if (!kanjiCriteria) {
    return true;
  } else if (
    kanjiCriteria.kanjiCriteria ||
    kanjiCriteria.pronunciationCriteria ||
    kanjiCriteria.meaningCriteria ||
    kanjiCriteria.strokeNumberCriteria ||
    kanjiCriteria.minStrokeNumber ||
    kanjiCriteria.maxStrokeNumber
  ) {
    return false;
  } else {
    return true;
  }
};
