import * as kanjiApi from "../../api/kanjiApi";
import * as types from "./actionTypes";
import { beginApiCall, apiCallError } from "./apiStatusActions";
import * as kanjiListActions from "./kanjiListActions";

export function loadKanjiSuccess(kanjis) {
  return { type: types.LOAD_KANJIS_SUCCESS, kanjis };
}

export function createKanjiSuccess(kanji) {
  return { type: types.CREATE_KANJI_SUCCESS, kanji };
}

export function updateKanjiSuccess(kanji) {
  return { type: types.UPDATE_KANJI_SUCCESS, kanji };
}

export function deleteKanjiOptimistic(kanji) {
  return { type: types.DELETE_KANJI_OPTIMISTIC, kanji };
}

export function loadKanjis() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return kanjiApi
      .getKanjis()
      .then((kanjis) => {
        dispatch(loadKanjiSuccess(kanjis));
        dispatch(kanjiListActions.loadKanjiSuccess(kanjis));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function saveKanji(kanji) {
  //eslint-disable-next-line no-unused-vars
  return function (dispatch, getState) {
    dispatch(beginApiCall());
    return kanjiApi
      .saveKanji(kanji)
      .then((savedKanji) => {
        if (kanji.id) {
          dispatch(updateKanjiSuccess(savedKanji));
          dispatch(kanjiListActions.updateKanjiSuccess(savedKanji));
        } else {
          dispatch(createKanjiSuccess(savedKanji));
          dispatch(kanjiListActions.createKanjiSuccess(savedKanji));
        }
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function deleteKanji(kanji) {
  return function (dispatch) {
    // Doing optimistic delete, so not dispatching begin/end api call
    // actions, or apiCallError action since we're not showing the loading status for this.
    dispatch(deleteKanjiOptimistic(kanji));
    dispatch(kanjiListActions.deleteKanjiOptimistic(kanji));
    return kanjiApi.deleteKanji(kanji.id);
  };
}

export function updateNumberOfUse(id) {
  //eslint-disable-next-line no-unused-vars
  return function (dispatch, getState) {
    dispatch(beginApiCall());
    return kanjiApi
      .updateNumberOfUse(id)
      .then((savedKanji) => {
        dispatch(updateKanjiSuccess(savedKanji));
        dispatch(kanjiListActions.updateKanjiSuccess(savedKanji));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
