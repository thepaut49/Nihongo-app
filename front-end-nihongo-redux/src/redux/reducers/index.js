import { combineReducers } from "redux";
import counters from "./counterReducer";
import iAdjectives from "./iAdjectiveReducer";
import kanjis from "./kanjiReducer";
import grammarRules from "./grammarRuleReducer";
import naAdjectives from "./naAdjectiveReducer";
import names from "./nameReducer";
import particules from "./particuleReducer";
import sentences from "./sentenceReducer";
import suffixs from "./suffixReducer";
import verbs from "./verbReducer";
import words from "./wordReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  counters,
  grammarRules,
  iAdjectives,
  kanjis,
  naAdjectives,
  names,
  particules,
  sentences,
  suffixs,
  verbs,
  words,
  apiCallsInProgress,
});

export default rootReducer;
