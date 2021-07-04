import React from "react";
import CustomInput from "../common/CustomInput";
import CustomInputMeaning from "../common/CustomInputMeaning";
import CustomInputPronunciations from "../common/CustomInputPronunciations";
import PropTypes from "prop-types";

function IAdjectiveForm({
  iAdjective,
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
      <h2>{iAdjective.id ? "Edit" : "Add"} i-Adjective</h2>
      {errors.onSubmit && (
        <div className="alert alert-danger" role="alert">
          {errors.onSubmit}
        </div>
      )}

      <CustomInput
        id="kanjis"
        label="Kanjis"
        onChange={onChange}
        name="kanjis"
        value={iAdjective.kanjis}
        error={errors.kanjis}
      />

      {iAdjective.pronunciations &&
        iAdjective.pronunciations.length > 0 &&
        iAdjective.pronunciations.sort(orderPronunciation).map((pro, index) => {
          return (
            <CustomInputPronunciations
              key={index}
              id={"pronunciation" + index}
              label={"Pronunciation " + (index + 1) + " :"}
              typeInput="text"
              onChange={onPronunciationChange}
              name={"pronunciation" + index}
              value={iAdjective.pronunciations[index].pronunciation}
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

      {iAdjective.meanings &&
        iAdjective.meanings.length > 0 &&
        iAdjective.meanings.sort(orderMeaning).map((_meaning, index) => {
          return (
            <CustomInputMeaning
              key={index}
              id={"meaning" + index}
              label={"Meaning " + (index + 1) + " :"}
              typeInput="text"
              onChange={(event) => onMeaningChange(event, index)}
              name={"meaning" + index}
              value={iAdjective.meanings[index].meaning}
              index={index}
              deleteMeaning={deleteMeaning}
            />
          );
        })}

      <button className="btn btn-primary" onClick={addMeaning}>
        Add meaning
      </button>

      <button type="submit" disabled={saving} className="btn btn-success">
        {saving ? "Saving..." : "Save"}
      </button>
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
  onMiddlePointClick: PropTypes.func.isRequired,
  onTranslateClick: PropTypes.func.isRequired,
  saving: PropTypes.bool,
};

export default IAdjectiveForm;
