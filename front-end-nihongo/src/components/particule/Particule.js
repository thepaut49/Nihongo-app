import React from "react";
import PropTypes from "prop-types";

const grammarruleListStyle = {
  borderRadius: "10px",
  backgroundColor: "rgba(38, 113, 22, 0.48)",
  margin: "0.5em",
  padding: "0.5em",
};

const grammarruleTitleStyle = {
  fontWeight: "bold",
  fontSize: "xxx-large",
};

function GrammarRule(props) {
  const grammarRule = props.grammarRule;

  return (
    <div style={grammarruleListStyle}>
      <div style={grammarruleTitleStyle}>
        <h2>The Japanese particle {grammarRule.kanjis}</h2>
      </div>

      <div>
        <h2>Summary</h2>
        {grammarRule.summary}

        <h2>Function of the {grammarRule.kanjis}</h2>
        {grammarRule.function}

        <h2>How to use the particle {grammarRule.kanjis}</h2>
        {grammarRule.howToUse}

        <h2>
          Japanese Examples SENTENCES with the particle {grammarRule.kanjis}
        </h2>
        <div
          dangerouslySetInnerHTML={{
            __html: grammarRule.examples,
          }}
        />
      </div>
    </div>
  );
}

GrammarRule.propTypes = {
  grammarRule: PropTypes.object.isRequired,
};

export default GrammarRule;
