import React from "react";
import CustomInput from "../common/CustomInput";
import CustomInputPronunciation from "../common/CustomInputPronunciation";
import CustomSelect from "../common/CustomSelect";
import PropTypes from "prop-types";
import { topicList } from "../common/sentenceConstants";

const formStyle = {
  backgroundColor: "#4682B4",
  margin: "1em",
  padding: "0.5em",
  borderRadius: "10px",
};

function SentenceForm({
  sentence,
  onSubmit,
  onChange,
  saving = false,
  errors = {},
  onMiddlePointClick,
  onTranslateClick,
}) {
  return (
    <form onSubmit={onSubmit} style={formStyle}>
      <h2>{sentence.id ? "Edit" : "Add"} Sentence</h2>
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
        value={sentence.kanjis}
        error={errors.kanjis}
      />

      <CustomInputPronunciation
        id="pronunciation"
        label="Pronunciation"
        onChange={onChange}
        name="pronunciation"
        value={sentence.pronunciation}
        error={errors.pronunciation}
        onMiddlePointClick={onMiddlePointClick}
        onTranslateClick={onTranslateClick}
      />

      <CustomInput
        id="meaning"
        label="Meaning"
        onChange={onChange}
        name="meaning"
        value={sentence.meaning}
        error={errors.meaning}
      />

      <CustomSelect
        id="topic"
        label="Topic"
        onChange={onChange}
        name="topic"
        value={sentence.topic}
        listOfValues={topicList}
      />

      <button type="submit" disabled={saving} className="btn btn-success">
        {saving ? "Saving..." : "Save"}
      </button>
    </form>
  );
}

SentenceForm.propTypes = {
  sentence: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  onMiddlePointClick: PropTypes.func.isRequired,
  onTranslateClick: PropTypes.func.isRequired,
  saving: PropTypes.bool,
};

export default SentenceForm;
