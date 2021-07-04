import React from "react";
import CustomInput from "../common/CustomInput";
import CustomInputMeaning from "../common/CustomInputMeaning";
import CustomInputPronunciations from "../common/CustomInputPronunciations";
import CustomSelect from "../common/CustomSelect";
import { verbConstants } from "../common/verbConstants";
import PropTypes from "prop-types";

function VerbForm({
  verb,
  onSubmit,
  onChange,
  saving = false,
  errors = {},
  onPronunciationChange,
  onMeaningChange,
  deletePronunciation,
  deleteMeaning,
  onMiddlePointClick,
  onTranslateClick,
  addPronunciation,
  addMeaning,
}) {
  const orderPronunciation = (a, b) => {
    return a.pronunciationNumber - b.pronunciationNumber;
  };

  const orderMeaning = (a, b) => {
    return a.meaningNumber - b.meaningNumber;
  };

  return (
    <form onSubmit={onSubmit} className="modificationForm">
      <h2>{verb.id ? "Edit" : "Add"} Verb</h2>
      {errors.onSubmit && (
        <div className="alert alert-danger" role="alert">
          {errors.onSubmit}
        </div>
      )}

      <CustomInput
        id="neutralForm"
        label="Neutral form"
        onChange={onChange}
        name="neutralForm"
        value={verb.neutralForm}
        error={errors.neutralForm}
      />

      {verb.pronunciations &&
        verb.pronunciations.length > 0 &&
        verb.pronunciations.sort(orderPronunciation).map((pro, index) => {
          return (
            <CustomInputPronunciations
              key={index}
              id={"pronunciation" + index}
              label={"Pronunciation " + (index + 1) + " :"}
              typeInput="text"
              onChange={onPronunciationChange}
              name={"pronunciation" + index}
              value={verb.pronunciations[index].pronunciation}
              index={index}
              deletePronunciation={deletePronunciation}
              onMiddlePointClick={onMiddlePointClick}
              onTranslateClick={onTranslateClick}
            />
          );
        })}

      <button className="btn btn-primary" onClick={addPronunciation}>
        Add pronunciation
      </button>

      {verb.meanings &&
        verb.meanings.length > 0 &&
        verb.meanings.sort(orderMeaning).map((_meaning, index) => {
          return (
            <CustomInputMeaning
              key={index}
              id={"meaning" + index}
              label={"Meaning " + (index + 1) + " :"}
              typeInput="text"
              onChange={(event) => onMeaningChange(event, index)}
              name={"meaning" + index}
              value={verb.meanings[index].meaning}
              index={index}
              deleteMeaning={deleteMeaning}
            />
          );
        })}

      <button className="btn btn-primary" onClick={addMeaning}>
        Add meaning
      </button>

      <CustomSelect
        id="groupe"
        label="Group"
        onChange={onChange}
        step="1"
        name="groupe"
        value={verb.groupe}
        listOfValues={verbConstants.verbGroupList}
      />

      <button type="submit" disabled={saving} className="btn btn-success">
        {saving ? "Saving..." : "Save"}
      </button>
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
  deleteMeaning: PropTypes.func.isRequired,
  addPronunciation: PropTypes.func.isRequired,
  onPronunciationChange: PropTypes.func.isRequired,
  deletePronunciation: PropTypes.func.isRequired,
  saving: PropTypes.bool,
};

export default VerbForm;
