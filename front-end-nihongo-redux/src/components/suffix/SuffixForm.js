import React from "react";
import CustomInput from "../common/CustomInput";
import CustomTextArea from "../common/CustomTextArea";
import CustomInputPronunciations from "../common/CustomInputPronunciations";
import PropTypes from "prop-types";

function SuffixForm({
  suffix,
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
  return (
    <form onSubmit={onSubmit} className="modificationForm">
      <CustomInput
        id="kanjis"
        label="Kanjis"
        onChange={onChange}
        name="kanjis"
        value={suffix.kanjis}
        error={errors.kanjis}
      />
      {suffix.pronunciations &&
        suffix.pronunciations.length > 0 &&
        suffix.pronunciations.map((pro, index) => {
          return (
            <CustomInputPronunciations
              key={index}
              id={"pronunciation" + index}
              label={"Pronunciation " + (index + 1) + " :"}
              typeInput="text"
              onChange={onPronunciationChange}
              name={"pronunciation" + index}
              value={suffix.pronunciations[index].pronunciation}
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
        value={suffix.use}
        onChange={onChange}
        error={errors.use}
      />
      <CustomTextArea
        id="summary"
        label="Summary"
        name="summary"
        cols={70}
        rows={5}
        value={suffix.summary}
        onChange={onChange}
        error={errors.summary}
      />
      <button type="submit" disabled={saving} className="validFormButton">
        {saving ? "Saving..." : "Save"}
      </button>
    </form>
  );
}

SuffixForm.propTypes = {
  suffix: PropTypes.object.isRequired,
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

export default SuffixForm;
