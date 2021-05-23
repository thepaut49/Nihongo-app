import React from "react";
import { radicals, nbrOfStrokesString } from "../common/Radicals";
import CustomInput from "../common/CustomInput";
import CustomInputMeaning from "../common/CustomInputMeaning";
import CustomInputPronunciations from "../common/CustomInputPronunciations";
import CustomIntegerInput from "../common/CustomIntegerInput";
import PropTypes from "prop-types";

function KanjiForm({
  kanji,
  onChange,
  onSubmit,
  onClick,
  saving = false,
  errors = {},
  onPronunciationChange,
  onMeaningChange,
  addMeaning,
  addPronunciation,
  onMiddlePointClick,
  onTranslateClick,
  deleteMeaning,
  deletePronunciation,
}) {
  const gridListStyle = {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, 3.5em)",
    textAlign: "center",
    margin: "0.5em",
  };
  const numberStyle = {
    backgroundColor: "blue",
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  };

  return (
    <form onSubmit={onSubmit} className="modificationForm">
      <h2>{kanji.id ? "Edit" : "Add"} Kanji</h2>
      {errors.onSubmit && (
        <div className="alert alert-danger" role="alert">
          {errors.onSubmit}
        </div>
      )}
      <CustomInput
        id="kanji"
        label="Kanji"
        onChange={onChange}
        name="kanji"
        value={kanji.kanji}
        maxLength="1"
        error={errors.kanji}
      />

      {kanji.pronunciations &&
        kanji.pronunciations.length > 0 &&
        kanji.pronunciations.map((pro, index) => {
          return (
            <CustomInputPronunciations
              key={index}
              id={"pronunciation" + index}
              label={"Pronunciation " + (index + 1) + " :"}
              typeInput="text"
              onChange={onPronunciationChange}
              name={"pronunciation" + index}
              value={kanji.pronunciations[index].pronunciation}
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

      {kanji.meanings &&
        kanji.meanings.length > 0 &&
        kanji.meanings.map((_meaning, index) => {
          return (
            <CustomInputMeaning
              key={index + 1000}
              id={"meaning" + index}
              label={"Meaning " + (index + 1) + " :"}
              typeInput="text"
              onChange={(event) => onMeaningChange(event, index)}
              name={"meaning" + index}
              value={kanji.meanings[index].meaning}
              index={index}
              deleteMeaning={deleteMeaning}
            />
          );
        })}

      <button className="btn btn-primary" onClick={addMeaning}>
        Add meaning
      </button>

      <CustomIntegerInput
        id="strokeNumber"
        label="Strokes"
        onChange={onChange}
        step="1"
        name="strokeNumber"
        value={kanji.strokeNumber}
      />

      <CustomInput
        id="radicals"
        label="Radicals"
        typeInput="text"
        onChange={onChange}
        name="radicals"
        value={kanji.radicals}
        error={errors.radicals}
      />

      <button type="submit" disabled={saving} className="btn btn-primary">
        {saving ? "Saving..." : "Save"}
      </button>

      <div style={gridListStyle}>
        {radicals.map((radical, index) => {
          return (
            <>
              {nbrOfStrokesString.includes(radical) ? (
                <button key={index} style={numberStyle}>
                  {radical}
                </button>
              ) : (
                <button key={index} onClick={onClick}>
                  {radical}
                </button>
              )}
            </>
          );
        })}
      </div>
    </form>
  );
}

KanjiForm.propTypes = {
  kanji: PropTypes.object.isRequired,
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
  onClick: PropTypes.func.isRequired,
  saving: PropTypes.bool,
};

export default KanjiForm;
