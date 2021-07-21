import React from "react";
import "../../name/NamesPage.css";
import PropTypes from "prop-types";
import Name from "../../name/Name";

function NameList(props) {
  return (
    <div>
      <h2>List of Names</h2>
      {props.names.map((name, index) => {
        return <Name name={name} key={index + 2000} />;
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
