import React from "react";
import "../../word/WordsPage.css";
import PropTypes from "prop-types";

function WordList(props) {
  return (
    <div>
      <h2>List of Words</h2>
      {props.words.map((word) => {
        return (
          <div key={word.id} className="grid-container-word">
            <div className="word">{word.kanjis}</div>
            <div className="pronunciation">
              {word.pronunciations.map((pronunciation, index) => {
                return (
                  <span key={index + 90000} className="onemeaning">
                    {pronunciation.pronunciation}
                  </span>
                );
              })}
            </div>
            <div className="meaning">
              {word.meanings.map((mean, index) => {
                return (
                  <span key={index + 100000} className="onemeaning">
                    {mean.meaning}
                  </span>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

WordList.propTypes = {
  words: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      kanjis: PropTypes.string.isRequired,
      pronunciations: PropTypes.arrayOf.isRequired,
      meanings: PropTypes.arrayOf.isRequired,
      numberOfUse: PropTypes.number,
      version: PropTypes.number,
    })
  ).isRequired,
};

export default WordList;