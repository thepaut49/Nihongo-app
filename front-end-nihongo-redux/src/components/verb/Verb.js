import React from "react";
import PropTypes from "prop-types";

const styleGridContainer = {
  display: "grid",
  grid: "1fr 1fr / 1fr 1fr 1fr 1fr",
  gap: "1em",
  borderRadius: "10px",
  backgroundColor: "var(--fourth-bg-color)",
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

function Verb(props) {
  const verb = props.verb;

  const orderPronunciation = (a, b) => {
    return a.pronunciationNumber - b.pronunciationNumber;
  };

  const orderMeaning = (a, b) => {
    return a.meaningNumber - b.meaningNumber;
  };

  return (
    <div style={styleGridContainer}>
      <div style={styleverb}>{verb.neutralForm}</div>
      <div style={stylePronunciation}>
        {verb.pronunciations.sort(orderPronunciation).map((pro, index) => {
          return (
            <span key={index} className="onemeaning">
              {pro.pronunciation}
            </span>
          );
        })}
      </div>
      <div style={styleMeaning}>
        {verb.meanings.sort(orderMeaning).map((mean, index) => {
          return (
            <span key={index} className="onemeaning">
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
