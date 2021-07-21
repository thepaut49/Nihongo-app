import React from "react";
import PropTypes from "prop-types";

function NaAdjective(props) {
  const naAdjective = props.naAdjective;

  const orderPronunciation = (a, b) => {
    return a.pronunciationNumber - b.pronunciationNumber;
  };

  const orderMeaning = (a, b) => {
    return a.meaningNumber - b.meaningNumber;
  };

  return (
    <div className="grid-container-naAdjective">
      <div className="naAdjective">{naAdjective.kanjis}</div>
      <div className="pronunciation">
        {naAdjective.pronunciations
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
        {naAdjective.meanings.sort(orderMeaning).map((mean, index) => {
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

NaAdjective.propTypes = {
  naAdjective: PropTypes.object.isRequired,
};

export default NaAdjective;
