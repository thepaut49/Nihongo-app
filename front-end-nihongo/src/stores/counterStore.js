import { EventEmitter } from "events";
import Dispatcher from "../appDispatcher";
import actionTypes from "../actions/actionTypes";

const CHANGE_EVENT = "change";
let _counters = [];

class CounterStore extends EventEmitter {
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  getCounters() {
    return _counters;
  }

  getCounterByKanjis(kanjis) {
    return _counters.find((counter) => counter.kanjis === kanjis);
  }
}

const store = new CounterStore();
Dispatcher.register((action) => {
  switch (action.actionType) {
    case actionTypes.CREATE_COUNTER:
      _counters.push(action.counter);
      store.emitChange();
      break;
    case actionTypes.UPDATE_COUNTER:
      _counters = _counters.map((counter) =>
        counter.id === action.counter.id ? action.counter : counter
      );
      store.emitChange();
      break;
    case actionTypes.LOAD_COUNTERS:
      _counters = action.counters;
      store.emitChange();
      break;
    case actionTypes.DELETE_COUNTER:
      _counters = _counters.filter(
        (counter) => counter.id !== parseInt(action.id, 10)
      );
      store.emitChange();
      break;
    case actionTypes.FILTER_COUNTERS:
      _counters = action.counters;
      store.emitChange();
      break;
    default:
    // nothing to do here
  }
});
export default store;
