import translationConstants from "../../components/common/translationConstants";

export default {
  counters: [],
  grammarRules: [],
  iAdjectives: [],
  kanjis: [],
  naAdjectives: [],
  names: [],
  particules: [],
  sentences: [],
  suffixs: [],
  verbs: [],
  words: [],
  //partie translation
  translation: {
    sentence: "",
    quantity: 50,
    typeSelect: translationConstants.DEFAULT_TYPE,
    listObjects: [],
    listParts: [],
    listOfKanjis: [],
    listOfGrammarRules: [],
  },
  messages: [],
  visitStats: [],
  apiCallsInProgress: 0,
};
