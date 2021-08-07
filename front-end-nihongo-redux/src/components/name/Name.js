import React from "react";
import PropTypes from "prop-types";

function Name(props) {
  const name = {
    ...props.name,
    pronunciations: [...props.name.pronunciations],
    meanings: [...props.name.meanings],
  };

  const orderPronunciation = (a, b) => {
    return a.pronunciationNumber - b.pronunciationNumber;
  };

  const orderMeaning = (a, b) => {
    return a.meaningNumber - b.meaningNumber;
  };

  return (
    <div className="grid-container-name">
      <div className="name">{name.kanjis}</div>
      <div className="pronunciation">
        {name.pronunciations
          .slice()
          .sort(orderPronunciation)
          .map((pronunciation, index) => {
            return (
              <span key={index} className="onemeaning">
                {pronunciation.pronunciation}
              </span>
            );
          })}
      </div>
      <div className="meaning">
        {name.meanings
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

Name.propTypes = {
  name: PropTypes.object.isRequired,
};

export default Name;
