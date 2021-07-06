import React from "react";
import {
  presentIndicative,
  pastIndicative,
} from "../common/iAdjectiveConjugator";
import PropTypes from "prop-types";

const PLAIN_FORM = "Plain";
const POLITE_FORM = "Polite";
const NEGATIVE_SIGN = "Negative";
const POSITIVE_SIGN = "Positive";

const tableStyle = {
  display: "grid",
  grid: "min-content 1fr / repeat(3, 1fr)",
  backgroundColor: "rgba(38, 113, 22, 0.48)",
  borderRadius: "10px",
  margin: "0.5em",
  fontWeight: "bold",
  border: "solid #084418",
};

const tenseStyle = {
  display: "grid",
  grid: "/ 1fr",
  gridColumnRowStart: "span 4",
  backgroundColor: "#22a952",
  fontWeight: "bold",
};

const contentStyle = {
  gridColumnStart: "span 2",
  display: "grid",
  grid: "repeat(4,1fr) / 1fr 1fr",
  backgroundColor: "#22a952",
};

const withBorderStyle = {
  border: "solid #084418",
  padding: "0.3em",
};

function IAdjectiveConjugationTable(props) {
  const iAdjective = props.iAdjective;
  const stem = iAdjective.kanjis.substring(0, iAdjective.kanjis.length - 1);

  function isII(adjective) {
    return adjective.kanjis === "いい" ? true : false;
  }

  return (
    <>
      <h4>{iAdjective.kanjis} Conjugation</h4>

      <div style={tableStyle}>
        <div style={withBorderStyle}>Tense</div>
        <div style={withBorderStyle}>Plain</div>
        <div style={withBorderStyle}>Polite</div>

        <div style={tenseStyle}>
          <div style={withBorderStyle}>Present</div>
          <div style={withBorderStyle}>Present negative</div>
          <div style={withBorderStyle}>Past</div>
          <div style={withBorderStyle}>Past negative</div>
        </div>
        <div style={contentStyle}>
          <div style={withBorderStyle}>
            <span className="stem">{isII(iAdjective) || stem}</span>
            <span className="ending">
              {presentIndicative(iAdjective, PLAIN_FORM, POSITIVE_SIGN)}
            </span>
          </div>
          <div style={withBorderStyle}>
            <span className="stem">{isII(iAdjective) || stem}</span>
            <span className="ending">
              {presentIndicative(iAdjective, POLITE_FORM, POSITIVE_SIGN)}
            </span>
          </div>

          <div style={withBorderStyle}>
            <span className="stem">{isII(iAdjective) || stem}</span>
            <span className="ending">
              {presentIndicative(iAdjective, PLAIN_FORM, NEGATIVE_SIGN)}
            </span>
          </div>
          <div style={withBorderStyle}>
            <span className="stem">{isII(iAdjective) || stem}</span>
            <span className="ending">
              {presentIndicative(iAdjective, POLITE_FORM, NEGATIVE_SIGN)}
            </span>
          </div>

          <div style={withBorderStyle}>
            <span className="stem">{isII(iAdjective) || stem}</span>
            <span className="ending">
              {pastIndicative(iAdjective, PLAIN_FORM, POSITIVE_SIGN)}
            </span>
          </div>
          <div style={withBorderStyle}>
            <span className="stem">{isII(iAdjective) || stem}</span>
            <span className="ending">
              {pastIndicative(iAdjective, POLITE_FORM, POSITIVE_SIGN)}
            </span>
          </div>

          <div style={withBorderStyle}>
            <span className="stem">{isII(iAdjective) || stem}</span>
            <span className="ending">
              {pastIndicative(iAdjective, PLAIN_FORM, NEGATIVE_SIGN)}
            </span>
          </div>
          <div style={withBorderStyle}>
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
