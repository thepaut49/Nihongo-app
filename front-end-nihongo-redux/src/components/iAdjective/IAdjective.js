import React from "react";
import PropTypes from "prop-types";

function IAdjective(props) {
  const iAdjective = {
    ...props.iAdjective,
    pronunciations: [...props.iAdjective.pronunciations],
    meanings: [...props.iAdjective.meanings],
  };

  const orderPronunciation = (a, b) => {
    return a.pronunciationNumber - b.pronunciationNumber;
  };

  const orderMeaning = (a, b) => {
    return a.meaningNumber - b.meaningNumber;
  };

  return (
    <div className="grid-container-iAdjective">
      <div className="iAdjective">{iAdjective.kanjis}</div>
      <div className="pronunciation">
        {iAdjective.pronunciations
          .slice()
          .sort(orderPronunciation)
          .map((pro, index) => {
            return (
              <span key={index} className="onemeaning">
                {pro.pronunciation}
              </span>
            );
          })}
      </div>
      <div className="meaning">
        {iAdjective.meanings
          .slice()
          .sort(orderMeaning)
          .map((mean, index) => {
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
