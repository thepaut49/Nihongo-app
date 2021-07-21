import React from "react";
import "../../verb/VerbsPage.css";
import PropTypes from "prop-types";
import Verb from "../../verb/Verb";

function VerbList(props) {
  return (
    <div>
      <h2>List of associated Verbs</h2>
      {props.verbs.map((verb, index) => {
        return <Verb verb={verb} key={index + 1000} />;
      })}
    </div>
  );
}

VerbList.propTypes = {
  verbs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      neutralForm: PropTypes.string.isRequired,
      pronunciations: PropTypes.arrayOf.isRequired,
      meanings: PropTypes.arrayOf.isRequired,
      groupe: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default VerbList;
