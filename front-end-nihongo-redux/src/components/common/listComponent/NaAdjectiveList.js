import React from "react";
import "../../naAdjective/NaAdjectivesPage.css";
import PropTypes from "prop-types";
import NaAdjective from "../../naAdjective/NaAdjective";

function NaAdjectiveList(props) {
  return (
    <div>
      <h2>List of associated Na-Adjectives</h2>
      {props.naAdjectives.map((naAdjective, index) => {
        return <NaAdjective naAdjective={naAdjective} key={index + 4000} />;
      })}
    </div>
  );
}

NaAdjectiveList.propTypes = {
  naAdjectives: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      kanjis: PropTypes.string.isRequired,
      pronunciations: PropTypes.string.isRequired,
      meanings: PropTypes.arrayOf.isRequired,
      numberOfUse: PropTypes.number,
      version: PropTypes.number,
    })
  ).isRequired,
};

export default NaAdjectiveList;
