import { verbConstants } from "./verbConstants";

function isSuruOrDesu(neutralForm) {
  return neutralForm === "する" || neutralForm === "です";
}

export const constructListOfValues = (verb) => {
  let listOfValues = [];
  let tenseFunctionList = [
    presentIndicative,
    presumptiveVolitional,
    imperative,
    pastIndicative,
    pastPresumptive,
    presentProgressive,
    pastProgressive,
    provisionalConditionalEba,
    potential,
    conditionalTara,
    causative,
    passive,
  ];
  const formList = [verbConstants.PLAIN_FORM, verbConstants.POLITE_FORM];
  const signList = [verbConstants.POSITIVE_SIGN, verbConstants.NEGATIVE_SIGN];
  let stem = "";
  if (!isSuruOrDesu(verb.neutralForm)) {
    stem = verb.neutralForm.substr(0, verb.neutralForm.length - 1);
  }

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
        let ending = tense(verb, form, sign);
        if (ending !== "N/A") {
          if (ending.includes("/")) {
            const listOfEnding = ending.split("/");
            for (let index = 0; index < listOfEnding.length; index++) {
              listOfValues.push(stem + listOfEnding[index]);
            }
          } else {
            listOfValues.push(stem + ending);
          }
        }
      }
    }
  }
  return listOfValues;
};

export function presentIndicative(verb, form, sign) {
  const lastKana = verb.neutralForm.charAt(verb.neutralForm.length - 1);
  switch (verb.groupe) {
    case verbConstants.ICHIDAN_GROUPE:
      if (form === verbConstants.PLAIN_FORM) {
        if (sign === verbConstants.POSITIVE_SIGN) {
          return lastKana;
        } else {
          return "ない";
        }
      } else if (form === verbConstants.POLITE_FORM) {
        if (sign === verbConstants.POSITIVE_SIGN) {
          return "ます";
        } else {
          return "ません";
        }
      }
      break;
    case verbConstants.GODAN_GROUPE:
      switch (lastKana) {
        case "く":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return lastKana;
            } else {
              return "かない";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "きます";
            } else {
              return "きません";
            }
          }
          break;
        case "ぐ":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return lastKana;
            } else {
              return "がない";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "ぎます";
            } else {
              return "ぎません";
            }
          }
          break;
        case "す":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return lastKana;
            } else {
              return "さない";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "します";
            } else {
              return "しません";
            }
          }
          break;
        case "む":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return lastKana;
            } else {
              return "まない";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "みます";
            } else {
              return "みません";
            }
          }
          break;
        case "ぬ":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return lastKana;
            } else {
              return "なない";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "にます";
            } else {
              return "にません";
            }
          }
          break;
        case "ぶ":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return lastKana;
            } else {
              return "ばない";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "びます";
            } else {
              return "びません";
            }
          }
          break;
        case "つ":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return lastKana;
            } else {
              return "たない";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "ちます";
            } else {
              return "ちません";
            }
          }
          break;
        case "う":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return lastKana;
            } else {
              return "わない";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "います";
            } else {
              return "いません";
            }
          }
          break;
        default:
          // case る
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return lastKana;
            } else {
              return "らない";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "ります";
            } else {
              return "りません";
            }
          }
      }
      break;
    default:
      if (verb.neutralForm === "する" || verb.neutralForm === "為る") {
        if (form === verbConstants.PLAIN_FORM) {
          if (sign === verbConstants.POSITIVE_SIGN) {
            return lastKana;
          } else {
            return "しない";
          }
        } else if (form === verbConstants.POLITE_FORM) {
          if (sign === verbConstants.POSITIVE_SIGN) {
            return "します";
          } else {
            return "しません";
          }
        }
      } else if (verb.neutralForm === "来る") {
        if (form === verbConstants.PLAIN_FORM) {
          if (sign === verbConstants.POSITIVE_SIGN) {
            return lastKana;
          } else {
            return "こない";
          }
        } else if (form === verbConstants.POLITE_FORM) {
          if (sign === verbConstants.POSITIVE_SIGN) {
            return "きます";
          } else {
            return "きません";
          }
        }
      } else if (verb.neutralForm === "です") {
        if (form === verbConstants.PLAIN_FORM) {
          if (sign === verbConstants.POSITIVE_SIGN) {
            return "だ";
          } else {
            return "じゃない/ではない";
          }
        } else if (form === verbConstants.POLITE_FORM) {
          if (sign === verbConstants.POSITIVE_SIGN) {
            return "です";
          } else {
            return "じゃありません/ではありません";
          }
        }
      }
  }
}

export function presumptiveVolitional(verb, form, sign) {
  const lastKana = verb.neutralForm.charAt(verb.neutralForm.length - 1);
  switch (verb.groupe) {
    case verbConstants.ICHIDAN_GROUPE:
      if (form === verbConstants.PLAIN_FORM) {
        if (sign === verbConstants.POSITIVE_SIGN) {
          return "よう/るだろう";
        } else {
          return "ないだろう";
        }
      }
      //form === verbConstants.POLITE_FORM
      else {
        if (sign === verbConstants.POSITIVE_SIGN) {
          return "ましょう/るでしょう";
        } else {
          return "ないでしょう";
        }
      }
    case verbConstants.GODAN_GROUPE:
      switch (lastKana) {
        case "く":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "こう/くだろう";
            } else {
              return "かないだろう";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "きましょう/くでしょう";
            } else {
              return "かないでしょう";
            }
          }
          break;
        case "ぐ":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "ごう/ぐだろう";
            } else {
              return "がないだろう";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "ぎましょう/ぐでしょう";
            } else {
              return "がないでしょう";
            }
          }
          break;
        case "す":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "そう/すだろう";
            } else {
              return "さないだろう";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "しましょう/すでしょう";
            } else {
              return "さないでしょう";
            }
          }
          break;
        case "む":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "もう/むだろう";
            } else {
              return "まないだろう";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "みましょう/むでしょう";
            } else {
              return "まないでしょう";
            }
          }
          break;
        case "ぬ":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "のう/ぬだろう";
            } else {
              return "なないだろう";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "にましょう/ぬでしょう";
            } else {
              return "なないでしょう";
            }
          }
          break;
        case "ぶ":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "ぼう/ぶだろう";
            } else {
              return "ばないだろう";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "びましょう/でしょう";
            } else {
              return "ばないでしょう";
            }
          }
          break;
        case "つ":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "とう/つだろう";
            } else {
              return "たないだろう";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "ちましょう/つでしょう";
            } else {
              return "たないでしょう";
            }
          }
          break;
        case "う":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "おう/うだろう";
            } else {
              return "ないだろう";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "いましょう/うでしょう";
            } else {
              return "わないでしょう";
            }
          }
          break;
        default:
          // case る
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "ろう/るだろう";
            } else {
              return "らないだろう";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "りましょう/るでしょう";
            } else {
              return "らないでしょう";
            }
          }
      }
      break;
    default:
      if (verb.neutralForm === "する" || verb.neutralForm === "為る") {
        if (form === verbConstants.PLAIN_FORM) {
          if (sign === verbConstants.POSITIVE_SIGN) {
            return "しよう/するだろう";
          } else {
            return "しないだろう";
          }
        } else if (form === verbConstants.POLITE_FORM) {
          if (sign === verbConstants.POSITIVE_SIGN) {
            return "しましょう/するでしょう";
          } else {
            return "しないでしょう";
          }
        }
      } else if (verb.neutralForm === "来る") {
        if (form === verbConstants.PLAIN_FORM) {
          if (sign === verbConstants.POSITIVE_SIGN) {
            return "よう/るだろう";
          } else {
            return "ないだろう";
          }
        } else if (form === verbConstants.POLITE_FORM) {
          if (sign === verbConstants.POSITIVE_SIGN) {
            return "ましょう/るでしょう";
          } else {
            return "ないでしょう";
          }
        }
      } else if (verb.neutralForm === "です") {
        if (form === verbConstants.PLAIN_FORM) {
          if (sign === verbConstants.POSITIVE_SIGN) {
            return "N/A";
          } else {
            return "N/A";
          }
        } else if (form === verbConstants.POLITE_FORM) {
          if (sign === verbConstants.POSITIVE_SIGN) {
            return "N/A";
          } else {
            return "N/A";
          }
        }
      }
  }
}

export function imperative(verb, form, sign) {
  const lastKana = verb.neutralForm.charAt(verb.neutralForm.length - 1);
  switch (verb.groupe) {
    case verbConstants.ICHIDAN_GROUPE:
      if (form === verbConstants.PLAIN_FORM) {
        if (sign === verbConstants.POSITIVE_SIGN) {
          return "ろ";
        } else {
          return "るな";
        }
      }
      //form === verbConstants.POLITE_FORM
      else {
        if (sign === verbConstants.POSITIVE_SIGN) {
          return "てください";
        } else {
          return "ないでください";
        }
      }
    case verbConstants.GODAN_GROUPE:
      switch (lastKana) {
        case "く":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "け";
            } else {
              return "くな";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              if (verb.neutralForm === "行く") {
                return "ってください";
              } else {
                return "いてください";
              }
            } else {
              return "かないでください";
            }
          }
          break;
        case "ぐ":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "げ";
            } else {
              return "ぐな";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "いでください";
            } else {
              return "がないでください";
            }
          }
          break;
        case "す":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "せ";
            } else {
              return "すな";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "してください";
            } else {
              return "さないでください";
            }
          }
          break;
        case "む":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "め";
            } else {
              return "むな";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "んでください";
            } else {
              return "まないでください";
            }
          }
          break;
        case "ぬ":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "ね";
            } else {
              return "ぬな";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "んでください";
            } else {
              return "なないでください";
            }
          }
          break;
        case "ぶ":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "べ";
            } else {
              return "ぶな";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "んでください";
            } else {
              return "ばないでください";
            }
          }
          break;
        case "つ":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "て";
            } else {
              return "つな";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "ってください";
            } else {
              return "たないでください";
            }
          }
          break;
        case "う":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "え";
            } else {
              return "うな";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "ってください";
            } else {
              return "わないでください";
            }
          }
          break;
        default:
          // case る
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "れ";
            } else {
              return "るな";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "ってください";
            } else {
              return "らないでください";
            }
          }
      }
      break;
    default:
      if (verb.neutralForm === "する" || verb.neutralForm === "為る") {
        if (form === verbConstants.PLAIN_FORM) {
          if (sign === verbConstants.POSITIVE_SIGN) {
            return "しろ";
          } else {
            return "するな";
          }
        } else if (form === verbConstants.POLITE_FORM) {
          if (sign === verbConstants.POSITIVE_SIGN) {
            return "してください";
          } else {
            return "しないでください";
          }
        }
      } else if (verb.neutralForm === "来る") {
        if (form === verbConstants.PLAIN_FORM) {
          if (sign === verbConstants.POSITIVE_SIGN) {
            return "来い";
          } else {
            return "来るな";
          }
        } else if (form === verbConstants.POLITE_FORM) {
          if (sign === verbConstants.POSITIVE_SIGN) {
            return "来てください";
          } else {
            return "来ないでください";
          }
        }
      } else if (verb.neutralForm === "です") {
        if (form === verbConstants.PLAIN_FORM) {
          if (sign === verbConstants.POSITIVE_SIGN) {
            return "N/A";
          } else {
            return "N/A";
          }
        } else if (form === verbConstants.POLITE_FORM) {
          if (sign === verbConstants.POSITIVE_SIGN) {
            return "N/A";
          } else {
            return "N/A";
          }
        }
      }
  }
}

export function pastIndicative(verb, form, sign) {
  const lastKana = verb.neutralForm.charAt(verb.neutralForm.length - 1);
  switch (verb.groupe) {
    case verbConstants.ICHIDAN_GROUPE:
      if (form === verbConstants.PLAIN_FORM) {
        if (sign === verbConstants.POSITIVE_SIGN) {
          return "た";
        } else {
          return "なかった";
        }
      }
      //form === verbConstants.POLITE_FORM
      else {
        if (sign === verbConstants.POSITIVE_SIGN) {
          return "ました";
        } else {
          return "ませんでした";
        }
      }
    case verbConstants.GODAN_GROUPE:
      switch (lastKana) {
        case "く":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              if (verb.neutralForm === "行く") {
                return "った";
              } else {
                return "いた";
              }
            } else {
              return "かなかった";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "きました";
            } else {
              return "きませんでした";
            }
          }
          break;
        case "ぐ":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "いだ";
            } else {
              return "ぐがなかった";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "ぎました";
            } else {
              return "ぎませんでした";
            }
          }
          break;
        case "す":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "した";
            } else {
              return "さなかった";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "しました";
            } else {
              return "しませんでした";
            }
          }
          break;
        case "む":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "んだ";
            } else {
              return "まなかった";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "みました";
            } else {
              return "みませんでした";
            }
          }
          break;
        case "ぬ":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "んだ";
            } else {
              return "ななかった";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "にました";
            } else {
              return "にませんでした";
            }
          }
          break;
        case "ぶ":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "んだ";
            } else {
              return "ばなかった";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "びました";
            } else {
              return "びませんでした";
            }
          }
          break;
        case "つ":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "った";
            } else {
              return "たなかった";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "ちました";
            } else {
              return "ちませんでした";
            }
          }
          break;
        case "う":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "った";
            } else {
              return "わなかった";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "いました";
            } else {
              return "いませんでした";
            }
          }
          break;
        default:
          // case る
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "った";
            } else {
              return "らなかった";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "りました";
            } else {
              return "りませんでした";
            }
          }
      }
      break;
    default:
      if (verb.neutralForm === "する" || verb.neutralForm === "為る") {
        if (form === verbConstants.PLAIN_FORM) {
          if (sign === verbConstants.POSITIVE_SIGN) {
            return "した";
          } else {
            return "しなかった";
          }
        } else if (form === verbConstants.POLITE_FORM) {
          if (sign === verbConstants.POSITIVE_SIGN) {
            return "しました";
          } else {
            return "しませんでした";
          }
        }
      } else if (verb.neutralForm === "来る") {
        if (form === verbConstants.PLAIN_FORM) {
          if (sign === verbConstants.POSITIVE_SIGN) {
            return "た";
          } else {
            return "なかった";
          }
        } else if (form === verbConstants.POLITE_FORM) {
          if (sign === verbConstants.POSITIVE_SIGN) {
            return "ました";
          } else {
            return "ませんでした";
          }
        }
      } else if (verb.neutralForm === "です") {
        if (form === verbConstants.PLAIN_FORM) {
          if (sign === verbConstants.POSITIVE_SIGN) {
            return "だった";
          } else {
            return "ではなかった";
          }
        } else if (form === verbConstants.POLITE_FORM) {
          if (sign === verbConstants.POSITIVE_SIGN) {
            return "でした";
          } else {
            return "ではありませんでした";
          }
        }
      }
  }
}

export function pastPresumptive(verb, form, sign) {
  const lastKana = verb.neutralForm.charAt(verb.neutralForm.length - 1);
  switch (verb.groupe) {
    case verbConstants.ICHIDAN_GROUPE:
      if (form === verbConstants.PLAIN_FORM) {
        if (sign === verbConstants.POSITIVE_SIGN) {
          return "たろう";
        } else {
          return "なかっただろう";
        }
      }
      //form === verbConstants.POLITE_FORM
      else {
        if (sign === verbConstants.POSITIVE_SIGN) {
          return "たでしょう";
        } else {
          return "なかったでしょう";
        }
      }
    case verbConstants.GODAN_GROUPE:
      switch (lastKana) {
        case "く":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              if (verb.neutralForm === "行く") {
                return "ったろう/っただろう";
              } else {
                return "いたろう/いただろう";
              }
            } else {
              return "かなかっただろう";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              if (verb.neutralForm === "行く") {
                return "ったでしょう";
              } else {
                return "いたでしょう";
              }
            } else {
              return "かなかったでしょう";
            }
          }
          break;
        case "ぐ":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "いだろう/いだだろう";
            } else {
              return "がなかっただろう";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "いだでしょう";
            } else {
              return "がなかったでしょう";
            }
          }
          break;
        case "す":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "したろう/しただろう";
            } else {
              return "さなかっただろう";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "したでしょう";
            } else {
              return "さなかったでしょう";
            }
          }
          break;
        case "む":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "んだろう/んだだろう";
            } else {
              return "まなかっただろう";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "んだでしょう";
            } else {
              return "まなかったでしょう";
            }
          }
          break;
        case "ぬ":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "んだろう/んだだろう";
            } else {
              return "ななかっただろう";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "んだでしょう";
            } else {
              return "ななかったでしょう";
            }
          }
          break;
        case "ぶ":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "んだろう/んだだろう";
            } else {
              return "ばなかっただろう";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "んだでしょう";
            } else {
              return "ばなかったでしょう";
            }
          }
          break;
        case "つ":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "ったろう/っただろう";
            } else {
              return "たなかっただろう";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "ったでしょう";
            } else {
              return "たなかったでしょう";
            }
          }
          break;
        case "う":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "ったろう/っただろう";
            } else {
              return "わなかっただろう";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "ったでしょう";
            } else {
              return "わなかったでしょう";
            }
          }
          break;
        default:
          // case る
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "ったろう/っただろう";
            } else {
              return "らなかっただろう";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "ったでしょう";
            } else {
              return "らなかったでしょう";
            }
          }
      }
      break;
    default:
      if (verb.neutralForm === "する" || verb.neutralForm === "為る") {
        if (form === verbConstants.PLAIN_FORM) {
          if (sign === verbConstants.POSITIVE_SIGN) {
            return "したろう/しただろう";
          } else {
            return "しなかっただろう";
          }
        } else if (form === verbConstants.POLITE_FORM) {
          if (sign === verbConstants.POSITIVE_SIGN) {
            return "しましたろう";
          } else {
            return "しなかたでしょう";
          }
        }
      } else if (verb.neutralForm === "来る") {
        if (form === verbConstants.PLAIN_FORM) {
          if (sign === verbConstants.POSITIVE_SIGN) {
            return "たろう/ただろう";
          } else {
            return "なかっただろう";
          }
        } else if (form === verbConstants.POLITE_FORM) {
          if (sign === verbConstants.POSITIVE_SIGN) {
            return "たでしょう";
          } else {
            return "なかったでしょう";
          }
        }
      } else if (verb.neutralForm === "です") {
        if (form === verbConstants.PLAIN_FORM) {
          if (sign === verbConstants.POSITIVE_SIGN) {
            return "だろう";
          } else {
            return "ではないだろう";
          }
        } else if (form === verbConstants.POLITE_FORM) {
          if (sign === verbConstants.POSITIVE_SIGN) {
            return "でしょう";
          } else {
            return "ではないでしょう";
          }
        }
      }
  }
}

export function presentProgressive(verb, form, sign) {
  const lastKana = verb.neutralForm.charAt(verb.neutralForm.length - 1);
  switch (verb.groupe) {
    case verbConstants.ICHIDAN_GROUPE:
      if (form === verbConstants.PLAIN_FORM) {
        if (sign === verbConstants.POSITIVE_SIGN) {
          return "ている";
        } else {
          return "ていない";
        }
      }
      //form === verbConstants.POLITE_FORM
      else {
        if (sign === verbConstants.POSITIVE_SIGN) {
          return "ています";
        } else {
          return "ていません";
        }
      }
    case verbConstants.GODAN_GROUPE:
      switch (lastKana) {
        case "く":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              if (verb.neutralForm === "行く") {
                return "っている";
              } else {
                return "いている";
              }
            } else {
              if (verb.neutralForm === "行く") {
                return "っていない";
              } else {
                return "いていない";
              }
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              if (verb.neutralForm === "行く") {
                return "っています";
              } else {
                return "いています";
              }
            } else {
              if (verb.neutralForm === "行く") {
                return "っていません";
              } else {
                return "いていません";
              }
            }
          }
          break;
        case "ぐ":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "いでいる";
            } else {
              return "いでいない";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "いでいます";
            } else {
              return "いでいません";
            }
          }
          break;
        case "す":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "している";
            } else {
              return "していない";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "しています";
            } else {
              return "していません";
            }
          }
          break;
        case "む":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "んでいる";
            } else {
              return "んでいない";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "んでいます";
            } else {
              return "んでいません";
            }
          }
          break;
        case "ぬ":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "んでいる";
            } else {
              return "んでいない";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "んでいます";
            } else {
              return "んでいません";
            }
          }
          break;
        case "ぶ":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "んでいる";
            } else {
              return "んでいない";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "んでいます";
            } else {
              return "んでいません";
            }
          }
          break;
        case "つ":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "っている";
            } else {
              return "っていない";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "っています";
            } else {
              return "っていません";
            }
          }
          break;
        case "う":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "っている";
            } else {
              return "っていない";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "っています";
            } else {
              return "っていません";
            }
          }
          break;
        default:
          // case る
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "っている";
            } else {
              return "っていない";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "っています";
            } else {
              return "っていません";
            }
          }
      }
      break;
    default:
      if (verb.neutralForm === "する" || verb.neutralForm === "為る") {
        if (form === verbConstants.PLAIN_FORM) {
          if (sign === verbConstants.POSITIVE_SIGN) {
            return "している";
          } else {
            return "していない";
          }
        } else if (form === verbConstants.POLITE_FORM) {
          if (sign === verbConstants.POSITIVE_SIGN) {
            return "しています";
          } else {
            return "していません";
          }
        }
      } else if (verb.neutralForm === "来る") {
        if (form === verbConstants.PLAIN_FORM) {
          if (sign === verbConstants.POSITIVE_SIGN) {
            return "";
          } else {
            return "";
          }
        } else if (form === verbConstants.POLITE_FORM) {
          if (sign === verbConstants.POSITIVE_SIGN) {
            return "";
          } else {
            return "";
          }
        }
      } else if (verb.neutralForm === "です") {
        if (form === verbConstants.PLAIN_FORM) {
          if (sign === verbConstants.POSITIVE_SIGN) {
            return "N/A";
          } else {
            return "N/A";
          }
        } else if (form === verbConstants.POLITE_FORM) {
          if (sign === verbConstants.POSITIVE_SIGN) {
            return "N/A";
          } else {
            return "N/A";
          }
        }
      }
  }
}

export function pastProgressive(verb, form, sign) {
  const lastKana = verb.neutralForm.charAt(verb.neutralForm.length - 1);
  switch (verb.groupe) {
    case verbConstants.ICHIDAN_GROUPE:
      if (form === verbConstants.PLAIN_FORM) {
        if (sign === verbConstants.POSITIVE_SIGN) {
          return "ていた";
        } else {
          return "ていなかった";
        }
      }
      //form === verbConstants.POLITE_FORM
      else {
        if (sign === verbConstants.POSITIVE_SIGN) {
          return "ていました";
        } else {
          return "ていませんでした";
        }
      }
    case verbConstants.GODAN_GROUPE:
      switch (lastKana) {
        case "く":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              if (verb.neutralForm === "行く") {
                return "っていた";
              } else {
                return "いていた";
              }
            } else {
              if (verb.neutralForm === "行く") {
                return "っていなかった";
              } else {
                return "いていなかった";
              }
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              if (verb.neutralForm === "行く") {
                return "っていました";
              } else {
                return "いていました";
              }
            } else {
              if (verb.neutralForm === "行く") {
                return "っていませんでした";
              } else {
                return "いていませんでした";
              }
            }
          }
          break;
        case "ぐ":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "いでいた";
            } else {
              return "いでいなかった";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "いでいました";
            } else {
              return "いでいませんでした";
            }
          }
          break;
        case "す":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "していた";
            } else {
              return "していなかった";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "していました";
            } else {
              return "していませんでした";
            }
          }
          break;
        case "む":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "んでいた";
            } else {
              return "んでいなかった";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "んでいました";
            } else {
              return "んでいませんでした";
            }
          }
          break;
        case "ぬ":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "んでいた";
            } else {
              return "んでいなかった";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "んでいました";
            } else {
              return "んでいませんでした";
            }
          }
          break;
        case "ぶ":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "んでいた";
            } else {
              return "んでいなかった";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "んでいました";
            } else {
              return "んでいませんでした";
            }
          }
          break;
        case "つ":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "っていた";
            } else {
              return "っていなかった";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "っていました";
            } else {
              return "っていませんでした";
            }
          }
          break;
        case "う":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "っていた";
            } else {
              return "っていなかった";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "っていました";
            } else {
              return "っていませんでした";
            }
          }
          break;
        default:
          // case る
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "っていた";
            } else {
              return "っていなかった";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "っていました";
            } else {
              return "っていませんでした";
            }
          }
      }
      break;
    default:
      if (verb.neutralForm === "する" || verb.neutralForm === "為る") {
        if (form === verbConstants.PLAIN_FORM) {
          if (sign === verbConstants.POSITIVE_SIGN) {
            return "していた";
          } else {
            return "していない";
          }
        } else if (form === verbConstants.POLITE_FORM) {
          if (sign === verbConstants.POSITIVE_SIGN) {
            return "していました";
          } else {
            return "していませんでした";
          }
        }
      } else if (verb.neutralForm === "来る") {
        if (form === verbConstants.PLAIN_FORM) {
          if (sign === verbConstants.POSITIVE_SIGN) {
            return "";
          } else {
            return "";
          }
        } else if (form === verbConstants.POLITE_FORM) {
          if (sign === verbConstants.POSITIVE_SIGN) {
            return "";
          } else {
            return "";
          }
        }
      } else if (verb.neutralForm === "です") {
        if (form === verbConstants.PLAIN_FORM) {
          if (sign === verbConstants.POSITIVE_SIGN) {
            return "N/A";
          } else {
            return "N/A";
          }
        } else if (form === verbConstants.POLITE_FORM) {
          if (sign === verbConstants.POSITIVE_SIGN) {
            return "N/A";
          } else {
            return "N/A";
          }
        }
      }
  }
}

export function provisionalConditionalEba(verb, form, sign) {
  const lastKana = verb.neutralForm.charAt(verb.neutralForm.length - 1);
  switch (verb.groupe) {
    case verbConstants.ICHIDAN_GROUPE:
      if (form === verbConstants.PLAIN_FORM) {
        if (sign === verbConstants.POSITIVE_SIGN) {
          return "れば";
        } else {
          return "なければ";
        }
      }
      //form === verbConstants.POLITE_FORM
      else {
        if (sign === verbConstants.POSITIVE_SIGN) {
          return "N/A";
        } else {
          return "N/A";
        }
      }
    case verbConstants.GODAN_GROUPE:
      switch (lastKana) {
        case "く":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "けば";
            } else {
              return "かなければ";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "N/A";
            } else {
              return "N/A";
            }
          }
          break;
        case "ぐ":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "げば";
            } else {
              return "がなければ";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "N/A";
            } else {
              return "N/A";
            }
          }
          break;
        case "す":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "せば";
            } else {
              return "さなければ";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "N/A";
            } else {
              return "N/A";
            }
          }
          break;
        case "む":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "めば";
            } else {
              return "まなければ";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "N/A";
            } else {
              return "N/A";
            }
          }
          break;
        case "ぬ":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "ねば";
            } else {
              return "ななければ";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "N/A";
            } else {
              return "N/A";
            }
          }
          break;
        case "ぶ":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "べば";
            } else {
              return "ばなければ";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "N/A";
            } else {
              return "N/A";
            }
          }
          break;
        case "つ":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "てば";
            } else {
              return "たなければ";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "N/A";
            } else {
              return "N/A";
            }
          }
          break;
        case "う":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "えば";
            } else {
              return "わなければ";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "N/A";
            } else {
              return "N/A";
            }
          }
          break;
        default:
          // case る
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "れば";
            } else {
              return "らなければ";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "N/A";
            } else {
              return "N/A";
            }
          }
      }
      break;
    default:
      if (verb.neutralForm === "する" || verb.neutralForm === "為る") {
        if (form === verbConstants.PLAIN_FORM) {
          if (sign === verbConstants.POSITIVE_SIGN) {
            return "すれば";
          } else {
            return "しなければ";
          }
        } else if (form === verbConstants.POLITE_FORM) {
          if (sign === verbConstants.POSITIVE_SIGN) {
            return "しませば/しますれば";
          } else {
            return "しませんなら";
          }
        }
      } else if (verb.neutralForm === "来る") {
        if (form === verbConstants.PLAIN_FORM) {
          if (sign === verbConstants.POSITIVE_SIGN) {
            return "れば";
          } else {
            return "なければ";
          }
        } else if (form === verbConstants.POLITE_FORM) {
          if (sign === verbConstants.POSITIVE_SIGN) {
            return "ませば/ますれば";
          } else {
            return "ませんなら";
          }
        }
      } else if (verb.neutralForm === "です") {
        if (form === verbConstants.PLAIN_FORM) {
          if (sign === verbConstants.POSITIVE_SIGN) {
            return "N/A";
          } else {
            return "N/A";
          }
        } else if (form === verbConstants.POLITE_FORM) {
          if (sign === verbConstants.POSITIVE_SIGN) {
            return "N/A";
          } else {
            return "N/A";
          }
        }
      }
  }
}

export function potential(verb, form, sign) {
  const lastKana = verb.neutralForm.charAt(verb.neutralForm.length - 1);
  switch (verb.groupe) {
    case verbConstants.ICHIDAN_GROUPE:
      if (form === verbConstants.PLAIN_FORM) {
        if (sign === verbConstants.POSITIVE_SIGN) {
          return "られる";
        } else {
          return "られない";
        }
      }
      //form === verbConstants.POLITE_FORM
      else {
        if (sign === verbConstants.POSITIVE_SIGN) {
          return "られます";
        } else {
          return "られません";
        }
      }
    case verbConstants.GODAN_GROUPE:
      switch (lastKana) {
        case "く":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "ける";
            } else {
              return "けない";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "けます";
            } else {
              return "けません";
            }
          }
          break;
        case "ぐ":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "げる";
            } else {
              return "げない";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "げます";
            } else {
              return "げません";
            }
          }
          break;
        case "す":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "せる";
            } else {
              return "せない";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "せます";
            } else {
              return "せません";
            }
          }
          break;
        case "む":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "める";
            } else {
              return "めない";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "めます";
            } else {
              return "めません";
            }
          }
          break;
        case "ぬ":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "ねる";
            } else {
              return "ねない";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "ねます";
            } else {
              return "ねません";
            }
          }
          break;
        case "ぶ":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "べる";
            } else {
              return "べない";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "べます";
            } else {
              return "べません";
            }
          }
          break;
        case "つ":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "てる";
            } else {
              return "てない";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "てます";
            } else {
              return "てません";
            }
          }
          break;
        case "う":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "える";
            } else {
              return "えない";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "えます";
            } else {
              return "えません";
            }
          }
          break;
        default:
          // case る
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "れる";
            } else {
              return "れない";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "れます";
            } else {
              return "れません";
            }
          }
      }
      break;
    default:
      if (verb.neutralForm === "する" || verb.neutralForm === "為る") {
        if (form === verbConstants.PLAIN_FORM) {
          if (sign === verbConstants.POSITIVE_SIGN) {
            return "できる";
          } else {
            return "できない";
          }
        } else if (form === verbConstants.POLITE_FORM) {
          if (sign === verbConstants.POSITIVE_SIGN) {
            return "できます";
          } else {
            return "できません";
          }
        }
      } else if (verb.neutralForm === "来る") {
        if (form === verbConstants.PLAIN_FORM) {
          if (sign === verbConstants.POSITIVE_SIGN) {
            return "られる";
          } else {
            return "られない";
          }
        } else if (form === verbConstants.POLITE_FORM) {
          if (sign === verbConstants.POSITIVE_SIGN) {
            return "られます";
          } else {
            return "られません";
          }
        }
      } else if (verb.neutralForm === "です") {
        if (form === verbConstants.PLAIN_FORM) {
          if (sign === verbConstants.POSITIVE_SIGN) {
            return "N/A";
          } else {
            return "N/A";
          }
        } else if (form === verbConstants.POLITE_FORM) {
          if (sign === verbConstants.POSITIVE_SIGN) {
            return "N/A";
          } else {
            return "N/A";
          }
        }
      }
  }
}

export function conditionalTara(verb, form, sign) {
  const lastKana = verb.neutralForm.charAt(verb.neutralForm.length - 1);
  switch (verb.groupe) {
    case verbConstants.ICHIDAN_GROUPE:
      if (form === verbConstants.PLAIN_FORM) {
        if (sign === verbConstants.POSITIVE_SIGN) {
          return "たら";
        } else {
          return "なかったら";
        }
      }
      //form === verbConstants.POLITE_FORM
      else {
        if (sign === verbConstants.POSITIVE_SIGN) {
          return "ましたら";
        } else {
          return "ませんでしたら";
        }
      }
    case verbConstants.GODAN_GROUPE:
      switch (lastKana) {
        case "く":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              if (verb.neutralForm === "行く") {
                return "ったら";
              } else {
                return "いたら";
              }
            } else {
              return "かなかったら";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "きましたら";
            } else {
              return "きませんでしたら";
            }
          }
          break;
        case "ぐ":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "いだら";
            } else {
              return "がなかったら";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "ぎましたら";
            } else {
              return "ぎませんでしたら";
            }
          }
          break;
        case "す":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "したら";
            } else {
              return "さなかったら";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "しましたら";
            } else {
              return "しませんでしたら";
            }
          }
          break;
        case "む":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "んだら";
            } else {
              return "まなかったら";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "みましたら";
            } else {
              return "みませんでしたら";
            }
          }
          break;
        case "ぬ":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "んだら";
            } else {
              return "ななかったら";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "にましたら";
            } else {
              return "にませんでしたら";
            }
          }
          break;
        case "ぶ":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "んだら";
            } else {
              return "ばなかったら";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "びましたら";
            } else {
              return "びませんでしたら";
            }
          }
          break;
        case "つ":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "ったら";
            } else {
              return "たなかったら";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "ちましたら";
            } else {
              return "ちませんでしたら";
            }
          }
          break;
        case "う":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "ったら";
            } else {
              return "わなかったら";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "いましたら";
            } else {
              return "いませんでしたら";
            }
          }
          break;
        default:
          // case る
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "ったら";
            } else {
              return "らなかったら";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "りましたら";
            } else {
              return "りませんでしたら";
            }
          }
      }
      break;
    default:
      if (verb.neutralForm === "する" || verb.neutralForm === "為る") {
        if (form === verbConstants.PLAIN_FORM) {
          if (sign === verbConstants.POSITIVE_SIGN) {
            return "したら";
          } else {
            return "しなかったら";
          }
        } else if (form === verbConstants.POLITE_FORM) {
          if (sign === verbConstants.POSITIVE_SIGN) {
            return "しましたら";
          } else {
            return "しませんでしたら";
          }
        }
      } else if (verb.neutralForm === "来る") {
        if (form === verbConstants.PLAIN_FORM) {
          if (sign === verbConstants.POSITIVE_SIGN) {
            return "たら";
          } else {
            return "なかったら";
          }
        } else if (form === verbConstants.POLITE_FORM) {
          if (sign === verbConstants.POSITIVE_SIGN) {
            return "ましたら";
          } else {
            return "ませんでしたら";
          }
        }
      } else if (verb.neutralForm === "です") {
        if (form === verbConstants.PLAIN_FORM) {
          if (sign === verbConstants.POSITIVE_SIGN) {
            return "N/A";
          } else {
            return "N/A";
          }
        } else if (form === verbConstants.POLITE_FORM) {
          if (sign === verbConstants.POSITIVE_SIGN) {
            return "N/A";
          } else {
            return "N/A";
          }
        }
      }
  }
}

export function causative(verb, form, sign) {
  const lastKana = verb.neutralForm.charAt(verb.neutralForm.length - 1);
  switch (verb.groupe) {
    case verbConstants.ICHIDAN_GROUPE:
      if (form === verbConstants.PLAIN_FORM) {
        if (sign === verbConstants.POSITIVE_SIGN) {
          return "させる";
        } else {
          return "させない";
        }
      }
      //form === verbConstants.POLITE_FORM
      else {
        if (sign === verbConstants.POSITIVE_SIGN) {
          return "させます";
        } else {
          return "させません";
        }
      }
    case verbConstants.GODAN_GROUPE:
      switch (lastKana) {
        case "く":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "かせる";
            } else {
              return "かせない";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "かせます";
            } else {
              return "かせません";
            }
          }
          break;
        case "ぐ":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "がせる";
            } else {
              return "がない";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "がせます";
            } else {
              return "がせません";
            }
          }
          break;
        case "す":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "させる";
            } else {
              return "さない";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "させます";
            } else {
              return "させません";
            }
          }
          break;
        case "む":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "ませる";
            } else {
              return "ませない";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "ませます";
            } else {
              return "ませません";
            }
          }
          break;
        case "ぬ":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "なせる";
            } else {
              return "なせない";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "なせます";
            } else {
              return "なせません";
            }
          }
          break;
        case "ぶ":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "ばせる";
            } else {
              return "ばない";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "ばせます";
            } else {
              return "ばせません";
            }
          }
          break;
        case "つ":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "たせる";
            } else {
              return "たせない";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "たせます";
            } else {
              return "たせません";
            }
          }
          break;
        case "う":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "わせる";
            } else {
              return "わせない";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "わせます";
            } else {
              return "わせません";
            }
          }
          break;
        default:
          // case る
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "らせる";
            } else {
              return "らせない";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "らせます";
            } else {
              return "らせません";
            }
          }
      }
      break;
    default:
      if (verb.neutralForm === "する" || verb.neutralForm === "為る") {
        if (form === verbConstants.PLAIN_FORM) {
          if (sign === verbConstants.POSITIVE_SIGN) {
            return "させる";
          } else {
            return "させない";
          }
        } else if (form === verbConstants.POLITE_FORM) {
          if (sign === verbConstants.POSITIVE_SIGN) {
            return "させます";
          } else {
            return "させません";
          }
        }
      } else if (verb.neutralForm === "来る") {
        if (form === verbConstants.PLAIN_FORM) {
          if (sign === verbConstants.POSITIVE_SIGN) {
            return "させる";
          } else {
            return "させない";
          }
        } else if (form === verbConstants.POLITE_FORM) {
          if (sign === verbConstants.POSITIVE_SIGN) {
            return "させます";
          } else {
            return "させません";
          }
        }
      } else if (verb.neutralForm === "です") {
        if (form === verbConstants.PLAIN_FORM) {
          if (sign === verbConstants.POSITIVE_SIGN) {
            return "N/A";
          } else {
            return "N/A";
          }
        } else if (form === verbConstants.POLITE_FORM) {
          if (sign === verbConstants.POSITIVE_SIGN) {
            return "N/A";
          } else {
            return "N/A";
          }
        }
      }
  }
}

export function passive(verb, form, sign) {
  const lastKana = verb.neutralForm.charAt(verb.neutralForm.length - 1);
  switch (verb.groupe) {
    case verbConstants.ICHIDAN_GROUPE:
      if (form === verbConstants.PLAIN_FORM) {
        if (sign === verbConstants.POSITIVE_SIGN) {
          return "られる";
        } else {
          return "られない";
        }
      }
      //form === verbConstants.POLITE_FORM
      else {
        if (sign === verbConstants.POSITIVE_SIGN) {
          return "られます";
        } else {
          return "られません";
        }
      }
    case verbConstants.GODAN_GROUPE:
      switch (lastKana) {
        case "く":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "かれる";
            } else {
              return "かれない";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "かれます";
            } else {
              return "かれません";
            }
          }
          break;
        case "ぐ":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "がれる";
            } else {
              return "がれない";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "がれます";
            } else {
              return "がれません";
            }
          }
          break;
        case "す":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "される";
            } else {
              return "されない";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "されます";
            } else {
              return "されません";
            }
          }
          break;
        case "む":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "まれる";
            } else {
              return "まれない";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "まれます";
            } else {
              return "まれません";
            }
          }
          break;
        case "ぬ":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "なれる";
            } else {
              return "なれない";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "なれます";
            } else {
              return "なれません";
            }
          }
          break;
        case "ぶ":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "ばれる";
            } else {
              return "ばれない";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "ばれます";
            } else {
              return "ばれません";
            }
          }
          break;
        case "つ":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "たれる";
            } else {
              return "たれない";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "たれます";
            } else {
              return "たれません";
            }
          }
          break;
        case "う":
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "われる";
            } else {
              return "われない";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "われます";
            } else {
              return "われません";
            }
          }
          break;
        default:
          // case る
          if (form === verbConstants.PLAIN_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "られる";
            } else {
              return "られない";
            }
          } else if (form === verbConstants.POLITE_FORM) {
            if (sign === verbConstants.POSITIVE_SIGN) {
              return "られます";
            } else {
              return "られません";
            }
          }
      }
      break;
    default:
      if (verb.neutralForm === "する" || verb.neutralForm === "為る") {
        if (form === verbConstants.PLAIN_FORM) {
          if (sign === verbConstants.POSITIVE_SIGN) {
            return "される";
          } else {
            return "されない";
          }
        } else if (form === verbConstants.POLITE_FORM) {
          if (sign === verbConstants.POSITIVE_SIGN) {
            return "されます";
          } else {
            return "されません";
          }
        }
      } else if (verb.neutralForm === "来る") {
        if (form === verbConstants.PLAIN_FORM) {
          if (sign === verbConstants.POSITIVE_SIGN) {
            return "られる";
          } else {
            return "られない";
          }
        } else if (form === verbConstants.POLITE_FORM) {
          if (sign === verbConstants.POSITIVE_SIGN) {
            return "られます";
          } else {
            return "られません";
          }
        }
      } else if (verb.neutralForm === "です") {
        if (form === verbConstants.PLAIN_FORM) {
          if (sign === verbConstants.POSITIVE_SIGN) {
            return "N/A";
          } else {
            return "N/A";
          }
        } else if (form === verbConstants.POLITE_FORM) {
          if (sign === verbConstants.POSITIVE_SIGN) {
            return "N/A";
          } else {
            return "N/A";
          }
        }
      }
  }
}
