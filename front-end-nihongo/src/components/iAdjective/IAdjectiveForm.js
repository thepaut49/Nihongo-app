import React from "react";
import CustomInput from "../common/CustomInput";
import CustomInputPronunciation from "../common/CustomInputPronunciation";
import PropTypes from "prop-types";

const formStyle = {
  display: "grid",
  gridTemplateColumns: "1fr",
  backgroundColor: "#4682B4",
  margin: "1em",
  gap: "1em",
  padding: "0.5em",
  borderRadius: "10px",
};

function IAdjectiveForm(props) {
  return (
    <form onSubmit={props.onSubmit} style={formStyle}>
      <CustomInput
        id="kanjis"
        label="Kanjis"
        onChange={props.onChange}
        name="kanjis"
        value={props.iAdjective.kanjis}
        error={props.errors.kanjis}
      />

      <CustomInputPronunciation
        id="pronunciation"
        label="Pronunciation"
        onChange={props.onChange}
        name="pronunciation"
        value={props.iAdjective.pronunciation}
        error={props.errors.pronunciation}
        onMiddlePointClick={props.onMiddlePointClick}
        onTranslateClick={props.onTranslateClick}
      />

      {props.iAdjective.meanings &&
        props.iAdjective.meanings.length > 0 &&
        props.iAdjective.meanings.map((_meaning, index) => {
          return (
            <CustomInput
              key={index}
              id={"meaning" + index}
              label={"Meaning" + (index + 1) + " :"}
              typeInput="text"
              onChange={(event) => props.onMeaningChange(event, index)}
              name={"meaning" + index}
              value={props.iAdjective.meanings[index].meaning}
            />
          );
        })}

      <button className="btn btn-primary" onClick={props.addMeaning}>
        Add meaning
      </button>

      <input type="submit" value="Save" className="btn btn-primary" />
    </form>
  );
}

IAdjectiveForm.propTypes = {
  iAdjective: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  addMeaning: PropTypes.func.isRequired,
  onMeaningChange: PropTypes.func.isRequired,
};

export default IAdjectiveForm;
