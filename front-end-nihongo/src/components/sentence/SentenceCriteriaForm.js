import React from "react";
import CustomInput from "../common/CustomInput";
import CustomSelect from "../common/CustomSelect";
import PropTypes from "prop-types";
import "./SentenceCriteriaForm.css";
import { topicList } from "../common/sentenceConstants";

const filterStyle = {
  backgroundColor: "#4682B4",
  borderRadius: "10px",
  padding: "0.3em",
};

const buttonFiltersStyle = {
  margin: "0.4em",
};

const buttonSearchClearStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "1em",
};

const hideFilters = (event) => {
  event.preventDefault();
  let formFiltersSentence = document.getElementById("formFiltersSentence");
  if (getComputedStyle(formFiltersSentence).display !== "none") {
    formFiltersSentence.style.display = "none";
  } else {
    formFiltersSentence.style.display = "block";
  }
};

function SentenceCriteriaForm(props) {
  return (
    <div style={filterStyle}>
      <button
        onClick={hideFilters}
        className="btn btn-success"
        style={buttonFiltersStyle}
      >
        Filters
      </button>
      <form onSubmit={props.onSubmit} id="formFiltersSentence">
        <div className="grid-container-form-criteria-sentence">
          <CustomInput
            id="kanjisCriteria"
            label="Kanjis"
            onChange={props.onChange}
            name="kanjisCriteria"
            value={props.sentenceCriteria.kanjis}
          />

          <CustomInput
            id="pronunciationCriteria"
            label="PronunciationCriteria"
            onChange={props.onChange}
            name="pronunciationCriteria"
            value={props.sentenceCriteria.pronunciation}
          />

          <CustomInput
            id="meaningCriteria"
            label="MeaningCriteria"
            onChange={props.onChange}
            name="meaningCriteria"
            value={props.sentenceCriteria.meaning}
          />

          <CustomSelect
            id="topicCriteria"
            label="Topic"
            onChange={props.onChange}
            name="topicCriteria"
            value={props.sentenceCriteria.topic}
            listOfValues={topicList}
          />
        </div>
        <div style={buttonSearchClearStyle}>
          <input type="submit" value="Search" className="btn btn-primary" />
          <button onClick={props.onReset} className="btn btn-primary">
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}

SentenceCriteriaForm.propTypes = {
  sentenceCriteria: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};

export default SentenceCriteriaForm;
