import React from "react";
import { radicals, nbrOfStrokesString } from "../common/Radicals";
import CustomInput from "../common/CustomInput";
import CustomInputMeaning from "../common/CustomInputMeaning";
import CustomInputPronunciations from "../common/CustomInputPronunciations";
import CustomIntegerInput from "../common/CustomIntegerInput";
import PropTypes from "prop-types";

function KanjiForm(props) {
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
    <form onSubmit={props.onSubmit} className="modificationForm">
      <CustomInput
        id="kanji"
        label="Kanji"
        onChange={props.onChange}
        name="kanji"
        value={props.kanji.kanji}
        maxLength="1"
        error={props.errors.kanji}
      />

      {props.kanji.pronunciations &&
        props.kanji.pronunciations.length > 0 &&
        props.kanji.pronunciations.map((pro, index) => {
          return (
            <CustomInputPronunciations
              key={index}
              id={"pronunciation" + index}
              label={"Pronunciation " + (index + 1) + " :"}
              typeInput="text"
              onChange={props.onPronunciationChange}
              name={"pronunciation" + index}
              value={props.kanji.pronunciations[index].pronunciation}
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

      {props.kanji.meanings &&
        props.kanji.meanings.length > 0 &&
        props.kanji.meanings.map((_meaning, index) => {
          return (
            <CustomInputMeaning
              key={index + 1000}
              id={"meaning" + index}
              label={"Meaning " + (index + 1) + " :"}
              typeInput="text"
              onChange={(event) => props.onMeaningChange(event, index)}
              name={"meaning" + index}
              value={props.kanji.meanings[index].meaning}
              index={index}
              deleteMeaning={props.deleteMeaning}
            />
          );
        })}

      <button className="btn btn-primary" onClick={props.addMeaning}>
        Add meaning
      </button>

      <CustomIntegerInput
        id="strokeNumber"
        label="Strokes"
        onChange={props.onChange}
        step="1"
        name="strokeNumber"
        value={props.kanji.strokeNumber}
      />

      <CustomInput
        id="radicals"
        label="Radicals"
        typeInput="text"
        onChange={props.onChange}
        name="radicals"
        value={props.kanji.radicals}
        error={props.errors.radicals}
      />

      <input type="submit" value="Save" className="btn btn-success" />

      <div style={gridListStyle}>
        {radicals.map((radical, index) => {
          return (
            <>
              {nbrOfStrokesString.includes(radical) ? (
                <button key={index} style={numberStyle}>
                  {radical}
                </button>
              ) : (
                <button key={index} onClick={props.onClick}>
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
};

export default KanjiForm;
