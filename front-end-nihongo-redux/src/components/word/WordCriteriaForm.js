import React from "react";
import CustomInput from "../common/CustomInput";
import PropTypes from "prop-types";
import "./WordCriteriaForm.css";

const buttonSearchClearStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "1em",
  margin: "0.5em",
};

const hideFilters = (event) => {
  event.preventDefault();
  let formFiltersWord = document.getElementById("formFiltersWord");
  if (getComputedStyle(formFiltersWord).display !== "none") {
    formFiltersWord.style.display = "none";
  } else {
    formFiltersWord.style.display = "block";
  }
};

function WordCriteriaForm({ wordCriteria, onChange, onReset, onSubmit }) {
  return (
    <div className="filterStyle">
      <button onClick={hideFilters} className="hideFilterButtons">
        Filters
      </button>
      <form onSubmit={onSubmit} id="formFiltersWord">
        <div className="grid-container-form-criteria-word">
          <CustomInput
            id="kanjisCriteria"
            label="Kanjis"
            onChange={onChange}
            name="kanjisCriteria"
            value={wordCriteria.kanjis}
          />

          <CustomInput
            id="pronunciationCriteria"
            label="PronunciationCriteria"
            onChange={onChange}
            name="pronunciationCriteria"
            value={wordCriteria.pronunciation}
          />

          <CustomInput
            id="meaningCriteria"
            label="MeaningCriteria"
            onChange={onChange}
            name="meaningCriteria"
            value={wordCriteria.meaning}
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

WordCriteriaForm.propTypes = {
  wordCriteria: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};

export default WordCriteriaForm;
