import React from "react";
import PropTypes from "prop-types";

function CustomInput(props) {
  let wrapperClass = "form-group-modif";
  if (props.error.length > 0) {
    wrapperClass += "has-error";
  }

  return (
    <div id={"div" + props.id} className={wrapperClass}>
      <label htmlFor={props.id}>{props.label}</label>
      <div>
        <input
          id={props.id}
          type="password"
          onChange={props.onChange}
          name={props.name}
          className="form-control-modif"
          value={props.value}
          maxLength={props.maxLength}
        />
      </div>
      {props.error && (
        <div className="alert-modif alert-danger-modif">{props.error}</div>
      )}
    </div>
  );
}

CustomInput.defaultProps = {
  error: "",
  maxLength: "",
};

CustomInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  error: PropTypes.string,
  maxLength: PropTypes.string,
};

export default CustomInput;
