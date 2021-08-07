import React from "react";
import PropTypes from "prop-types";

const Kanji = (props) => {
  const kanji = props.kanji;
  const orderPronunciation = (a, b) => {
    return a.pronunciationNumber - b.pronunciationNumber;
  };

  const orderMeaning = (a, b) => {
    return a.meaningNumber - b.meaningNumber;
  };

  return (
    <div className="grid-container-kanji">
      <div className="kanji">{kanji.kanji}</div>
      <div className="pronunciation">
        {kanji.pronunciations.sort(orderPronunciation).map((pro, index) => {
          return (
            <span key={index} className="onemeaning">
              {pro.pronunciation}
            </span>
          );
        })}
      </div>
      <div className="meaning">
        {kanji.meanings.sort(orderMeaning).map((mean, index) => {
          return (
            <span key={index} className="onemeaning">
              {mean.meaning}
            </span>
          );
        })}
      </div>
      <div className="strokes">
        <span>
          <label>Strokes : </label>
          {kanji.strokeNumber}
        </span>
        <span>
          <label>Radicals : </label>
          {kanji.radicals}
        </span>
      </div>
    </div>
  );
};

Kanji.propTypes = {
  kanji: PropTypes.object.isRequired,
};

export default Kanji;
