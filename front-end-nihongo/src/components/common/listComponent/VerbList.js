import React from "react";
import "../../verb/VerbsPage.css";
import PropTypes from "prop-types";

function VerbList(props) {
  return (
    <div>
      <h2>List of Verbs</h2>
      {props.verbs.map((verb) => {
        return (
          <div key={verb.id} className="grid-container-verb">
            <div className="verb">{verb.neutralForm}</div>
            <div className="pronunciation">
              {verb.pronunciation.map((pronunciation, index) => {
                return (
                  <span key={index} className="onemeaning">
                    {pronunciation}
                  </span>
                );
              })}
            </div>
            <div className="meaning">
              {verb.meanings.map((mean, index) => {
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
      })}
    </div>
  );
}

VerbList.propTypes = {
  verbs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      neutralForm: PropTypes.string.isRequired,
      pronunciation: PropTypes.string.isRequired,
      meanings: PropTypes.arrayOf.isRequired,
      groupe: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default VerbList;
