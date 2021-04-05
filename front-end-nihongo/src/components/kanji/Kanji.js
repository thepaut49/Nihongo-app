import React from "react";
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

function Kanji(props) {
  const kanji = props.kanji;

  return (
    <div style={styleGridContainer}>
      <div style={stylekanji}>{kanji.kanji}</div>
      <div style={stylePronunciation}>
        {kanji.pronunciation.map((pro, index) => {
          return (
            <span key={index} className="onemeaning">
              {pro}
            </span>
          );
        })}
      </div>
      <div style={styleMeaning}>
        {kanji.meanings.map((mean, index) => {
          return (
            <span key={index} className="onemeaning">
              {mean.meaning}
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
}

Kanji.propTypes = {
  kanji: PropTypes.object.isRequired,
};

export default Kanji;
