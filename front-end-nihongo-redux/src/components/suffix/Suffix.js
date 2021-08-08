import React from "react";
import PropTypes from "prop-types";

function Suffix(props) {
  const suffix = {
    ...props.suffix,
    pronunciations: [...props.suffix.pronunciations],
  };

  const orderPronunciation = (a, b) => {
    return a.pronunciationNumber - b.pronunciationNumber;
  };

  return (
    <div className="grid-container-suffix">
      <h2>The {suffix.kanjis} suffix</h2>
      <div>
        <h3>Pronunciations</h3>
        <div>
          {suffix.pronunciations
            .slice()
            .sort(orderPronunciation)
            .map((pro, index) => {
              return (
                <span key={index + 1000} className="onemeaning">
                  {pro.pronunciation}
                </span>
              );
            })}
        </div>
      </div>

      <h3>Use</h3>
      <div className="use">{suffix.use}</div>
      <h3>Summary</h3>
      <div className="use">{suffix.summary}</div>
    </div>
  );
}

Suffix.propTypes = {
  suffix: PropTypes.object.isRequired,
};

export default Suffix;
