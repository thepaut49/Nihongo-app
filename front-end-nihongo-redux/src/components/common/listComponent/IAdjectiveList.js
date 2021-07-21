import React from "react";
import "../../iAdjective/IAdjectivesPage.css";
import PropTypes from "prop-types";
import IAdjective from "../../iAdjective/IAdjective";

function IAdjectiveList(props) {
  const iAdjectives = props.iAdjectives;
  return (
    <div>
      <h2>List of associated I-Adjectives</h2>
      {iAdjectives.map((iAdjective, index) => {
        return <IAdjective key={index + 6000} iAdjective={iAdjective} />;
      })}
    </div>
  );
}

IAdjectiveList.propTypes = {
  iAdjectives: PropTypes.arrayOf(
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

export default IAdjectiveList;
