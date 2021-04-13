import { EventEmitter } from "events";
import Dispatcher from "../appDispatcher";
import actionTypes from "../actions/actionTypes";

const CHANGE_EVENT = "change";
let _suffixs = [];

class SuffixStore extends EventEmitter {
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  getSuffixs() {
    return _suffixs;
  }

  getSuffixByKanjis(kanjis) {
    return _suffixs.find((suffix) => suffix.kanjis === kanjis);
  }
}

const store = new SuffixStore();
Dispatcher.register((action) => {
  switch (action.actionType) {
    case actionTypes.CREATE_SUFFIX:
      _suffixs.push(action.suffix);
      store.emitChange();
      break;
    case actionTypes.UPDATE_SUFFIX:
      _suffixs = _suffixs.map((suffix) =>
        suffix.id === action.suffix.id ? action.suffix : suffix
      );
      store.emitChange();
      break;
    case actionTypes.LOAD_SUFFIXS:
      _suffixs = action.suffixs;
      store.emitChange();
      break;
    case actionTypes.DELETE_SUFFIX:
      _suffixs = _suffixs.filter(
        (suffix) => suffix.id !== parseInt(action.id, 10)
      );
      store.emitChange();
      break;
    default:
    // nothing to do here
  }
});
export default store;
