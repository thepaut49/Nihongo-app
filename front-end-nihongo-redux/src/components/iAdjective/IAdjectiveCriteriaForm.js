import React from "react";
import CustomInput from "../common/CustomInput";
import PropTypes from "prop-types";
import "./IAdjectiveCriteriaForm.css";

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
  let formFiltersIAdjective = document.getElementById("formFiltersIAdjective");
  if (getComputedStyle(formFiltersIAdjective).display !== "none") {
    formFiltersIAdjective.style.display = "none";
  } else {
    formFiltersIAdjective.style.display = "block";
  }
};

function IAdjectiveCriteriaForm({
  iAdjectiveCriteria,
  onChange,
  onReset,
  onSubmit,
}) {
  return (
    <div className="filterStyle">
      <button
        id="buttonFiltersKanji"
        onClick={hideFilters}
        className="btn btn-success"
        style={buttonFiltersStyle}
      >
        Filters
      </button>
      <form onSubmit={onSubmit} id="formFiltersIAdjective">
        <div className="grid-container-form-criteria-i-adjective">
          <CustomInput
            id="kanjisCriteria"
            label="Kanjis"
            onChange={onChange}
            name="kanjisCriteria"
            value={iAdjectiveCriteria.kanjis}
          />

          <CustomInput
            id="pronunciationCriteria"
            label="PronunciationCriteria"
            onChange={onChange}
            name="pronunciationCriteria"
            value={iAdjectiveCriteria.pronunciation}
          />

          <CustomInput
            id="meaningCriteria"
            label="MeaningCriteria"
            onChange={onChange}
            name="meaningCriteria"
            value={iAdjectiveCriteria.meaning}
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

IAdjectiveCriteriaForm.propTypes = {
  iAdjectiveCriteria: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};

export default IAdjectiveCriteriaForm;
