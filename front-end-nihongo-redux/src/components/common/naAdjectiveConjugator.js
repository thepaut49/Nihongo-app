import { verbConstants } from "./verbConstants";

export const constructListOfValues = (naAdj) => {
  let listOfValues = [];
  let tenseFunctionList = [presentIndicative, pastIndicative];
  const formList = [verbConstants.PLAIN_FORM, verbConstants.POLITE_FORM];
  const signList = [verbConstants.POSITIVE_SIGN, verbConstants.NEGATIVE_SIGN];
  listOfValues.push(naForm(naAdj.kanjis));

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
        listOfValues.push(naAdj.kanjis + tense(naAdj.kanjis, form, sign));
      }
    }
  }
  debugger;
  return listOfValues;
};

export function naForm(adjective) {
  return adjective + "な";
}

export function presentIndicative(adjective, form, sign) {
  if (form === verbConstants.PLAIN_FORM) {
    if (sign === verbConstants.POSITIVE_SIGN) {
      return "だ";
    } else {
      return "じゃない";
    }
  } else if (form === verbConstants.POLITE_FORM) {
    if (sign === verbConstants.POSITIVE_SIGN) {
      return "です";
    } else {
      return "じゃないです/ではないです";
    }
  }
}

export function pastIndicative(adjective, form, sign) {
  if (form === verbConstants.PLAIN_FORM) {
    if (sign === verbConstants.POSITIVE_SIGN) {
      return "だった";
    } else {
      return "じゃなかった";
    }
  } else if (form === verbConstants.POLITE_FORM) {
    if (sign === verbConstants.POSITIVE_SIGN) {
      return "でした";
    } else {
      return "じゃなかったです/ではなかったです";
    }
  }
}
