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
import translation from "./translationReducer";
import iAdjectivesList from "./iAdjectiveListReducer";
import naAdjectivesList from "./naAdjectiveListReducer";
import namesList from "./nameListReducer";
import kanjisList from "./kanjiListReducer";
import verbsList from "./verbListReducer";
import wordsList from "./wordListReducer";
import sentencesList from "./sentenceListReducer";
import countersList from "./counterListReducer";
import messages from "./messageReducer";
import visitStats from "./visitStatsReducer";
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
  translation,
  verbs,
  words,
  messages,
  visitStats,
  // reducer for list
  iAdjectivesList,
  kanjisList,
  naAdjectivesList,
  namesList,
  sentencesList,
  verbsList,
  wordsList,
  countersList,
  apiCallsInProgress,
});

export default rootReducer;
