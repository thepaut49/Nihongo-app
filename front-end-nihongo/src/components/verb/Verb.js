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

const styleverb = {
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

function Verb(props) {
  const verb = props.verb;

  return (
    <div style={styleGridContainer}>
      <div style={styleverb}>{verb.neutralForm}</div>
      <div style={stylePronunciation}>
        {verb.pronunciation.map((pro, index) => {
          return (
            <span key={index} style={spanStyle}>
              {pro}
            </span>
          );
        })}
      </div>
      <div style={styleMeaning}>
        {verb.meanings.map((mean, index) => {
          return (
            <span key={index} style={spanStyle}>
              {mean.meaning}
            </span>
          );
        })}
      </div>
    </div>
  );
}

Verb.propTypes = {
  verb: PropTypes.object.isRequired,
};

export default Verb;
