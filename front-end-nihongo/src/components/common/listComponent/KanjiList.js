import React from "react";
import "../../kanji/KanjisPage.css";
import PropTypes from "prop-types";

const styleGridContainer = {
  display: "grid",
  grid: "1fr 1fr 1fr / 1fr 1fr 1fr 1fr",
  gap: "1em",
  borderRadius: "10px",
  backgroundColor: "rgba(38, 113, 22, 0.48)",
  margin: "0.5em",
  padding: "0.5em",
};

const stylekanji = {
  gridRowStart: "span 2",
  textAlign: "left",
  fontWeight: "bold",
  fontSize: "xxx-large",
};
const stylePronunciation = {
  gridColumnStart: "span 3",
  fontWeight: "bold",
  fontSize: "x-large",
};

const styleMeaning = {
  gridColumnStart: "span 3",
  fontWeight: "bold",
  fontSize: "x-large",
};

const spanStyle = {
  margin: "0.5em",
  backgroundColor: "#4682b4",
  borderRadius: "10px",
  padding: "0.3em",
};

function KanjiList(props) {
  return (
    <div>
      <h2>List of Kanjis</h2>
      {props.kanjis.map((kanji) => {
        return (
          <div style={styleGridContainer} key={kanji.id}>
            <div style={stylekanji}>{kanji.kanji}</div>
            <div style={stylePronunciation}>
              {kanji.pronunciation.map((pro, index) => {
                return (
                  <span key={index} style={spanStyle}>
                    {pro}
                  </span>
                );
              })}
            </div>
            <div style={styleMeaning}>
              {kanji.meaning.map((mean, index) => {
                return (
                  <span key={index} style={spanStyle}>
                    {mean}
                  </span>
                );
              })}
            </div>
            <div>
              <span>
                <label>Strokes : </label>
                {kanji.strokeNumber}
              </span>
            </div>
            <div>
              <span>
                <label>Radicals : </label>
                {kanji.radicals}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

KanjiList.propTypes = {
  kanjis: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      kanji: PropTypes.string.isRequired,
      pronunciation: PropTypes.arrayOf.isRequired,
      meaning: PropTypes.arrayOf.isRequired,
      strokeNumber: PropTypes.number.isRequired,
      radicals: PropTypes.string,
      version: PropTypes.number.isRequired,
      numberOfUse: PropTypes.number,
    })
  ).isRequired,
};

export default KanjiList;
