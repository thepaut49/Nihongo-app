import React from "react";
import PropTypes from "prop-types";
import { constructListOfValues as constructListOfValuesIAdj } from "../iAdjectiveConjugator";
import { constructListOfValues as constructListOfValuesNaAdj } from "../naAdjectiveConjugator";
import { constructListOfValues as constructListOfValuesVerb } from "../verbConjugator";
import translationConstants from "../translationConstants";
import "./DropDownButtons.css";

const DropDownButtons = (props) => {
  const object = props.object;
  let listOfValues = [];
  if (
    props.typeSelect === translationConstants.TYPE_I_ADJECTIVE &&
    object.kanjis
  ) {
    listOfValues = constructListOfValuesIAdj(object);
  } else if (
    props.typeSelect === translationConstants.TYPE_NA_ADJECTIVE &&
    object.kanjis
  ) {
    listOfValues = constructListOfValuesNaAdj(object);
  } else if (
    props.typeSelect === translationConstants.TYPE_VERB &&
    object.neutralForm
  ) {
    listOfValues = constructListOfValuesVerb(object);
  }

  return (
    <>
      {listOfValues && (
        <div className="dropdownChoiceDiv">
          <div className="dropdownChoice">
            <button className="dropbtn">{object.value}</button>
            <div className="dropdownChoice-content">
              {listOfValues.map((value, index) => {
                return (
                  <button
                    key={index + 20000}
                    onClick={(event) => props.onClick(event, object.id)}
                  >
                    {value}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

DropDownButtons.propTypes = {
  object: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  typeSelect: PropTypes.string.isRequired,
};

export default DropDownButtons;
