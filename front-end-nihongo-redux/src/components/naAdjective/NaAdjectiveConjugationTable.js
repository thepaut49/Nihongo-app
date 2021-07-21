import React from "react";
import {
  presentIndicative,
  pastIndicative,
} from "../common/naAdjectiveConjugator";
import PropTypes from "prop-types";
import "./NaAdjectiveConjugationTable.css";

const PLAIN_FORM = "Plain";
const POLITE_FORM = "Polite";
const NEGATIVE_SIGN = "Negative";
const POSITIVE_SIGN = "Positive";

function NaAdjectiveConjugationTable(props) {
  const naAdjective = props.naAdjective;

  return (
    <>
      <h4>{naAdjective.kanjis} Conjugation</h4>
      <p>
        Because na-adjectives take the auxiliary verb we already know their
        conjugation: we just need to conjugate the auxiliary verb to get the
        negative, past, or past negative for both the standard and polite forms.
      </p>

      <div className="naAdjectiveConjugationTableStyle">
        <div className="naAdjectiveTitleWithBorderStyle">Tense</div>
        <div className="naAdjectiveTitleWithBorderStyle">Plain</div>
        <div className="naAdjectiveTitleWithBorderStyle">Polite</div>

        <div className="naAdjectiveTenseStyle">
          <div className="naAdjectiveWithBorderStyle">Present</div>
          <div className="naAdjectiveWithBorderStyle">Present negative</div>
          <div className="naAdjectiveWithBorderStyle">Past</div>
          <div className="naAdjectiveWithBorderStyle">Past negative</div>
        </div>
        <div className="naAdjectiveContentStyle">
          <div className="naAdjectiveWithBorderStyle">
            <span className="stem">{naAdjective.kanjis}</span>
            <span className="ending">
              {presentIndicative(naAdjective, PLAIN_FORM, POSITIVE_SIGN)}
            </span>
          </div>
          <div className="naAdjectiveWithBorderStyle">
            <span className="stem">{naAdjective.kanjis}</span>
            <span className="ending">
              {presentIndicative(naAdjective, POLITE_FORM, POSITIVE_SIGN)}
            </span>
          </div>

          <div className="naAdjectiveWithBorderStyle">
            <span className="stem">{naAdjective.kanjis}</span>
            <span className="ending">
              {presentIndicative(naAdjective, PLAIN_FORM, NEGATIVE_SIGN)}
            </span>
          </div>
          <div className="naAdjectiveWithBorderStyle">
            <span className="stem">{naAdjective.kanjis}</span>
            <span className="ending">
              {presentIndicative(naAdjective, POLITE_FORM, NEGATIVE_SIGN)}
            </span>
          </div>

          <div className="naAdjectiveWithBorderStyle">
            <span className="stem">{naAdjective.kanjis}</span>
            <span className="ending">
              {pastIndicative(naAdjective, PLAIN_FORM, POSITIVE_SIGN)}
            </span>
          </div>
          <div className="naAdjectiveWithBorderStyle">
            <span className="stem">{naAdjective.kanjis}</span>
            <span className="ending">
              {pastIndicative(naAdjective, POLITE_FORM, POSITIVE_SIGN)}
            </span>
          </div>

          <div className="naAdjectiveWithBorderStyle">
            <span className="stem">{naAdjective.kanjis}</span>
            <span className="ending">
              {pastIndicative(naAdjective, PLAIN_FORM, NEGATIVE_SIGN)}
            </span>
          </div>
          <div className="naAdjectiveWithBorderStyle">
            <span className="stem">{naAdjective.kanjis}</span>
            <span className="ending">
              {pastIndicative(naAdjective, POLITE_FORM, NEGATIVE_SIGN)}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

NaAdjectiveConjugationTable.propTypes = {
  naAdjective: PropTypes.object.isRequired,
};

export default NaAdjectiveConjugationTable;
