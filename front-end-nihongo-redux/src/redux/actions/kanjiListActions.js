import * as kanjiApi from "../../api/kanjiApi";
import * as types from "./actionTypes";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function filterKanjiSuccess(kanjis) {
  return { type: types.FILTER_KANJIS_SUCCESS, kanjis };
}

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

export function filterKanjis(kanjiCriteria) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return kanjiApi
      .filterKanjis(kanjiCriteria)
      .then((kanjis) => {
        dispatch(filterKanjiSuccess(kanjis));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
