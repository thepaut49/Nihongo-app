import React from "react";
import PropTypes from "prop-types";
import { japanesePunctuationList } from "./japanesePunctuation";

const styleButtons = {
  marginTop: "0.4em",
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
  gap: "1em 1em",
};

function CustomTextArea(props) {
  let wrapperClass = "form-group-modif";
  if (props.error.length > 0) {
    wrapperClass += "has-error";
  }

  return (
    <div id={"div" + props.id} className={wrapperClass}>
      <label htmlFor={props.id}>{props.label}</label>
      <div>
        <textarea
          id={props.id}
          onChange={props.onChange}
          name={props.name}
          className="form-control-modif"
          value={props.value}
          cols={props.cols}
          rows={props.rows}
        />
      </div>
      {props.onKanaClick && (
        <div style={styleButtons}>
          {japanesePunctuationList.map((punctuation, index) => {
            return (
              <button
                key={index}
                className="translationAreaButtons"
                onClick={props.onKanaClick}
              >
                {punctuation}
              </button>
            );
          })}
        </div>
      )}

      {props.error && (
        <div className="alert-modif alert-danger-modif">{props.error}</div>
      )}
    </div>
  );
}

CustomTextArea.defaultProps = {
  error: "",
  maxLength: "",
};

CustomTextArea.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onKanaClick: PropTypes.func,
  value: PropTypes.string,
  error: PropTypes.string,
  cols: PropTypes.number,
  rows: PropTypes.number,
};

export default CustomTextArea;
