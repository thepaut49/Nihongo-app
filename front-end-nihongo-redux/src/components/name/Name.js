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

const stylename = {
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

function Name(props) {
  const name = props.name;

  const orderPronunciation = (a, b) => {
    return a.pronunciationNumber - b.pronunciationNumber;
  };

  const orderMeaning = (a, b) => {
    return a.meaningNumber - b.meaningNumber;
  };

  return (
    <div style={styleGridContainer}>
      <div style={stylename}>{name.kanjis}</div>
      <div style={stylePronunciation}>
        {name.pronunciations.sort(orderPronunciation).map((pro, index) => {
          return (
            <span key={index} className="onemeaning">
              {pro.pronunciation}
            </span>
          );
        })}
      </div>
      <div style={styleMeaning}>
        {name.meanings.sort(orderMeaning).map((mean, index) => {
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

Name.propTypes = {
  name: PropTypes.object.isRequired,
};

export default Name;
