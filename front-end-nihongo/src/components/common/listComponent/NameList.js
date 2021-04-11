import React from "react";
import "../../name/NamesPage.css";
import PropTypes from "prop-types";

function NameList(props) {
  return (
    <div>
      <h2>List of Names</h2>
      {props.names.map((name) => {
        return (
          <div key={name.id} className="grid-container-name">
            <div className="name">{name.kanjis}</div>
            <div className="pronunciation">
              {name.pronunciations.map((pronunciation, index) => {
                return (
                  <span key={index + 50000} className="onemeaning">
                    {pronunciation.pronunciation}
                  </span>
                );
              })}
            </div>
            <div className="meaning">
              {name.meanings.map((mean, index) => {
                return (
                  <span key={index + 60000} className="onemeaning">
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

NameList.propTypes = {
  names: PropTypes.arrayOf(
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

export default NameList;
