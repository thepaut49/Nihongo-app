import React from "react";
import "./VerbConjugationTable.css";
import PropTypes from "prop-types";

const PLAIN_FORM = "Plain";
const POLITE_FORM = "Polite";
const NEGATIVE_SIGN = "Negative";
const POSITIVE_SIGN = "Positive";

const spanStyle = {
  margin: "auto",
  textAlign: "center",
};

function Tense(props) {
  const verb = props.verb;
  const stem = verb.neutralForm.substring(0, verb.neutralForm.length - 1);
  const tense = props.tense;
  const tenseFunction = props.tenseFunction;
  const verbEndingPlainPositive = tenseFunction.call(
    this,
    verb,
    PLAIN_FORM,
    POSITIVE_SIGN
  );
  const verbEndingPolitePositive = tenseFunction.call(
    this,
    verb,
    POLITE_FORM,
    POSITIVE_SIGN
  );
  const verbEndingPlainNegative = tenseFunction.call(
    this,
    verb,
    PLAIN_FORM,
    NEGATIVE_SIGN
  );
  const verbEndingPoliteNegative = tenseFunction.call(
    this,
    verb,
    POLITE_FORM,
    NEGATIVE_SIGN
  );

  function isSuru(verb) {
    return verb.neutralForm === "する" ? true : false;
  }

  return (
    <div className="tenseGrid">
      <div className="tense">
        <p style={spanStyle}>{tense}</p>
      </div>
      <div className="empty"></div>
      <div className="positive">Positive</div>
      <div className="negative">Negative</div>
      <div className="plain">Plain</div>
      <div className="polite">Polite</div>
      <div className="plainpositive">
        <span className="stem">{isSuru(verb.neutralForm) || stem}</span>
        <span className="ending">{verbEndingPlainPositive}</span>
      </div>
      <div className="plainnegative">
        <span className="stem">{isSuru(verb.neutralForm) || stem}</span>
        <span className="ending">{verbEndingPlainNegative}</span>
      </div>
      <div className="politepositive">
        <span className="stem">{isSuru(verb.neutralForm) || stem}</span>
        <span className="ending">{verbEndingPolitePositive}</span>
      </div>
      <div className="politenegative">
        <span className="stem">{isSuru(verb.neutralForm) || stem}</span>
        <span className="ending">{verbEndingPoliteNegative}</span>
      </div>
    </div>
  );
}

Tense.propTypes = {
  verb: PropTypes.object.isRequired,
  tense: PropTypes.string.isRequired,
  tenseFunction: PropTypes.func.isRequired,
};

export default Tense;
