import React from "react";
import { radicals, nbrOfStrokesString } from "../common/Radicals";
import CustomInput from "../common/CustomInput";
import CustomInputPronunciation from "../common/CustomInputPronunciation";
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

  const formStyle = {
    display: "grid",
    gridTemplateColumns: "1fr",
    backgroundColor: "#4682B4",
    margin: "1em",
    padding: "0.5em",
    borderRadius: "10px",
  };

  return (
    <form onSubmit={props.onSubmit} style={formStyle}>
      <CustomInput
        id="kanji"
        label="Kanji"
        onChange={props.onChange}
        name="kanji"
        value={props.kanji.kanji}
        maxLength="1"
        error={props.errors.kanji}
      />

      <CustomInputPronunciation
        id="pronunciation"
        label="Pronunciation"
        onChange={props.onChange}
        name="pronunciation"
        value={props.kanji.pronunciation}
        error={props.errors.pronunciation}
        onMiddlePointClick={props.onMiddlePointClick}
        onTranslateClick={props.onTranslateClick}
      />

      {props.kanji.meanings &&
        props.kanji.meanings.length > 0 &&
        props.kanji.meanings.map((_meaning, index) => {
          return (
            <CustomInput
              key={index * 1000 + 1}
              id={"meaning" + index}
              label={"Meaning" + (index + 1) + " :"}
              typeInput="text"
              onChange={(event) => props.onMeaningChange(event, index)}
              name={"meaning" + index}
              value={props.kanji.meanings[index].meaning}
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

      <input type="submit" value="Save" className="btn btn-primary" />

      <div style={gridListStyle}>
        {radicals.map((radical, index) => {
          return (
            <>
              {nbrOfStrokesString.includes(radical) ? (
                <button key={index + 1} style={numberStyle}>
                  {radical}
                </button>
              ) : (
                <button key={index + 1} onClick={props.onClick}>
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
};

export default KanjiForm;
