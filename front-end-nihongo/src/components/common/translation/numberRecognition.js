import translationConstants from "../translationConstants";

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
  "〇",
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
  "百",
  "千",
  "万",
];

const decimalMarkers = [".", ","];

export const isPartANumber = (sentencePart, indiceCourant) => {
  const allCharPossibleInANumber = arabicNumberCharacters.concat(
    japaneseNumberCharacters.concat(decimalMarkers)
  );
  let partResult = null;
  let partIsNumber = true;

  for (let index = 0; index < sentencePart.length; index++) {
    if (!allCharPossibleInANumber.includes(sentencePart[index])) {
      partIsNumber = false;
      break;
    }
  }

  if (partIsNumber) {
    partResult = {
      type: translationConstants.TYPE_NUMBER,
      kanjis: sentencePart,
      selectedPronunciation: numberPronunciation(sentencePart),
      selectedMeaning: japaneseNumberToArabicNumber(
        sentencePart
      ).toLocaleString("en-US"),
      pronunciations: [numberPronunciation(sentencePart)],
      meanings: [
        japaneseNumberToArabicNumber(sentencePart).toLocaleString("en-US"),
      ],
      unknown: false,
      length: sentencePart.length,
      currentIndex: indiceCourant,
      listOfValues: [],
    };
  }

  return partResult;
};

const patternXTenThousandX = (japaneseNumberString) => {
  const tenThousand = 10000;
  if (japaneseNumberString.includes("万")) {
    if (japaneseNumberString === "万") {
      return tenThousand;
    } else if (japaneseNumberString.startsWith("万")) {
      return tenThousand + patternXThousandX(japaneseNumberString.substr(1));
    } else if (japaneseNumberString.endsWith("万")) {
      return (
        patternXThousandX(
          japaneseNumberString.substr(0, japaneseNumberString.length - 1)
        ) * tenThousand
      );
    } // cas X万X
    else {
      return (
        patternXTenThousandX(
          japaneseNumberString.substr(0, japaneseNumberString.indexOf("万"))
        ) *
          tenThousand +
        patternXTenThousandX(
          japaneseNumberString.substr(japaneseNumberString.indexOf("万") + 1)
        )
      );
    }
  } else {
    return patternXThousandX(japaneseNumberString);
  }
};

const patternXThousandX = (japaneseNumberString) => {
  const thousand = 1000;
  if (japaneseNumberString.includes("千")) {
    if (japaneseNumberString === "千") {
      return thousand;
    } else if (japaneseNumberString.startsWith("千")) {
      return thousand + patternXHundredX(japaneseNumberString.substr(1));
    } else if (japaneseNumberString.endsWith("千")) {
      return (
        patternXHundredX(
          japaneseNumberString.substr(0, japaneseNumberString.length - 1)
        ) * thousand
      );
    } // cas X千X
    else {
      return (
        patternXHundredX(
          japaneseNumberString.substr(0, japaneseNumberString.indexOf("千"))
        ) *
          thousand +
        patternXHundredX(
          japaneseNumberString.substr(japaneseNumberString.indexOf("千") + 1)
        )
      );
    }
  } else {
    return patternXHundredX(japaneseNumberString);
  }
};

const patternXHundredX = (japaneseNumberString) => {
  const hundred = 100;
  if (japaneseNumberString.includes("百")) {
    if (japaneseNumberString === "百") {
      return hundred;
    } else if (japaneseNumberString.startsWith("百")) {
      return hundred + patternXTenX(japaneseNumberString.substr(1));
    } else if (japaneseNumberString.endsWith("百")) {
      return (
        patternXTenX(
          japaneseNumberString.substr(0, japaneseNumberString.length - 1)
        ) * hundred
      );
    } // cas X百X
    else {
      return (
        patternXTenX(
          japaneseNumberString.substr(0, japaneseNumberString.indexOf("百"))
        ) *
          hundred +
        patternXTenX(
          japaneseNumberString.substr(japaneseNumberString.indexOf("百") + 1)
        )
      );
    }
  } else {
    return patternXTenX(japaneseNumberString);
  }
};

const patternXTenX = (japaneseNumberString) => {
  const ten = 10;
  if (japaneseNumberString.includes("十")) {
    if (japaneseNumberString === "十") {
      return ten;
    } else if (japaneseNumberString.startsWith("十")) {
      return ten + patternX(japaneseNumberString.substr(1));
    } else if (japaneseNumberString.endsWith("十")) {
      return (
        patternX(
          japaneseNumberString.substr(0, japaneseNumberString.length - 1)
        ) * ten
      );
    } // cas X十X
    else {
      return (
        patternX(
          japaneseNumberString.substr(0, japaneseNumberString.indexOf("十"))
        ) *
          ten +
        patternX(
          japaneseNumberString.substr(japaneseNumberString.indexOf("十") + 1)
        )
      );
    }
  } else {
    return patternX(japaneseNumberString);
  }
};

const patternX = (number) => {
  let result = 0;
  switch (number) {
    case "一":
      result = 1;
      break;
    case "二":
      result = 2;
      break;
    case "三":
      result = 3;
      break;
    case "四":
      result = 4;
      break;
    case "五":
      result = 5;
      break;
    case "六":
      result = 6;
      break;
    case "七":
      result = 7;
      break;
    case "八":
      result = 8;
      break;
    case "九":
      result = 9;
      break;
    default:
      result = 0;
  }
  return result;
};

const japaneseNumberToArabicNumber = (japaneseNumberString) => {
  const hundredMillion = 100000000;

  if (japaneseNumberString.includes("億")) {
    if (japaneseNumberString === "億") {
      return hundredMillion;
    } else if (japaneseNumberString.startsWith("億")) {
      return (
        hundredMillion + patternXTenThousandX(japaneseNumberString.substr(1))
      );
    } else if (japaneseNumberString.endsWith("億")) {
      return (
        patternXTenThousandX(
          japaneseNumberString.substr(0, japaneseNumberString.length - 1)
        ) * hundredMillion
      );
    } // cas X億X
    else {
      return (
        patternXTenThousandX(
          japaneseNumberString.substr(0, japaneseNumberString.indexOf("億"))
        ) *
          hundredMillion +
        patternXTenThousandX(
          japaneseNumberString.substr(japaneseNumberString.indexOf("億") + 1)
        )
      );
    }
  } else {
    return patternXTenThousandX(japaneseNumberString);
  }
};

const numberPronunciation = (number) => {
  let numberTemp = number;
  // on commence par remplacer les prononciation particulières de 1000
  numberTemp = numberTemp.replace("三千", "さんぜん");
  numberTemp = numberTemp.replace("八千", "はっせん");

  // ensuite on remplace les prononciation particulières de 100
  numberTemp = numberTemp.replace("三百", "さんびゃく");
  numberTemp = numberTemp.replace("六百", "ろっぴゃく");
  numberTemp = numberTemp.replace("八百", "はっぴゃく");

  // ensuite
  let pronunciation = "";
  for (let index = 0; index < numberTemp.length; index++) {
    switch (numberTemp[index]) {
      case "零":
      case "〇":
        pronunciation = pronunciation + "れい";
        break;
      case "一":
        pronunciation = pronunciation + "いち";
        break;
      case "二":
        pronunciation = pronunciation + "に";
        break;
      case "三":
        pronunciation = pronunciation + "さん";
        break;
      case "四":
        pronunciation = pronunciation + "し";
        break;
      case "五":
        pronunciation = pronunciation + "ご";
        break;
      case "六":
        pronunciation = pronunciation + "ろく";
        break;
      case "七":
        pronunciation = pronunciation + "なな";
        break;
      case "八":
        pronunciation = pronunciation + "はち";
        break;
      case "九":
        pronunciation = pronunciation + "きゅう";
        break;
      case "十":
        pronunciation = pronunciation + "じゅう";
        break;
      case "万":
        pronunciation = pronunciation + "まん";
        break;
      default:
        pronunciation = pronunciation + numberTemp[index];
    }
  }
  return pronunciation;
};
