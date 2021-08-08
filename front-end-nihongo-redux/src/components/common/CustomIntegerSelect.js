import React from "react";
import PropTypes from "prop-types";

function CustomIntegerSelect(props) {
  let wrapperClass = "form-group-modif";
  if (props.error.length > 0) {
    wrapperClass += "has-error";
  }

  return (
    <div id={"div" + props.id} className={wrapperClass}>
      <label htmlFor={props.id}>{props.label}</label>
      <div>
        <select
          id={props.id}
          type="text"
          onChange={props.onChange}
          name={props.name}
          className="form-control-modif"
          value={props.value}
        >
          <option value="" />
          {props.listOfValues.map((item) => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
        </select>
      </div>
      {props.error && (
        <div className="alert-modif alert-danger-modif">{props.error}</div>
      )}
    </div>
  );
}

CustomIntegerSelect.defaultProps = {
  error: "",
};

CustomIntegerSelect.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number,
  error: PropTypes.string,
  listOfValues: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default CustomIntegerSelect;
