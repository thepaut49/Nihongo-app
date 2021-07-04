import React from "react";
import "../../naAdjective/NaAdjectivesPage.css";
import PropTypes from "prop-types";

function NaAdjectiveList(props) {
  const orderPronunciation = (a, b) => {
    return a.pronunciationNumber - b.pronunciationNumber;
  };

  const orderMeaning = (a, b) => {
    return a.meaningNumber - b.meaningNumber;
  };

  return (
    <div>
      <h2>List Of Na-Adjectives</h2>
      {props.naAdjectives.map((naAdjective) => {
        return (
          <div key={naAdjective.id} className="grid-container-naAdjective">
            <div className="naAdjective">{naAdjective.kanjis}</div>
            <div className="pronunciation">
              {naAdjective.pronunciations
                .sort(orderPronunciation)
                .map((pro, index) => {
                  return (
                    <span key={index + 30000} className="onemeaning">
                      {pro.pronunciation}
                    </span>
                  );
                })}
            </div>
            <div className="meaning">
              {naAdjective.meanings.sort(orderMeaning).map((mean, index) => {
                return (
                  <span key={index + 40000} className="onemeaning">
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
