import React from "react";
import PropTypes from "prop-types";

const styleButtons = {
  margin: "0.4em",
};

function CustomInputMeaning(props) {
  let wrapperClass = "form-group";
  if (props.error.length > 0) {
    wrapperClass += "has-error";
  }

  return (
    <div id={"div" + props.id} className={wrapperClass}>
      <label htmlFor={props.id}>{props.label}</label>
      <div className="field">
        <input
          id={props.id}
          type="text"
          onChange={props.onChange}
          name={props.name}
          className="form-control"
          value={props.value}
          maxLength={props.maxLength}
        />
        <button
          style={styleButtons}
          className="btn btn-outline-danger"
          onClick={(event) => props.deleteMeaning(event, props.index)}
        >
          Delete meaning {props.index + 1}
        </button>
      </div>
      {props.error && <div className="alert alert-danger">{props.error}</div>}
    </div>
  );
}

CustomInputMeaning.defaultProps = {
  error: "",
  maxLength: "",
};

CustomInputMeaning.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  error: PropTypes.string,
  maxLength: PropTypes.string,
  index: PropTypes.number.isRequired,
  deleteMeaning: PropTypes.func.isRequired,
};

export default CustomInputMeaning;
