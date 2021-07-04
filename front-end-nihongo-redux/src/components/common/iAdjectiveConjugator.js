import { verbConstants } from "./verbConstants";

function isII(adjective) {
  return adjective.kanjis === "いい" ? true : false;
}

export const constructListOfValues = (iAdj) => {
  let listOfValues = [];
  let tenseFunctionList = [presentIndicative, pastIndicative];
  const formList = [verbConstants.PLAIN_FORM, verbConstants.POLITE_FORM];
  const signList = [verbConstants.POSITIVE_SIGN, verbConstants.NEGATIVE_SIGN];
  let stem = isII(iAdj) ? "" : iAdj.kanjis.substring(0, iAdj.kanjis.length - 1);
  for (
    let indexTense = 0;
    indexTense < tenseFunctionList.length;
    indexTense++
  ) {
    for (let indexForm = 0; indexForm < formList.length; indexForm++) {
      for (let indexSign = 0; indexSign < signList.length; indexSign++) {
        let tense = tenseFunctionList[indexTense];
        let form = formList[indexForm];
        let sign = signList[indexSign];
        if (iAdj.kanjis === "いい") {
          listOfValues.push(tense(iAdj, form, sign));
        } else {
          listOfValues.push(stem + tense(iAdj, form, sign));
        }
      }
    }
  }
  return listOfValues;
};

export function presentIndicative(adjective, form, sign) {
  if (form === verbConstants.PLAIN_FORM) {
    if (sign === verbConstants.POSITIVE_SIGN) {
      return "い";
    } else {
      if (adjective.kanjis === "いい") {
        return "よくない";
      } else {
        return "くない";
      }
    }
  } else if (form === verbConstants.POLITE_FORM) {
    if (sign === verbConstants.POSITIVE_SIGN) {
      return "いです";
    } else {
      if (adjective.kanjis === "いい") {
        return "よくないです";
      } else {
        return "くないです";
      }
    }
  }
}

export function pastIndicative(adjective, form, sign) {
  if (form === verbConstants.PLAIN_FORM) {
    if (sign === verbConstants.POSITIVE_SIGN) {
      if (adjective.kanjis === "いい") {
        return "よかった";
      } else {
        return "かった";
      }
    } else {
      if (adjective.kanjis === "いい") {
        return "よくなかった";
      } else {
        return "くなかった";
      }
    }
  } else if (form === verbConstants.POLITE_FORM) {
    if (sign === verbConstants.POSITIVE_SIGN) {
      if (adjective.kanjis === "いい") {
        return "よかったです";
      } else {
        return "かったです";
      }
    } else {
      if (adjective.kanjis === "いい") {
        return "よくなかったです";
      } else {
        return "くなかったです";
      }
    }
  }
}
