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

  return (
    <div style={styleGridContainer}>
      <div style={stylename}>{name.kanjis}</div>
      <div style={stylePronunciation}>
        {name.pronunciation.map((pro, index) => {
          return (
            <span key={index} className="onemeaning">
              {pro}
            </span>
          );
        })}
      </div>
      <div style={styleMeaning}>
        {name.meanings.map((mean, index) => {
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
