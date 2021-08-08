import React from "react";
import PropTypes from "prop-types";

const styleButtons = {
  margin: "0.4em",
};

function CustomInputPronunciation(props) {
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
          type="text"
          onChange={(event) => props.onChange(event, props.index)}
          name={props.name}
          className="form-control-modif"
          value={props.value}
          maxLength={props.maxLength}
        />
        <div>
          <button
            style={styleButtons}
            className="translationAreaButtons"
            onClick={(event) => props.onMiddlePointClick(event, props.index)}
          >
            ・
          </button>
          <button
            style={styleButtons}
            className="translationAreaButtons"
            onClick={(event) => props.onMiddlePointClick(event, props.index)}
          >
            〜
          </button>
          <button
            style={styleButtons}
            className="translationAreaButtons"
            onClick={(event) => props.onTranslateClick(event, props.index)}
          >
            Translate to kanas
          </button>
        </div>
        <button
          style={styleButtons}
          className="btn btn-outline-danger"
          onClick={(event) => props.deletePronunciation(event, props.index)}
        >
          Delete pronunciation {props.index + 1}
        </button>
      </div>
      {props.error && (
        <div className="alert-modif alert-danger-modif">{props.error}</div>
      )}
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
  index: PropTypes.number,
  onMiddlePointClick: PropTypes.func.isRequired,
  onTranslateClick: PropTypes.func.isRequired,
  deletePronunciation: PropTypes.func,
};

export default CustomInputPronunciation;
