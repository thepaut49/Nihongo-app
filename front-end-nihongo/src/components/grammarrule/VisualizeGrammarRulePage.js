import React, { useState, useEffect } from "react";
import GrammarRule from "./GrammarRule";
import grammarRuleStore from "../../stores/grammarRuleStore";
import { loadGrammarRules } from "../../actions/grammarRuleActions";

const VisualizeGrammarRulePage = (props) => {
  const grammarRule = grammarRuleStore.getGrammarRuleByTitle(
    props.match.params.title
  );
  const [grammarRules, setGrammarRules] = useState(
    grammarRuleStore.getGrammarRules()
  );

  useEffect(() => {
    grammarRuleStore.addChangeListener(onChangeGrammarRules);

    if (grammarRuleStore.getGrammarRules().length === 0) loadGrammarRules();

    return function () {
      grammarRuleStore.removeChangeListener(onChangeGrammarRules);
    };
  }, [grammarRule, grammarRules.length]);

  function onChangeGrammarRules() {
    setGrammarRules(grammarRuleStore.getGrammarRules());
  }

  return (
    <>
      <h2>Grammar Rule</h2>
      {grammarRule && <GrammarRule grammarRule={grammarRule} />}
    </>
  );
};

export default VisualizeGrammarRulePage;
