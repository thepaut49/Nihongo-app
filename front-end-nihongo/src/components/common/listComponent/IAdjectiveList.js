import React from "react";
import "../../iAdjective/IAdjectivesPage.css";
import PropTypes from "prop-types";

function IAdjectiveList(props) {
  return (
    <div>
      <h2>List Of I-Adjectives</h2>
      {props.iAdjectives.map((iAdjective) => {
        return (
          <div key={iAdjective.id} className="grid-container-iAdjective">
            <div className="iAdjective">{iAdjective.kanjis}</div>
            <div className="pronunciation">
              {iAdjective.pronunciation.map((pro, index) => {
                return (
                  <span key={index + 10000} className="onemeaning">
                    {pro}
                  </span>
                );
              })}
            </div>
            <div className="meaning">
              {iAdjective.meanings.map((mean, index) => {
                return (
                  <span key={index + 20000} className="onemeaning">
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

IAdjectiveList.propTypes = {
  iAdjectives: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      kanjis: PropTypes.string.isRequired,
      pronunciation: PropTypes.string.isRequired,
      meanings: PropTypes.arrayOf.isRequired,
      numberOfUse: PropTypes.number,
      version: PropTypes.number,
    })
  ).isRequired,
};

export default IAdjectiveList;
