import React from "react";
import PropTypes from "prop-types";

const KanjiList = (props) => {
  return (
    <>
      {props.kanjis.map((kanji, index) => {
        return (
          <button
            key={index}
            className="btn btn-primary"
            onClick={props.onListClick}
          >
            {kanji.kanji}
          </button>
        );
      })}
    </>
  );
};

KanjiList.propTypes = {
  kanjis: PropTypes.array.isRequired,
  onListClick: PropTypes.func.isRequired,
};

export default KanjiList;
