const arabicNumberCharacters = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
];

const japaneseNumberCharacters = [
  "零",
  "一",
  "二",
  "三",
  "四",
  "五",
  "六",
  "七",
  "八",
  "九",
  "十",
];

const numbersMarkers = [".", ",", ":"];

const isPartANumber = (part) => {
  const allCharPossibleInANumber = arabicNumberCharacters.concat(
    japaneseNumberCharacters.concat(numbersMarkers)
  );
  const kanjis = part.kanjis;

  let partResult = null;
  return partResult;
};
