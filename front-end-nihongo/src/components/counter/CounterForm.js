import React from "react";
import CustomInput from "../common/CustomInput";
import CustomTextArea from "../common/CustomTextArea";
import CustomInputPronunciations from "../common/CustomInputPronunciations";

import PropTypes from "prop-types";

function CounterForm(props) {
  return (
    <form onSubmit={props.onSubmit} className="modificationForm">
      <CustomInput
        id="kanjis"
        label="Kanjis"
        onChange={props.onChange}
        name="kanjis"
        value={props.counter.kanjis}
        error={props.errors.kanjis}
      />

      {props.counter.pronunciations &&
        props.counter.pronunciations.length > 0 &&
        props.counter.pronunciations.map((pro, index) => {
          return (
            <CustomInputPronunciations
              key={index}
              id={"pronunciation" + index}
              label={"Pronunciation " + (index + 1) + " :"}
              typeInput="text"
              onChange={props.onPronunciationChange}
              name={"pronunciation" + index}
              value={props.counter.pronunciations[index].pronunciation}
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

      <CustomTextArea
        id="use"
        label="Use"
        name="use"
        cols={70}
        rows={15}
        value={props.counter.use}
        onChange={props.onChange}
        error={props.errors.use}
      />

      <CustomTextArea
        id="summary"
        label="Summary"
        name="summary"
        cols={70}
        rows={5}
        value={props.counter.summary}
        onChange={props.onChange}
        error={props.errors.summary}
      />

      <input type="submit" value="Save" className="btn btn-success" />
    </form>
  );
}

CounterForm.propTypes = {
  counter: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  deleteMeaning: PropTypes.func.isRequired,
  onMiddlePointClick: PropTypes.func.isRequired,
  onTranslateClick: PropTypes.func.isRequired,
};

export default CounterForm;
