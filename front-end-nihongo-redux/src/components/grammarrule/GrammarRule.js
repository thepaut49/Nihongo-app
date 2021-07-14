import React from "react";
import PropTypes from "prop-types";

const grammarRuleListStyle = {
  borderRadius: "10px",
  backgroundColor: "var(--fourth-bg-color)",
  margin: "0.5em",
  padding: "0.5em",
};

const grammarRuleTitleStyle = {
  fontWeight: "bold",
  fontSize: "xxx-large",
};

const keywordStyle = {
  fontWeight: "bold",
  fontSize: "large",
};

function GrammarRule(props) {
  const grammarRule = props.grammarRule;

  return (
    <div key={grammarRule.id} style={grammarRuleListStyle}>
      <div style={grammarRuleTitleStyle}>
        <h2>{grammarRule.title}</h2>
      </div>

      <div>
        <h3>Description</h3>
        <div
          dangerouslySetInnerHTML={{
            __html: grammarRule.htmlDescription,
          }}
        />

        <h3>Keywords</h3>
        <ul style={keywordStyle}>
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
