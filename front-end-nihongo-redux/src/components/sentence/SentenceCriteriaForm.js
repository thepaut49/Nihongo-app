import React from "react";
import CustomInput from "../common/CustomInput";
import CustomSelect from "../common/CustomSelect";
import PropTypes from "prop-types";
import "./SentenceCriteriaForm.css";
import { topicList } from "../common/sentenceConstants";

const buttonFiltersStyle = {
  margin: "0.4em",
};

const buttonSearchClearStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "1em",
  margin: "0.5em",
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

function SentenceCriteriaForm({
  sentenceCriteria,
  onChange,
  onReset,
  onSubmit,
}) {
  return (
    <div className="filterStyle">
      <button
        onClick={hideFilters}
        className="btn btn-success"
        style={buttonFiltersStyle}
      >
        Filters
      </button>
      <form onSubmit={onSubmit} id="formFiltersSentence">
        <div className="grid-container-form-criteria-sentence">
          <CustomInput
            id="kanjisCriteria"
            label="Kanjis"
            onChange={onChange}
            name="kanjisCriteria"
            value={sentenceCriteria.kanjis}
          />

          <CustomInput
            id="pronunciationCriteria"
            label="PronunciationCriteria"
            onChange={onChange}
            name="pronunciationCriteria"
            value={sentenceCriteria.pronunciation}
          />

          <CustomInput
            id="meaningCriteria"
            label="MeaningCriteria"
            onChange={onChange}
            name="meaningCriteria"
            value={sentenceCriteria.meaning}
          />

          <CustomSelect
            id="topicCriteria"
            label="Topic"
            onChange={onChange}
            name="topicCriteria"
            value={sentenceCriteria.topic}
            listOfValues={topicList}
          />
        </div>
        <div style={buttonSearchClearStyle}>
          <input type="submit" value="Search" className="filtersButtons" />
          <button onClick={onReset} className="filtersButtons">
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
