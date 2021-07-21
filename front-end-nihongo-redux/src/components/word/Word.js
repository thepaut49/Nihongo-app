import React from "react";
import PropTypes from "prop-types";

function Word(props) {
  const word = props.word;

  const orderPronunciation = (a, b) => {
    return a.pronunciationNumber - b.pronunciationNumber;
  };

  const orderMeaning = (a, b) => {
    return a.meaningNumber - b.meaningNumber;
  };

  return (
    <div className="grid-container-word">
      <div className="word">{word.kanjis}</div>
      <div className="pronunciationWord">
        {word.pronunciations
          .sort(orderPronunciation)
          .map((pronunciation, index) => {
            return (
              <span key={index} className="onemeaning">
                {pronunciation.pronunciation}
              </span>
            );
          })}
      </div>
      <div className="meaningWord">
        {word.meanings.sort(orderMeaning).map((mean, index) => {
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

Word.propTypes = {
  word: PropTypes.object.isRequired,
};

export default Word;
