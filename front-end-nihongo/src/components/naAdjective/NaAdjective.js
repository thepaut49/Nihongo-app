import React from "react";
import PropTypes from "prop-types";

const styleGridContainer = {
  display: "grid",
  grid: "1fr 1fr / 1fr 1fr 1fr 1fr",
  gap: "1em",
  borderRadius: "10px",
  backgroundColor: "rgba(38, 113, 22, 0.48)",
  margin: "0.5em",
  padding: "0.5em",
};

const stylenaadjective = {
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

function NaAdjective(props) {
  const naAdjective = props.naAdjective;

  return (
    <div style={styleGridContainer}>
      <div style={stylenaadjective}>{naAdjective.kanjis}</div>
      <div style={stylePronunciation}>
        {naAdjective.pronunciation.map((pro, index) => {
          return (
            <span key={index} style={spanStyle}>
              {pro}
            </span>
          );
        })}
      </div>
      <div style={styleMeaning}>
        {naAdjective.meaning.map((mean, index) => {
          return (
            <span key={index} style={spanStyle}>
              {mean}
            </span>
          );
        })}
      </div>
    </div>
  );
}

NaAdjective.propTypes = {
  naAdjective: PropTypes.object.isRequired,
};

export default NaAdjective;