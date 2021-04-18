import {
  japaneseNumberToArabicNumber,
  numberPronunciation,
  arabicNumberPronunciation,
  isNumberInJapanese,
} from "./numberRecognition";
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

const stringContainNumbers = (sentencePart) => {
  let containNumber = false;
  for (let index = 0; index < sentencePart.length; index++) {
    if (japaneseNumberCharacters.includes(sentencePart[index])) {
      containNumber = true;
      break;
    }
    if (arabicNumberCharacters.includes(sentencePart[index])) {
      containNumber = true;
      break;
    }
  }
  return containNumber;
};

const dayMonthYearKanji = ["日", "月", "年"];

export const isPartADateOrNumberOfDays = (sentencePart, indiceCourant) => {
  let containMonthDayOrYearKanji = false;
  let partIsADate = false;
  if (
    sentencePart.includes("日") ||
    sentencePart.includes("月") ||
    sentencePart.includes("年")
  ) {
    containMonthDayOrYearKanji = true;
    partIsADate = true;
  }

  for (let index = 0; index < sentencePart.length; index++) {
    let char = sentencePart[index];
    if (
      !arabicNumberCharacters.includes(char) &&
      !japaneseNumberCharacters.includes(char) &&
      !dayMonthYearKanji.includes(char)
    ) {
      partIsADate = false;
      break;
    }
  }
  let part = null;
  if (
    partIsADate &&
    containMonthDayOrYearKanji &&
    stringContainNumbers(sentencePart)
  ) {
    const indexOfYearKanji = sentencePart.indexOf("年");
    const indexOfMonthKanji = sentencePart.indexOf("月");
    const indexOfDayKanji = sentencePart.indexOf("日");
    // récupération de l'année
    let year = null;
    if (indexOfYearKanji > 0) {
      year = sentencePart.substr(0, indexOfYearKanji);
    }
    // récupération du mois
    let month = null;
    if (indexOfMonthKanji > 0) {
      if (indexOfYearKanji > 0) {
        month = sentencePart.substr(
          indexOfYearKanji + 1,
          indexOfMonthKanji - indexOfYearKanji - 1
        );
      } else {
        month = sentencePart.substr(0, indexOfMonthKanji);
      }
    }
    // récupération du jour
    let day = null;
    if (indexOfDayKanji > 0) {
      if (indexOfYearKanji > 0) {
        if (indexOfMonthKanji > 0) {
          day = sentencePart.substr(
            indexOfMonthKanji + 1,
            indexOfDayKanji - indexOfMonthKanji - 1
          );
        } else {
          day = sentencePart.substr(
            indexOfYearKanji + 1,
            indexOfDayKanji - indexOfYearKanji - 1
          );
        }
      } else {
        if (indexOfMonthKanji > 0) {
          day = sentencePart.substr(
            indexOfMonthKanji + 1,
            indexOfDayKanji - indexOfMonthKanji - 1
          );
        } else {
          day = sentencePart.substr(0, indexOfDayKanji);
        }
      }
    }
    // calcul de la prononciation et des sens
    let pronunciation = "";
    let meanings = ["", ""];
    if (year) {
      if (isNumberInJapanese(year)) {
        pronunciation = numberPronunciation(year) + "ねん";
      } else {
        pronunciation = arabicNumberPronunciation(year) + "ねん";
      }
      meanings[0] = japaneseNumberToArabicNumber(year);
      meanings[1] = japaneseNumberToArabicNumber(year) + " Years ";
    }
    if (month) {
      pronunciation = pronunciation + monthPronunciation(month);
      if (year) {
        meanings[0] = meanings[0] + "/" + japaneseNumberToArabicNumber(month);
      } else {
        meanings[0] = monthMeaning(month);
      }
      meanings[1] =
        meanings[1] + japaneseNumberToArabicNumber(month) + " Months ";
    }
    if (day) {
      pronunciation = pronunciation + daysOfMonthPronunciation(day);
      if (year && month) {
        meanings[0] = meanings[0] + "/" + japaneseNumberToArabicNumber(day);
      } else if (month) {
        meanings[0] =
          meanings[0] +
          " " +
          japaneseNumberToArabicNumber(day) +
          englishDayPronunciation(day);
      } else {
        meanings[0] = "The " + daysOfMonthPronunciation(day) + " of the month";
      }
      meanings[1] = meanings[1] + japaneseNumberToArabicNumber(day) + " days ";
    }

    part = {
      type: translationConstants.TYPE_DATE,
      kanjis: sentencePart,
      selectedPronunciation: pronunciation,
      selectedMeaning: meanings[0],
      pronunciations: [pronunciation],
      meanings: meanings,
      unknown: false,
      length: sentencePart.length,
      currentIndex: indiceCourant,
      listOfValues: [],
    };
  }
  return part;
};

const englishDayPronunciation = (day) => {
  let pronunciation = "";
  let dayLastChar = day[day.length - 1];
  switch (dayLastChar) {
    case "一":
    case "1":
      pronunciation = "st";
      break;
    case "二":
    case "2":
      pronunciation = "nd";
      break;
    case "三":
    case "3":
      pronunciation = "rd";
      break;
    default:
      pronunciation = "th";
  }
  return pronunciation;
};

const monthMeaning = (month) => {
  let meaning = "";
  switch (month) {
    case "1":
    case "01":
      meaning = "January";
      break;
    case "2":
    case "02":
      meaning = "February";
      break;
    case "3":
    case "03":
      meaning = "March";
      break;
    case "4":
    case "04":
      meaning = "April";
      break;
    case "5":
    case "05":
      meaning = "May";
      break;
    case "6":
    case "06":
      meaning = "June";
      break;
    case "7":
    case "07":
      meaning = "July";
      break;
    case "8":
    case "08":
      meaning = "August";
      break;
    case "9":
    case "09":
      meaning = "September";
      break;
    case "10":
      meaning = "October";
      break;
    case "11":
      meaning = "November";
      break;
    case "12":
      meaning = "December";
      break;
    default:
      meaning = month;
  }
  return meaning;
};

const monthPronunciation = (month) => {
  let pronunciation = "";
  switch (month) {
    case "一":
    case "1":
      pronunciation = "いちがつ";
      break;
    case "二":
    case "2":
      pronunciation = "にがつ";
      break;
    case "三":
    case "3":
      pronunciation = "さんがつ";
      break;
    case "四":
    case "4":
      pronunciation = "しがつ";
      break;
    case "五":
    case "5":
      pronunciation = "ごがつ";
      break;
    case "六":
    case "6":
      pronunciation = "ろくがつ";
      break;
    case "七":
    case "7":
      pronunciation = "しちがつ";
      break;
    case "八":
    case "8":
      pronunciation = "はちがつ";
      break;
    case "九":
    case "9":
      pronunciation = "くがつ";
      break;
    case "十":
    case "10":
      pronunciation = "じゅうがつ";
      break;
    case "十一":
    case "11":
      pronunciation = "じゅういちがつ";
      break;
    case "十二":
    case "12":
      pronunciation = "じゅうにがつ";
      break;
    default:
      if (isNumberInJapanese(month)) {
        pronunciation = numberPronunciation(month);
      } else {
        pronunciation = arabicNumberPronunciation(month);
      }
      // on corrige la prononciation pour le 4, 7 et 9
      if (month.endsWith("4") || month.endsWith("四")) {
        pronunciation =
          pronunciation.substr(0, pronunciation.length - 2) + "し";
      }
      if (month.endsWith("7") || month.endsWith("七")) {
        pronunciation =
          pronunciation.substr(0, pronunciation.length - 2) + "しち";
      }
      if (month.endsWith("9") || month.endsWith("九")) {
        pronunciation =
          pronunciation.substr(0, pronunciation.length - 3) + "く";
      }
  }
  return pronunciation;
};

const daysOfMonthPronunciation = (day) => {
  let pronunciation = [];
  switch (day) {
    case "一":
    case "1":
      pronunciation = ["ついたち", "いちにち"];
      break;
    case "二":
    case "2":
      pronunciation = ["ふつか"];
      break;
    case "三":
    case "3":
      pronunciation = ["みっか"];
      break;
    case "四":
    case "4":
      pronunciation = ["よっか"];
      break;
    case "五":
    case "5":
      pronunciation = ["いつか"];
      break;
    case "六":
    case "6":
      pronunciation = ["むいか"];
      break;
    case "七":
    case "7":
      pronunciation = ["なのか"];
      break;
    case "八":
    case "8":
      pronunciation = ["ようか"];
      break;
    case "九":
    case "9":
      pronunciation = ["ここのか"];
      break;
    case "十":
    case "10":
      pronunciation = ["とうか"];
      break;
    case "十一":
    case "11":
      pronunciation = ["じゅういちにち"];
      break;
    case "十二":
    case "12":
      pronunciation = ["じゅうににち"];
      break;
    case "十三":
    case "13":
      pronunciation = ["じゅうさんにち"];
      break;
    case "十四":
    case "14":
      pronunciation = ["じゅうよっか"];
      break;
    case "十五":
    case "15":
      pronunciation = ["じゅうごにち"];
      break;
    case "十六":
    case "16":
      pronunciation = ["じゅうろくにち"];
      break;
    case "十七":
    case "17":
      pronunciation = ["じゅうしちにち"];
      break;
    case "十八":
    case "18":
      pronunciation = ["じゅうはちにち"];
      break;
    case "十九":
    case "19":
      pronunciation = ["じゅうきゅうにち"];
      break;
    case "二十":
    case "20":
      pronunciation = ["はつか"];
      break;
    case "二十一":
    case "21":
      pronunciation = ["にじゅういちにち"];
      break;
    case "二十二":
    case "22":
      pronunciation = ["にじゅうににち"];
      break;
    case "二十三":
    case "23":
      pronunciation = ["にじゅうさんにち"];
      break;
    case "二十四":
    case "24":
      pronunciation = ["にじゅうよっか"];
      break;
    case "二十五":
    case "25":
      pronunciation = ["にじゅうごにち"];
      break;
    case "二十六":
    case "26":
      pronunciation = ["にじゅうろくにち"];
      break;
    case "二十七":
    case "27":
      pronunciation = ["にじゅうしちにち"];
      break;
    case "二十八":
    case "28":
      pronunciation = ["にじゅうはちにち"];
      break;
    case "二十九":
    case "29":
      pronunciation = ["にじゅうきゅうにち"];
      break;
    case "三十":
    case "30":
      pronunciation = ["さんじゅうにち"];
      break;
    case "三十一":
    case "31":
      pronunciation = ["さんじゅういちにち"];
      break;
    default:
      if (isNumberInJapanese(day)) {
        pronunciation = numberPronunciation(day) + "にち";
      } else {
        pronunciation = arabicNumberPronunciation(day) + "にち";
      }
  }
  return pronunciation;
};
