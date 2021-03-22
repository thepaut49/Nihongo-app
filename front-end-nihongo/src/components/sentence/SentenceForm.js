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

function SentenceForm(props) {
  return (
    <form onSubmit={props.onSubmit} style={formStyle}>
      <CustomInput
        id="kanjis"
        label="Kanjis"
        onChange={props.onChange}
        name="kanjis"
        value={props.sentence.kanjis}
        error={props.errors.kanjis}
      />

      <CustomInputPronunciation
        id="pronunciation"
        label="Pronunciation"
        onChange={props.onChange}
        name="pronunciation"
        value={props.sentence.pronunciation}
        error={props.errors.pronunciation}
        onMiddlePointClick={props.onMiddlePointClick}
        onTranslateClick={props.onTranslateClick}
      />

      <CustomInput
        id="meaning"
        label="Meaning"
        onChange={props.onChange}
        name="meaning"
        value={props.sentence.meaning}
        error={props.errors.meaning}
      />

      <CustomSelect
        id="topic"
        label="Topic"
        onChange={props.onChange}
        name="topic"
        value={props.sentence.topic}
        listOfValues={topicList}
      />

      <input type="submit" value="Save" className="btn btn-primary" />
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
};

export default SentenceForm;
