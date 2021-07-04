import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import translationConstants from "../common/translationConstants";
import DropDownButtons from "../common/dropDownButtons/DropDownButton";
import "./ListObject.css";

function ListObject(props) {
  const [objectList, setObjectList] = useState([]);
  const objectListStyle = props.style;
  const [showDropdownButtons, setShowDropdownButtons] = useState(false);

  useEffect(() => {
    setObjectList(props.list);
    if (isVerbOrAdj(props.typeSelect)) {
      setShowDropdownButtons(true);
    } else {
      setShowDropdownButtons(false);
    }
  }, [props.list, showDropdownButtons]);

  const isVerbOrAdj = (typeSelect) => {
    return (
      typeSelect === translationConstants.TYPE_I_ADJECTIVE ||
      typeSelect === translationConstants.TYPE_NA_ADJECTIVE ||
      typeSelect === translationConstants.TYPE_VERB
    );
  };

  return (
    <div id="objectList" style={objectListStyle}>
      {objectList &&
        objectList.map((object, index) => {
          return (
            <>
              {showDropdownButtons ? (
                <DropDownButtons
                  object={object}
                  onClick={props.onClick}
                  typeSelect={props.typeSelect}
                />
              ) : (
                <button
                  id={object.id}
                  key={index + 30000}
                  className="listObjectButtons"
                  onClick={(event) => props.onClick(event, object.id)}
                >
                  {object.value}
                </button>
              )}
            </>
          );
        })}
    </div>
  );
}

ListObject.propTypes = {
  list: PropTypes.array.isRequired,
  style: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  typeSelect: PropTypes.string.isRequired,
};

export default ListObject;
