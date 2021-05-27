import { combineReducers } from "redux";
import counters from "./counterReducer";
import iAdjectives from "./iAdjectiveReducer";
import kanjis from "./kanjiReducer";
import grammarRules from "./grammarRuleReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  counters,
  iAdjectives,
  kanjis,
  grammarRules,
  apiCallsInProgress,
});

export default rootReducer;
