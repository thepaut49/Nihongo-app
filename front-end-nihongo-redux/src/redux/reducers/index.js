import { combineReducers } from "redux";
import counters from "./counterReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  counters,
  apiCallsInProgress,
});

export default rootReducer;
