import React from "react";
import "../../word/WordsPage.css";
import PropTypes from "prop-types";
import Word from "../../word/Word";

function WordList(props) {
  return (
    <div>
      <h2>List of associated Words</h2>
      {props.words.map((word, index) => {
        return <Word word={word} key={index + 500} />;
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
