import React from "react";
import PropTypes from "prop-types";

const styleButtons = {
  margin: "0.4em",
};

function CustomInputPronunciation(props) {
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
        <div>
          <button
            style={styleButtons}
            className="btn btn-primary"
            onClick={props.onMiddlePointClick}
          >
            ・
          </button>
          <button
            style={styleButtons}
            className="btn btn-primary"
            onClick={props.onMiddlePointClick}
          >
            〜
          </button>
          <button
            style={styleButtons}
            className="btn btn-primary"
            onClick={props.onTranslateClick}
          >
            Translate to kanas
          </button>
        </div>
      </div>
      {props.error && <div className="alert alert-danger">{props.error}</div>}
    </div>
  );
}

CustomInputPronunciation.defaultProps = {
  error: "",
  maxLength: "",
};

CustomInputPronunciation.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  error: PropTypes.string,
  maxLength: PropTypes.string,
  onMiddlePointClick: PropTypes.func.isRequired,
  onTranslateClick: PropTypes.func.isRequired,
};

export default CustomInputPronunciation;
