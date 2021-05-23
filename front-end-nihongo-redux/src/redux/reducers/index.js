import { combineReducers } from "redux";
import counters from "./counterReducer";
import kanjis from "./kanjiReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  kanjis,
  counters,
  apiCallsInProgress,
});

export default rootReducer;
