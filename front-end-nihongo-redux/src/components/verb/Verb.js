import React from "react";
import PropTypes from "prop-types";

function Verb(props) {
  const verb = {
    ...props.verb,
    pronunciations: [...props.verb.pronunciations],
    meanings: [...props.verb.meanings],
  };

  const orderPronunciation = (a, b) => {
    return a.pronunciationNumber - b.pronunciationNumber;
  };

  const orderMeaning = (a, b) => {
    return a.meaningNumber - b.meaningNumber;
  };

  return (
    <div className="grid-container-verb">
      <div className="verb">{verb.neutralForm}</div>
      <div className="pronunciation">
        {verb.pronunciations
          .sort(orderPronunciation)
          .map((pronunciation, index) => {
            return (
              <span key={index} className="onemeaning">
                {pronunciation.pronunciation}
              </span>
            );
          })}
      </div>
      <div className="meaning">
        {verb.meanings.sort(orderMeaning).map((mean, index) => {
          return (
            <span key={index} className="onemeaning">
              {mean.meaning}
            </span>
          );
        })}
      </div>
      <div className="groupe">
        <label>Group :</label>
        {verb.groupe}
      </div>
    </div>
  );
}

Verb.propTypes = {
  verb: PropTypes.object.isRequired,
};

export default Verb;
