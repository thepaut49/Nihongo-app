import { combineReducers } from "redux";
import counters from "./counterReducer";
import kanjis from "./kanjiReducer";
import grammarRules from "./grammarRuleReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  kanjis,
  counters,
  grammarRules,
  apiCallsInProgress,
});

export default rootReducer;
