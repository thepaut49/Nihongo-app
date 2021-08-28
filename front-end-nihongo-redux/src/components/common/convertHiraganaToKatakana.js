import { hiraganaMap } from "./hiragana";
import { katakanaMap } from "./katakana";

const orderByIndex = (a, b) => {
  return a.index - b.index;
};

export const katakanaToHiragana = (katakanas) => {
  let invertedHiraganaMap = new Map();
  [...hiraganaMap.entries()].map(([key, value]) =>
    invertedHiraganaMap.set(value[1], value[0])
  );

  const katakanaMapLocal = new Map();
  [...katakanaMap.entries()].map(([key, value]) =>
    katakanaMapLocal.set(value[0], value[1])
  );

  let hiraganas = "";
  let listOfHiraganas = [];
  let index = 0;
  let lastKatakanas = "";
  if (katakanas.length === 1) {
    lastKatakanas = katakanas;
  }
  while (index + 1 < katakanas.length) {
    let katakanaPronunciation = katakanaMapLocal.get(
      katakanas.substring(index, 2)
    );
    if (katakanaPronunciation) {
      listOfHiraganas.push({
        index: index,
        hiragana: invertedHiraganaMap.get(katakanaPronunciation),
      });
      index = index + 2;
    } else {
      if (index === katakanas.length - 2) {
        lastKatakanas = lastKatakanas + katakanas.substring(index, 2);
      } else {
        lastKatakanas = lastKatakanas + katakanas[index];
      }
      index++;
    }
  }

  index = 0;
  while (index < lastKatakanas.length) {
    let katakanaPronunciation = katakanaMapLocal.get(lastKatakanas[index]);
    if (katakanaPronunciation) {
      listOfHiraganas.push({
        index: index,
        hiragana: invertedHiraganaMap.get(katakanaPronunciation),
      });
    } else {
      listOfHiraganas.push({
        index: index,
        hiragana: lastKatakanas[index],
      });
    }
    index++;
  }

  listOfHiraganas.sort(orderByIndex);

  for (let j = 0; j < listOfHiraganas.length; j++) {
    hiraganas = hiraganas + listOfHiraganas[j].hiragana;
  }
  console.log("katakanaToHiragana : " + katakanas + " -> " + hiraganas);
  return hiraganas;
};

export const hiraganaToKatakana = (hiraganas) => {
  let invertedKatakanaMap = new Map();
  [...katakanaMap.entries()].map(([key, value]) =>
    invertedKatakanaMap.set(value[1], value[0])
  );

  const hiraganaMapLocal = new Map();
  [...hiraganaMap.entries()].map(([key, value]) =>
    hiraganaMapLocal.set(value[0], value[1])
  );

  let katakanas = "";
  let listOfKatakanas = [];
  let index = 0;
  let lastHiraganas = "";
  if (hiraganas.length === 1) {
    lastHiraganas = hiraganas;
  }
  while (index + 1 < hiraganas.length) {
    let hiraganaPronunciation = hiraganaMapLocal.get(
      hiraganas.substring(index, 2)
    );
    if (hiraganaPronunciation) {
      listOfKatakanas.push({
        index: index,
        katakana: invertedKatakanaMap.get(hiraganaPronunciation),
      });
      index = index + 2;
    } else {
      if (index === hiraganas.length - 2) {
        lastHiraganas = lastHiraganas + hiraganas.substring(index, 2);
      } else {
        lastHiraganas = lastHiraganas + hiraganas[index];
      }
      index++;
    }
  }

  index = 0;
  while (index < lastHiraganas.length) {
    let hiraganaPronunciation = hiraganaMapLocal.get(lastHiraganas[index]);
    if (hiraganaPronunciation) {
      listOfKatakanas.push({
        index: index,
        katakana: invertedKatakanaMap.get(hiraganaPronunciation),
      });
    } else {
      listOfKatakanas.push({
        index: index,
        katakana: lastHiraganas[index],
      });
    }
    index++;
  }

  listOfKatakanas.sort(orderByIndex);

  for (let j = 0; j < listOfKatakanas.length; j++) {
    katakanas = katakanas + listOfKatakanas[j].katakana;
  }

  console.log("hiraganaToKatakana : " + hiraganas + " -> " + katakanas);
  return katakanas;
};
