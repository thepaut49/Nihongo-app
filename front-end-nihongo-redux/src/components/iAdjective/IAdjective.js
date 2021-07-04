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

const styleiadjective = {
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

function IAdjective(props) {
  const iAdjective = props.iAdjective;

  const orderPronunciation = (a, b) => {
    return a.pronunciationNumber - b.pronunciationNumber;
  };

  const orderMeaning = (a, b) => {
    return a.meaningNumber - b.meaningNumber;
  };

  return (
    <div style={styleGridContainer}>
      <div style={styleiadjective}>{iAdjective.kanjis}</div>
      <div style={stylePronunciation}>
        {iAdjective.pronunciations
          .sort(orderPronunciation)
          .map((pro, index) => {
            return (
              <span key={index} className="onemeaning">
                {pro.pronunciation}
              </span>
            );
          })}
      </div>
      <div style={styleMeaning}>
        {iAdjective.meanings.sort(orderMeaning).map((mean, index) => {
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

IAdjective.propTypes = {
  iAdjective: PropTypes.object.isRequired,
};

export default IAdjective;
