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
  //Liste pour filtrage
  countersList: [],
  iAdjectivesList: [],
  kanjisList: [],
  naAdjectivesList: [],
  namesList: [],
  sentencesList: [],
  verbsList: [],
  wordsList: [],
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
  apiCallsInProgress: 0,
};
