import React from "react";
import CustomInput from "../common/CustomInput";
import CustomInputPronunciation from "../common/CustomInputPronunciation";
import CustomSelect from "../common/CustomSelect";
import verbConstants from "../common/verbConstants";
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

function VerbForm(props) {
  return (
    <form onSubmit={props.onSubmit} style={formStyle}>
      <CustomInput
        id="neutralForm"
        label="Neutral form"
        onChange={props.onChange}
        name="neutralForm"
        value={props.verb.neutralForm}
        error={props.errors.neutralForm}
      />

      <CustomInputPronunciation
        id="pronunciation"
        label="Pronunciation"
        onChange={props.onChange}
        name="pronunciation"
        value={props.verb.pronunciation}
        error={props.errors.pronunciation}
        onMiddlePointClick={props.onMiddlePointClick}
        onTranslateClick={props.onTranslateClick}
      />

      {props.verb.meanings &&
        props.verb.meanings.length > 0 &&
        props.verb.meanings.map((_meaning, index) => {
          return (
            <CustomInput
              key={index}
              id={"meaning" + index}
              label={"Meaning" + (index + 1) + " :"}
              typeInput="text"
              onChange={(event) => props.onMeaningChange(event, index)}
              name={"meaning" + index}
              value={props.verb.meanings[index].meaning}
            />
          );
        })}

      <button className="btn btn-primary" onClick={props.addMeaning}>
        Add meaning
      </button>

      <CustomSelect
        id="groupe"
        label="Group"
        onChange={props.onChange}
        step="1"
        name="groupe"
        value={props.verb.groupe}
        listOfValues={verbConstants.verbGroupList}
      />

      <input type="submit" value="Save" className="btn btn-primary" />
    </form>
  );
}

VerbForm.propTypes = {
  verb: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onMiddlePointClick: PropTypes.func.isRequired,
  onTranslateClick: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  addMeaning: PropTypes.func.isRequired,
  onMeaningChange: PropTypes.func.isRequired,
};

export default VerbForm;
