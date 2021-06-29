import React from "react";
import PropTypes from "prop-types";

const Kanji = (props) => {
  const kanji = props.kanji;
  return (
    <div className="grid-container">
      <div className="kanji">{kanji.kanji}</div>
      <div className="pronunciation">
        {kanji.pronunciations.map((pro, index) => {
          return (
            <span key={index} className="onemeaning">
              {pro.pronunciation}
            </span>
          );
        })}
      </div>
      <div className="meaning">
        {kanji.meanings.map((mean, index) => {
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
