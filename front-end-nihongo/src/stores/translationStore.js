import { EventEmitter } from "events";
import Dispatcher from "../appDispatcher";
import actionTypes from "../actions/actionTypes";
import * as translationApi from "../api/translationApi";
import translationConstants from "../components/common/translationConstants";

const CHANGE_EVENT = "change";
let _sentence = "";
let _quantity = 50;
let _typeSelect = translationConstants.DEFAULT_TYPE;
let _listObjects = translationApi.getMostUsedObject(_typeSelect, _quantity);
let _listParts = [];
let _listOfKanjis = [];

class TranslationStore extends EventEmitter {
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  getListParts() {
    return _listParts;
  }

  getListOfKanjis() {
    return _listOfKanjis;
  }

  getListObjects() {
    return _listObjects;
  }

  getSentence() {
    return _sentence;
  }

  getQuantity() {
    return _quantity;
  }

  getTypeSelect() {
    return _typeSelect;
  }
}

const store = new TranslationStore();
Dispatcher.register((action) => {
  switch (action.actionType) {
    case actionTypes.UPDATE_SENTENCE:
      _sentence = action.sentence;
      store.emitChange();
      break;
    case actionTypes.UPDATE_QUANTITY:
      _quantity = action.quantity;
      store.emitChange();
      break;
    case actionTypes.UPDATE_TYPE_OF_OBJECT:
      _typeSelect = action.typeSelect;
      store.emitChange();
      break;
    case actionTypes.LOAD_LIST_OBJECT:
      _listObjects = action.listObjects;
      store.emitChange();
      break;
    case actionTypes.LOAD_PARTS:
      _listParts = action.listParts;
      store.emitChange();
      break;
    case actionTypes.EXTRACT_KANJI_FROM_SENTENCE:
      _listOfKanjis = action.listOfKanjis;
      store.emitChange();
      break;
    case actionTypes.CLEAR_TRANSLATION:
      _listOfKanjis = [];
      _listParts = [];
      store.emitChange();
      break;
    default:
    // nothing to do here
  }
});
export default store;
