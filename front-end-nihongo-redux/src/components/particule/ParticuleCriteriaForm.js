import React from "react";
import CustomInput from "../common/CustomInput";
import PropTypes from "prop-types";
import "./ParticuleCriteriaForm.css";

const buttonSearchClearStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "1em",
  margin: "0.5em",
};

const hideFilters = (event) => {
  event.preventDefault();
  let formFiltersParticule = document.getElementById("formFiltersParticule");
  if (getComputedStyle(formFiltersParticule).display !== "none") {
    formFiltersParticule.style.display = "none";
  } else {
    formFiltersParticule.style.display = "block";
  }
};

function ParticuleCriteriaForm({
  particuleCriteria,
  onChange,
  onReset,
  onSubmit,
}) {
  return (
    <div className="filterStyle">
      <button onClick={hideFilters} className="hideFilterButtons">
        Filters
      </button>
      <form onSubmit={onSubmit} id="formFiltersParticule">
        <div className="grid-container-form-criteria-particule">
          <CustomInput
            id="kanjisCriteria"
            label="Kanjis"
            onChange={onChange}
            name="kanjisCriteria"
            value={particuleCriteria.kanjis}
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

ParticuleCriteriaForm.propTypes = {
  particuleCriteria: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};

export default ParticuleCriteriaForm;
