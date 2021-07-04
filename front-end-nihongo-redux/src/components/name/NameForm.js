import React from "react";
import CustomInput from "../common/CustomInput";
import CustomInputMeaning from "../common/CustomInputMeaning";
import CustomInputPronunciations from "../common/CustomInputPronunciations";
import PropTypes from "prop-types";

function NameForm({
  name,
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
      <CustomInput
        id="kanjis"
        label="Kanjis"
        onChange={onChange}
        name="kanjis"
        value={name.kanjis}
        error={errors.kanjis}
      />
      {name.pronunciations &&
        name.pronunciations.length > 0 &&
        name.pronunciations.sort(orderPronunciation).map((pro, index) => {
          return (
            <CustomInputPronunciations
              key={index}
              id={"pronunciation" + index}
              label={"Pronunciation " + (index + 1) + " :"}
              typeInput="text"
              onChange={onPronunciationChange}
              name={"pronunciation" + index}
              value={name.pronunciations[index].pronunciation}
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
      {name.meanings &&
        name.meanings.length > 0 &&
        name.meanings.sort(orderMeaning).map((_meaning, index) => {
          return (
            <CustomInputMeaning
              key={index}
              id={"meaning" + index}
              label={"Meaning " + (index + 1) + " :"}
              typeInput="text"
              onChange={(event) => onMeaningChange(event, index)}
              name={"meaning" + index}
              value={name.meanings[index].meaning}
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
      </button>{" "}
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
  saving: PropTypes.bool,
};

export default NameForm;
