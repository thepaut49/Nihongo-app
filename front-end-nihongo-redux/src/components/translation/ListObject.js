import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

function ListObject(props) {
  const [objectList, setObjectList] = useState([]);
  const objectListStyle = props.style;

  useEffect(() => {
    setObjectList(props.list);
  }, [props.list]);

  return (
    <div id="objectList" style={objectListStyle}>
      {objectList &&
        objectList.map((object) => {
          return (
            <button
              id={object.id}
              key={object.id}
              className="btn btn-primary"
              onClick={props.onClick}
            >
              {object.value}
            </button>
          );
        })}
    </div>
  );
}

ListObject.propTypes = {
  list: PropTypes.array.isRequired,
  style: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ListObject;
