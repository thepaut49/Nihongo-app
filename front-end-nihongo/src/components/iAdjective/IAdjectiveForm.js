import React from "react";
import CustomInput from "../common/CustomInput";
import CustomInputMeaning from "../common/CustomInputMeaning";
import CustomInputPronunciations from "../common/CustomInputPronunciations";
import PropTypes from "prop-types";

function IAdjectiveForm(props) {
  return (
    <form onSubmit={props.onSubmit} className="modificationForm">
      <CustomInput
        id="kanjis"
        label="Kanjis"
        onChange={props.onChange}
        name="kanjis"
        value={props.iAdjective.kanjis}
        error={props.errors.kanjis}
      />

      {props.iAdjective.pronunciations &&
        props.iAdjective.pronunciations.length > 0 &&
        props.iAdjective.pronunciations.map((pro, index) => {
          return (
            <CustomInputPronunciations
              key={index}
              id={"pronunciation" + index}
              label={"Pronunciation " + (index + 1) + " :"}
              typeInput="text"
              onChange={props.onPronunciationChange}
              name={"pronunciation" + index}
              value={props.iAdjective.pronunciations[index].pronunciation}
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

      {props.iAdjective.meanings &&
        props.iAdjective.meanings.length > 0 &&
        props.iAdjective.meanings.map((_meaning, index) => {
          return (
            <CustomInputMeaning
              key={index}
              id={"meaning" + index}
              label={"Meaning " + (index + 1) + " :"}
              typeInput="text"
              onChange={(event) => props.onMeaningChange(event, index)}
              name={"meaning" + index}
              value={props.iAdjective.meanings[index].meaning}
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

IAdjectiveForm.propTypes = {
  iAdjective: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  addMeaning: PropTypes.func.isRequired,
  onMeaningChange: PropTypes.func.isRequired,
  deleteMeaning: PropTypes.func.isRequired,
  addPronunciation: PropTypes.func.isRequired,
  onPronunciationChange: PropTypes.func.isRequired,
  deletePronunciation: PropTypes.func.isRequired,
};

export default IAdjectiveForm;
