import React from "react";
import CustomInput from "../common/CustomInput";
import CustomInputMeaning from "../common/CustomInputMeaning";
import CustomInputPronunciations from "../common/CustomInputPronunciations";
import PropTypes from "prop-types";

function NameForm(props) {
  return (
    <form onSubmit={props.onSubmit} className="modificationForm">
      <CustomInput
        id="kanjis"
        label="Kanjis"
        onChange={props.onChange}
        name="kanjis"
        value={props.name.kanjis}
        error={props.errors.kanjis}
      />

      {props.name.pronunciations &&
        props.name.pronunciations.length > 0 &&
        props.name.pronunciations.map((pro, index) => {
          return (
            <CustomInputPronunciations
              key={index}
              id={"pronunciation" + index}
              label={"Pronunciation " + (index + 1) + " :"}
              typeInput="text"
              onChange={props.onPronunciationChange}
              name={"pronunciation" + index}
              value={props.name.pronunciations[index].pronunciation}
              index={index}
              deletePronunciation={props.deletePronunciation}
              onMiddlePointClick={props.onMiddlePointClick}
              onTranslateClick={props.onTranslateClick}
            />
          );
        })}

      <button className="btn btn-primary" onClick={props.addPronunciation}>
        Add pronunciation
      </button>

      {props.name.meanings &&
        props.name.meanings.length > 0 &&
        props.name.meanings.map((_meaning, index) => {
          return (
            <CustomInputMeaning
              key={index}
              id={"meaning" + index}
              label={"Meaning " + (index + 1) + " :"}
              typeInput="text"
              onChange={(event) => props.onMeaningChange(event, index)}
              name={"meaning" + index}
              value={props.name.meanings[index].meaning}
              index={index}
              deleteMeaning={props.deleteMeaning}
            />
          );
        })}

      <button className="btn btn-primary" onClick={props.addMeaning}>
        Add meaning
      </button>

      <input type="submit" value="Save" className="btn btn-success" />
    </form>
  );
}

NameForm.propTypes = {
  name: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  onMiddlePointClick: PropTypes.func.isRequired,
  onTranslateClick: PropTypes.func.isRequired,
  addMeaning: PropTypes.func.isRequired,
  onMeaningChange: PropTypes.func.isRequired,
  deleteMeaning: PropTypes.func.isRequired,
  addPronunciation: PropTypes.func.isRequired,
  onPronunciationChange: PropTypes.func.isRequired,
  deletePronunciation: PropTypes.func.isRequired,
};

export default NameForm;
