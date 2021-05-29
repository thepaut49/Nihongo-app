import React from "react";
import PropTypes from "prop-types";

function Suffix(props) {
  const suffix = props.suffix;

  return (
    <div className="grid-container-suffix">
      <h1>The {suffix.kanjis} suffix</h1>
      <div>
        <h2>Pronunciations</h2>
        <div>
          {suffix.pronunciations.map((pro, index) => {
            return (
              <span key={index + 1000} className="onemeaning">
                {pro.pronunciation}
              </span>
            );
          })}
        </div>
      </div>

      <h2>Use</h2>
      <div className="use">{suffix.use}</div>
      <h2>Summary</h2>
      <div className="use">{suffix.summary}</div>
    </div>
  );
}

Suffix.propTypes = {
  suffix: PropTypes.object.isRequired,
};

export default Suffix;
