import React from "react";
import {
  presentIndicative,
  pastIndicative,
} from "../common/naAdjectiveConjugator";
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

function NaAdjectiveConjugationTable(props) {
  const naAdjective = props.naAdjective;

  return (
    <>
      <h2>{naAdjective.kanjis} Conjugation</h2>
      <p>
        Because na-adjectives take the auxiliary verb we already know their
        conjugation: we just need to conjugate the auxiliary verb to get the
        negative, past, or past negative for both the standard and polite forms.
      </p>

      <div style={tableStyle}>
        <div style={withBorderStyle}>Tense</div>
        <div style={withBorderStyle}>Standard</div>
        <div style={withBorderStyle}>Polite</div>

        <div style={tenseStyle}>
          <div style={withBorderStyle}>Present</div>
          <div style={withBorderStyle}>Present negative</div>
          <div style={withBorderStyle}>Past</div>
          <div style={withBorderStyle}>Past negative</div>
        </div>
        <div style={contentStyle}>
          <div style={withBorderStyle}>
            <span className="stem">{naAdjective.kanjis}</span>
            <span className="ending">
              {presentIndicative(naAdjective, PLAIN_FORM, POSITIVE_SIGN)}
            </span>
          </div>
          <div style={withBorderStyle}>
            <span className="stem">{naAdjective.kanjis}</span>
            <span className="ending">
              {presentIndicative(naAdjective, POLITE_FORM, POSITIVE_SIGN)}
            </span>
          </div>

          <div style={withBorderStyle}>
            <span className="stem">{naAdjective.kanjis}</span>
            <span className="ending">
              {presentIndicative(naAdjective, PLAIN_FORM, NEGATIVE_SIGN)}
            </span>
          </div>
          <div style={withBorderStyle}>
            <span className="stem">{naAdjective.kanjis}</span>
            <span className="ending">
              {presentIndicative(naAdjective, POLITE_FORM, NEGATIVE_SIGN)}
            </span>
          </div>

          <div style={withBorderStyle}>
            <span className="stem">{naAdjective.kanjis}</span>
            <span className="ending">
              {pastIndicative(naAdjective, PLAIN_FORM, POSITIVE_SIGN)}
            </span>
          </div>
          <div style={withBorderStyle}>
            <span className="stem">{naAdjective.kanjis}</span>
            <span className="ending">
              {pastIndicative(naAdjective, POLITE_FORM, POSITIVE_SIGN)}
            </span>
          </div>

          <div style={withBorderStyle}>
            <span className="stem">{naAdjective.kanjis}</span>
            <span className="ending">
              {pastIndicative(naAdjective, PLAIN_FORM, NEGATIVE_SIGN)}
            </span>
          </div>
          <div style={withBorderStyle}>
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
