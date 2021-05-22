import React from "react";
import CustomInput from "../common/CustomInput";
import PropTypes from "prop-types";
import "./CounterCriteriaForm.css";

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
  let formFiltersCounter = document.getElementById("formFiltersCounter");
  if (getComputedStyle(formFiltersCounter).display !== "none") {
    formFiltersCounter.style.display = "none";
  } else {
    formFiltersCounter.style.display = "block";
  }
};

function CounterCriteriaForm({ counterCriteria, onChange, onReset, onSubmit }) {
  return (
    <div style={filterStyle}>
      <button
        id="buttonFiltersCounter"
        onClick={hideFilters}
        className="btn btn-success"
        style={buttonFiltersStyle}
      >
        Filters
      </button>
      <form onSubmit={onSubmit} id="formFiltersCounter">
        <div className="grid-container-form-criteria-counter">
          <CustomInput
            id="kanjisCriteria"
            label="Kanjis"
            onChange={onChange}
            name="kanjisCriteria"
            value={counterCriteria.kanjis}
          />

          <CustomInput
            id="pronunciationCriteria"
            label="Pronunciation"
            onChange={onChange}
            name="pronunciationCriteria"
            value={counterCriteria.pronunciation}
          />

          <CustomInput
            id="useCriteria"
            label="Use"
            onChange={onChange}
            name="useCriteria"
            value={counterCriteria.use}
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

CounterCriteriaForm.propTypes = {
  counterCriteria: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};

export default CounterCriteriaForm;
