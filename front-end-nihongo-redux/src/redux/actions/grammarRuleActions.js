import * as grammarRuleApi from "../../api/grammarRuleApi";
import * as types from "./actionTypes";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadGrammarRuleSuccess(grammarRules) {
  return { type: types.LOAD_GRAMMAR_RULES_SUCCESS, grammarRules };
}

export function createGrammarRuleSuccess(grammarRule) {
  return { type: types.CREATE_GRAMMAR_RULE_SUCCESS, grammarRule };
}

export function updateGrammarRuleSuccess(grammarRule) {
  return { type: types.UPDATE_GRAMMAR_RULE_SUCCESS, grammarRule };
}

export function deleteGrammarRuleOptimistic(grammarRule) {
  return { type: types.DELETE_GRAMMAR_RULE_OPTIMISTIC, grammarRule };
}

export function loadGrammarRules() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return grammarRuleApi
      .getGrammarRules()
      .then((grammarRules) => {
        dispatch(loadGrammarRuleSuccess(grammarRules));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function saveGrammarRule(grammarRule) {
  //eslint-disable-next-line no-unused-vars
  return function (dispatch, getState) {
    dispatch(beginApiCall());
    return grammarRuleApi
      .saveGrammarRule(grammarRule)
      .then((savedGrammarRule) => {
        grammarRule.id
          ? dispatch(updateGrammarRuleSuccess(savedGrammarRule))
          : dispatch(createGrammarRuleSuccess(savedGrammarRule));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function deleteGrammarRule(grammarRule) {
  return function (dispatch) {
    // Doing optimistic delete, so not dispatching begin/end api call
    // actions, or apiCallError action since we're not showing the loading status for this.
    dispatch(deleteGrammarRuleOptimistic(grammarRule));
    return grammarRuleApi.deleteGrammarRule(grammarRule.id);
  };
}
