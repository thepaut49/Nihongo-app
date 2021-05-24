import * as types from "../actions/actionTypes";
import initialState from "./initialState";

// on a pas mis de nom pour l'export du coup quand on l'importe
// dans un autre fichier on peut lui donner le nom que l'on
// souhaite

export default function grammarRuleReducer(
  state = initialState.grammarRules,
  action
) {
  switch (action.type) {
    case types.CREATE_GRAMMAR_RULE_SUCCESS:
      return [...state, { ...action.grammarRule }];
    case types.UPDATE_GRAMMAR_RULE_SUCCESS:
      return state.map((grammarRule) =>
        grammarRule.id === action.grammarRule.id
          ? action.grammarRule
          : grammarRule
      );
    case types.LOAD_GRAMMAR_RULES_SUCCESS:
      return action.grammarRules;
    case types.DELETE_GRAMMAR_RULE_OPTIMISTIC:
      return state.filter(
        (grammarRule) => grammarRule.id !== action.grammarRule.id
      );
    default:
      return state;
  }
}
