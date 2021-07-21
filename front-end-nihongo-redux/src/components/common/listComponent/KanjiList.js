import React from "react";
import "../../kanji/KanjisPage.css";
import PropTypes from "prop-types";
import Kanji from "../../kanji/Kanji";

function KanjiList(props) {
  return (
    <div>
      <h2>List of associated Kanjis</h2>
      {props.kanjis.map((kanji, index) => {
        return <Kanji kanji={kanji} key={index + 5000} />;
      })}
    </div>
  );
}

KanjiList.propTypes = {
  kanjis: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      kanji: PropTypes.string.isRequired,
      pronunciations: PropTypes.arrayOf.isRequired,
      meanings: PropTypes.arrayOf.isRequired,
      strokeNumber: PropTypes.number.isRequired,
      radicals: PropTypes.string,
      version: PropTypes.number.isRequired,
      numberOfUse: PropTypes.number,
    })
  ).isRequired,
};

export default KanjiList;
