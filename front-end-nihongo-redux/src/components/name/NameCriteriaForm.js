import React from "react";
import CustomInput from "../common/CustomInput";
import PropTypes from "prop-types";
import "./NameCriteriaForm.css";

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
  let formFiltersName = document.getElementById("formFiltersName");
  if (getComputedStyle(formFiltersName).display !== "none") {
    formFiltersName.style.display = "none";
  } else {
    formFiltersName.style.display = "block";
  }
};

function NameCriteriaForm({ nameCriteria, onChange, onReset, onSubmit }) {
  return (
    <div style={filterStyle}>
      <button
        onClick={hideFilters}
        className="btn btn-success"
        style={buttonFiltersStyle}
      >
        Filters
      </button>
      <form onSubmit={onSubmit} id="formFiltersName">
        <div className="grid-container-form-criteria-name">
          <CustomInput
            id="kanjisCriteria"
            label="Kanjis"
            onChange={onChange}
            name="kanjisCriteria"
            value={nameCriteria.kanjis}
          />

          <CustomInput
            id="pronunciationCriteria"
            label="PronunciationCriteria"
            onChange={onChange}
            name="pronunciationCriteria"
            value={nameCriteria.pronunciation}
          />

          <CustomInput
            id="meaningCriteria"
            label="MeaningCriteria"
            onChange={onChange}
            name="meaningCriteria"
            value={nameCriteria.meaning}
          />
        </div>
        <div style={buttonSearchClearStyle}>
          <input type="submit" value="Search" className="btn btn-primary" />
          <button onClick={onReset} className="btn btn-primary">
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}

NameCriteriaForm.propTypes = {
  nameCriteria: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};

export default NameCriteriaForm;