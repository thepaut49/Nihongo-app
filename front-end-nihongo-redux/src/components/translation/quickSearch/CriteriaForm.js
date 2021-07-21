import React from "react";
import { radicals, nbrOfStrokesString } from "../../common/Radicals";
import translationConstants from "../../common/translationConstants";
import CustomInput from "../../common/CustomInput";
import CustomIntegerInput from "../../common/CustomIntegerInput";
import PropTypes from "prop-types";

const gridListStyle = {
  width: "100%",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, 3.5em)",
  textAlign: "center",
  margin: "0.5em",
};

const filterStyle = {
  backgroundColor: "var(--secondary-bg-color)",
  borderRadius: "10px",
  padding: "0.4em",
};

const buttonFiltersStyle = {
  margin: "0.4em",
};

const buttonSearchClearStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
};

const commonCriteriaStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, 37em)",
  gap: "1em 1em",
};

const kanjiCriteriaStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, 37em)",
  gap: "1em 1em",
};

const radicalsCriteriaStyle = {
  display: "grid",
  gridTemplateColumns: "1fr",
};

function CriteriaForm(props) {
  const typeSelectSearch = props.typeSelectSearch;

  const hideFilters = (event) => {
    event.preventDefault();
    let formFiltersCriteria = document.getElementById("formFiltersCriteria");
    if (getComputedStyle(formFiltersCriteria).display !== "none") {
      formFiltersCriteria.style.display = "none";
    } else {
      formFiltersCriteria.style.display = "block";
    }
  };

  return (
    <div style={filterStyle}>
      <form onSubmit={props.onSubmit}>
        <button
          id="buttonFiltersCriteria"
          onClick={hideFilters}
          className="btn btn-success"
          style={buttonFiltersStyle}
        >
          Filters
        </button>

        <div className="buttons" style={buttonSearchClearStyle}>
          <input type="submit" value="Search" className="filtersButtons" />
          <button onClick={props.onReset} className="filtersButtons">
            Clear
          </button>
        </div>
        <div id="formFiltersCriteria">
          <div style={commonCriteriaStyle}>
            <CustomInput
              id="kanjis"
              label="Kanji"
              onChange={props.onChange}
              name="kanjis"
              value={props.criteria.kanjis}
            />

            <CustomInput
              id="pronunciation"
              label="Pronunciation"
              onChange={props.onChange}
              name="pronunciation"
              value={props.criteria.pronunciation}
            />

            <CustomInput
              id="meaning"
              label="Meaning"
              onChange={props.onChange}
              name="meaning"
              value={props.criteria.meaning}
            />
          </div>

          {typeSelectSearch === translationConstants.TYPE_KANJI && (
            <>
              <div style={kanjiCriteriaStyle}>
                <CustomIntegerInput
                  id="strokeNumber"
                  label="Strokes"
                  onChange={props.onChange}
                  step="1"
                  name="strokeNumber"
                  value={props.criteria.strokeNumber}
                />

                <CustomIntegerInput
                  id="minStrokeNumber"
                  label="Min strokes"
                  onChange={props.onChange}
                  step="1"
                  name="minStrokeNumber"
                  value={props.criteria.minStrokeNumber}
                />

                <CustomIntegerInput
                  id="maxStrokeNumber"
                  label="Max strokes"
                  onChange={props.onChange}
                  step="1"
                  name="maxStrokeNumber"
                  value={props.criteria.maxStrokeNumber}
                />
              </div>

              <div style={radicalsCriteriaStyle}>
                <CustomInput
                  id="radicals"
                  label="Radicals"
                  typeInput="text"
                  onChange={props.onChange}
                  name="radicals"
                  value={props.criteria.radicals}
                  error={props.errors.radicals}
                />

                <div style={gridListStyle}>
                  {radicals.map((radical, index) => {
                    return (
                      <button
                        key={index + 20000}
                        className={
                          nbrOfStrokesString.includes(radical)
                            ? "radicalsNumberButtons"
                            : "radicalsNotNumberButtons"
                        }
                      >
                        {radical}
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </form>
    </div>
  );
}

CriteriaForm.propTypes = {
  criteria: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  typeSelectSearch: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
};

export default CriteriaForm;
