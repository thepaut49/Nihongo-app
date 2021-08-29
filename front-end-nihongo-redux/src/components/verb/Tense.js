import React from "react";
import "./VerbConjugationTable.css";
import PropTypes from "prop-types";

const PLAIN_FORM = "Plain";
const POLITE_FORM = "Polite";
const NEGATIVE_SIGN = "Negative";
const POSITIVE_SIGN = "Positive";

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

  const showTense =
    verbEndingPolitePositive !== "N/A" &&
    verbEndingPoliteNegative !== "N/A" &&
    verbEndingPlainPositive !== "N/A" &&
    verbEndingPlainNegative !== "N/A";

  function isSuruOrDesu(neutralForm) {
    return neutralForm === "する" || neutralForm === "です";
  }

  return (
    <>
      {showTense && (
        <div className="verbConjugationTableStyle">
          <div className="verbTitleWithBorderStyle">
            <p className="tenseName">{tense}</p>
          </div>
          <div className="verbTitleWithBorderStyle">
            <p>Positive</p>
          </div>
          <div className="verbTitleWithBorderStyle">
            <p>Negative</p>
          </div>

          <div className="verbTenseStyle">
            <div className="verbWithBorderStyle">
              <p>Plain</p>
            </div>
            <div className="verbWithBorderStyle">
              <p>Polite</p>
            </div>
          </div>
          <div className="verbContentStyle">
            <div className="verbWithBorderStyle">
              <div className="stem">
                {isSuruOrDesu(verb.neutralForm) || stem}
              </div>
              <div className="ending">{verbEndingPlainPositive}</div>
            </div>
            <div className="verbWithBorderStyle">
              <div className="stem">
                {isSuruOrDesu(verb.neutralForm) || stem}
              </div>
              <div className="ending">{verbEndingPlainNegative}</div>
            </div>

            <div className="verbWithBorderStyle">
              <div className="stem">
                {isSuruOrDesu(verb.neutralForm) || stem}
              </div>
              <div className="ending">{verbEndingPolitePositive}</div>
            </div>
            <div className="verbWithBorderStyle">
              <div className="stem">
                {isSuruOrDesu(verb.neutralForm) || stem}
              </div>
              <div className="ending">{verbEndingPoliteNegative}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

Tense.propTypes = {
  verb: PropTypes.object.isRequired,
  tense: PropTypes.string.isRequired,
  tenseFunction: PropTypes.func.isRequired,
};

export default Tense;
