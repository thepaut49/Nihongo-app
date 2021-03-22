import { EventEmitter } from "events";
import Dispatcher from "../appDispatcher";
import actionTypes from "../actions/actionTypes";

const CHANGE_EVENT = "change";
let _sentences = [];

class SentenceStore extends EventEmitter {
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  getSentences() {
    return _sentences;
  }

  getSentenceByKanjis(kanjis) {
    return _sentences.find((sentence) => sentence.kanjis === kanjis);
  }
}

const store = new SentenceStore();
Dispatcher.register((action) => {
  switch (action.actionType) {
    case actionTypes.CREATE_SENTENCE:
      _sentences.push(action.sentence);
      store.emitChange();
      break;
    case actionTypes.UPDATE_SENTENCE:
      _sentences = _sentences.map((sentence) =>
        sentence.id === action.sentence.id ? action.sentence : sentence
      );
      store.emitChange();
      break;
    case actionTypes.LOAD_SENTENCES:
      _sentences = action.sentences;
      store.emitChange();
      break;
    case actionTypes.DELETE_SENTENCE:
      _sentences = _sentences.filter(
        (sentence) => sentence.id !== parseInt(action.id, 10)
      );
      store.emitChange();
      break;
    case actionTypes.FILTER_SENTENCES:
      _sentences = action.sentences;
      store.emitChange();
      break;
    default:
    // nothing to do here
  }
});
export default store;
