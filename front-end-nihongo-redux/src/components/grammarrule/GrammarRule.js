import React from "react";
import PropTypes from "prop-types";

function GrammarRule(props) {
  const grammarRule = props.grammarRule;

  return (
    <div key={grammarRule.id} className="grammarRuleListStyle">
      <div className="grammarRuleTitleStyle">{grammarRule.title}</div>

      <div>
        <h2>Description</h2>
        <div
          dangerouslySetInnerHTML={{
            __html: grammarRule.htmlDescription,
          }}
        />

        <h2>Keywords</h2>
        <ul className="keywordStyle">
          <li>{grammarRule.firstKeyWord}</li>
          {grammarRule.secondKeyWord && <li>{grammarRule.secondKeyWord}</li>}

          {grammarRule.thirdKeyWord && <li>{grammarRule.thirdKeyWord}</li>}

          {grammarRule.fourthKeyWord && <li>{grammarRule.fourthKeyWord}</li>}
        </ul>
      </div>
    </div>
  );
}

GrammarRule.propTypes = {
  grammarRule: PropTypes.object.isRequired,
};

export default GrammarRule;
