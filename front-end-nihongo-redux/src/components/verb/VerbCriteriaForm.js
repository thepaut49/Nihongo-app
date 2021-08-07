import React from "react";
import CustomInput from "../common/CustomInput";
import CustomSelect from "../common/CustomSelect";
import { verbConstants } from "../common/verbConstants";
import PropTypes from "prop-types";
import "./verbCriteriaForm.css";

const buttonSearchClearStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "1em",
  margin: "0.5em",
};

const hideFilters = (event) => {
  event.preventDefault();
  let formFiltersVerb = document.getElementById("formFiltersVerb");
  if (getComputedStyle(formFiltersVerb).display !== "none") {
    formFiltersVerb.style.display = "none";
  } else {
    formFiltersVerb.style.display = "block";
  }
};

function VerbCriteriaForm({ verbCriteria, onChange, onReset, onSubmit }) {
  return (
    <div className="filterStyle">
      <button onClick={hideFilters} className="hideFilterButtons">
        Filters
      </button>
      <form onSubmit={onSubmit} id="formFiltersVerb">
        <div className="grid-container-form-criteria-verb">
          <CustomInput
            id="neutralFormCriteria"
            label="Neutral form"
            onChange={onChange}
            name="neutralFormCriteria"
            value={verbCriteria.neutralForm}
          />

          <CustomInput
            id="pronunciationCriteria"
            label="PronunciationCriteria"
            onChange={onChange}
            name="pronunciationCriteria"
            value={verbCriteria.pronunciation}
          />

          <CustomInput
            id="meaningCriteria"
            label="MeaningCriteria"
            onChange={onChange}
            name="meaningCriteria"
            value={verbCriteria.meaning}
          />

          <CustomSelect
            id="groupeCriteria"
            label="Group"
            onChange={onChange}
            name="groupeCriteria"
            value={verbCriteria.groupe}
            listOfValues={verbConstants.verbGroupList}
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

VerbCriteriaForm.propTypes = {
  verbCriteria: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};

export default VerbCriteriaForm;
