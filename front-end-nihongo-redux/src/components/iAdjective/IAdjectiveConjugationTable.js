import React from "react";
import {
  presentIndicative,
  pastIndicative,
} from "../common/iAdjectiveConjugator";
import PropTypes from "prop-types";
import "./IAdjectiveConjugationTable.css";

const PLAIN_FORM = "Plain";
const POLITE_FORM = "Polite";
const NEGATIVE_SIGN = "Negative";
const POSITIVE_SIGN = "Positive";

function IAdjectiveConjugationTable(props) {
  const iAdjective = props.iAdjective;
  const stem = iAdjective.kanjis.substring(0, iAdjective.kanjis.length - 1);

  function isII(adjective) {
    return adjective.kanjis === "いい" ? true : false;
  }

  return (
    <>
      <h4>{iAdjective.kanjis} Conjugation</h4>

      <div className="iAdjectiveConjugationTableStyle">
        <div className="iAdjectiveTitleWithBorderStyle">Tense</div>
        <div className="iAdjectiveTitleWithBorderStyle">Plain</div>
        <div className="iAdjectiveTitleWithBorderStyle">Polite</div>

        <div className="iAdjectiveTenseStyle">
          <div className="iAdjectiveWithBorderStyle">Present</div>
          <div className="iAdjectiveWithBorderStyle">Present negative</div>
          <div className="iAdjectiveWithBorderStyle">Past</div>
          <div className="iAdjectiveWithBorderStyle">Past negative</div>
        </div>
        <div className="iAdjectiveContentStyle">
          <div className="iAdjectiveWithBorderStyle">
            <span className="stem">{isII(iAdjective) || stem}</span>
            <span className="ending">
              {presentIndicative(iAdjective, PLAIN_FORM, POSITIVE_SIGN)}
            </span>
          </div>
          <div className="iAdjectiveWithBorderStyle">
            <span className="stem">{isII(iAdjective) || stem}</span>
            <span className="ending">
              {presentIndicative(iAdjective, POLITE_FORM, POSITIVE_SIGN)}
            </span>
          </div>

          <div className="iAdjectiveWithBorderStyle">
            <span className="stem">{isII(iAdjective) || stem}</span>
            <span className="ending">
              {presentIndicative(iAdjective, PLAIN_FORM, NEGATIVE_SIGN)}
            </span>
          </div>
          <div className="iAdjectiveWithBorderStyle">
            <span className="stem">{isII(iAdjective) || stem}</span>
            <span className="ending">
              {presentIndicative(iAdjective, POLITE_FORM, NEGATIVE_SIGN)}
            </span>
          </div>

          <div className="iAdjectiveWithBorderStyle">
            <span className="stem">{isII(iAdjective) || stem}</span>
            <span className="ending">
              {pastIndicative(iAdjective, PLAIN_FORM, POSITIVE_SIGN)}
            </span>
          </div>
          <div className="iAdjectiveWithBorderStyle">
            <span className="stem">{isII(iAdjective) || stem}</span>
            <span className="ending">
              {pastIndicative(iAdjective, POLITE_FORM, POSITIVE_SIGN)}
            </span>
          </div>

          <div className="iAdjectiveWithBorderStyle">
            <span className="stem">{isII(iAdjective) || stem}</span>
            <span className="ending">
              {pastIndicative(iAdjective, PLAIN_FORM, NEGATIVE_SIGN)}
            </span>
          </div>
          <div className="iAdjectiveWithBorderStyle">
            <span className="stem">{isII(iAdjective) || stem}</span>
            <span className="ending">
              {pastIndicative(iAdjective, POLITE_FORM, NEGATIVE_SIGN)}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

IAdjectiveConjugationTable.propTypes = {
  iAdjective: PropTypes.object,
};

export default IAdjectiveConjugationTable;
