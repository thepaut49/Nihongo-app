import React from "react";
import CustomInput from "../common/CustomInput";
import CustomTextArea from "../common/CustomTextArea";
import CustomInputPronunciations from "../common/CustomInputPronunciations";

import PropTypes from "prop-types";

function CounterForm({
  counter,
  onSubmit,
  onChange,
  saving = false,
  errors = {},
  onPronunciationChange,
  deletePronunciation,
  onMiddlePointClick,
  onTranslateClick,
  addPronunciation,
}) {
  const orderPronunciation = (a, b) => {
    return a.pronunciationNumber - b.pronunciationNumber;
  };

  return (
    <form onSubmit={onSubmit} className="modificationForm">
      <h2>{counter.id ? "Edit" : "Add"} Counter</h2>
      {errors.onSubmit && (
        <div className="alert-modif alert-danger-modif" role="alert">
          {errors.onSubmit}
        </div>
      )}

      <CustomInput
        id="kanjis"
        label="Kanjis"
        onChange={onChange}
        name="kanjis"
        value={counter.kanjis}
        error={errors.kanjis}
      />

      {counter.pronunciations &&
        counter.pronunciations.length > 0 &&
        counter.pronunciations.sort(orderPronunciation).map((pro, index) => {
          return (
            <CustomInputPronunciations
              key={index}
              id={"pronunciation" + index}
              label={"Pronunciation " + (index + 1) + " :"}
              typeInput="text"
              onChange={onPronunciationChange}
              name={"pronunciation" + index}
              value={counter.pronunciations[index].pronunciation}
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

      <CustomTextArea
        id="use"
        label="Use"
        name="use"
        cols={70}
        rows={15}
        value={counter.use}
        onChange={onChange}
        error={errors.use}
      />

      <CustomTextArea
        id="summary"
        label="Summary"
        name="summary"
        cols={70}
        rows={5}
        value={counter.summary}
        onChange={onChange}
        error={errors.summary}
      />

      <button type="submit" disabled={saving} className="validFormButton">
        {saving ? "Saving..." : "Save"}
      </button>
    </form>
  );
}

CounterForm.propTypes = {
  counter: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  deletePronunciation: PropTypes.func.isRequired,
  addPronunciation: PropTypes.func.isRequired,
  onPronunciationChange: PropTypes.func.isRequired,
  onMiddlePointClick: PropTypes.func.isRequired,
  onTranslateClick: PropTypes.func.isRequired,
  saving: PropTypes.bool,
};

export default CounterForm;
