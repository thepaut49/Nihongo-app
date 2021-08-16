import React, { useState } from "react";
import Popup from "reactjs-popup";
import translationConstants from "../../common/translationConstants";
import { translateRomajiToKana } from "../../common/TranslateRomajiToKana";
import { radicals as radicalsList } from "../../common/Radicals";
import CustomSelect from "../../common/CustomSelect";
import CriteriaForm from "./CriteriaForm";
import { filterObjects } from "./filter";
import ResultList from "./ResultList";
import { filterKanjis } from "../../../api/kanjiApi";
import PropTypes from "prop-types";
import "./QuickSearchPopUp.css";

const styleTriggerButton = {
  display: "grid",
  gridTemplateColumns: "1fr",
  paddingTop: "1em",
};

const quickSearchPopUpStyle = {
  backgroundColor: "var(--primary-bg-color)",
  width: "80em",
  height: "50em",
  borderRadius: "10px",
  overflow: "scroll",
  border: "solid var(--third-bg-color)",
};

const headerStyle = {
  width: "100%",
  textAlign: "center",
  padding: "0.3em",
  display: "grid",
  gridTemplateColumns: "min-content 1fr",
};

const contentStyle = {
  display: "grid",
  grid: "min-content 1fr / 1fr",
  margin: "0.5em",
  gap: "0.5em",
};

const QuickSearchPopUp = (props) => {
  /* variables */
  const typeSelectSearchListOfValue = [
    translationConstants.TYPE_ALL,
    translationConstants.TYPE_KANJI,
  ];
  const [typeSelectSearch, setTypeSelectSearch] = useState(
    translationConstants.TYPE_KANJI
  );
  const [results, setResults] = useState([]);
  const [criteria, setCriteria] = useState({
    kanjis: "",
    pronunciation: "",
    meaning: "",
    strokeNumber: "",
    minStrokeNumber: "",
    maxStrokeNumber: "",
    radicals: "",
  });
  const [errors, setErrors] = useState({});

  /* functions */
  // handle the change of the type of word
  const handleTypeSelectSearchChange = (event) => {
    setTypeSelectSearch(event.target.value);
    setResults([]);
  };

  // handle the changes in the field of the criteria form
  function handleCriteriaChange(event) {
    let newValue = event.target.value;
    if (event.target.name === "pronunciation") {
      newValue = translateRomajiToKana(newValue);
      let input = document.getElementById("pronunciation");
      input.value = newValue;
    }
    setCriteria({
      ...criteria,
      [event.target.name]: newValue,
    });
  }

  // verify that the content of the form is correct
  function formIsValid() {
    const _errors = {};
    if (
      typeSelectSearch === translationConstants.TYPE_KANJI &&
      criteria.radicals.length > 0
    ) {
      for (let i = 0; i < criteria.radicals.length; i++) {
        if (radicalsList.indexOf(criteria.radicals[i]) === -1) {
          _errors.radicals = "Some of the characters are not radicals.";
          break;
        }
      }
    }

    setErrors(_errors);
    // form is valid if the erros object has no properties
    return Object.keys(_errors).length === 0;
  }

  // function launch when the user submit the form
  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    if (typeSelectSearch === translationConstants.TYPE_KANJI) {
      const kanji = {
        kanji: criteria.kanjis,
        pronunciation: criteria.pronunciation,
        meaning: criteria.meaning,
        strokeNumber: criteria.strokeNumber,
        minStrokeNumber: criteria.minStrokeNumber,
        maxStrokeNumber: criteria.maxStrokeNumber,
        radicals: criteria.radicals,
      };
      filterKanjis(kanji).then((kanjis) => {
        setResults(kanjis);
      });
    } else {
      const object = {
        kanjis: criteria.kanjis,
        pronunciation: criteria.pronunciation,
        meaning: criteria.meaning,
      };
      filterObjects(object).then((_results) => {
        setResults(_results);
      });
    }
  }

  // function that handle the click on radicals button in the criteria form
  function handleClick(event) {
    event.preventDefault();
    if (criteria.radicals.indexOf(event.target.innerText) > -1)
      setCriteria({
        ...criteria,
        radicals: criteria.radicals.replace(event.target.innerText, ""),
      });
    else {
      setCriteria({
        ...criteria,
        radicals: criteria.radicals + event.target.innerText,
      });
    }
  }

  // function that handle the click on the clear button
  function handleClearSearch(event) {
    event.preventDefault();
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
    setCriteria({
      kanjis: "",
      pronunciation: "",
      meaning: "",
      strokeNumber: "",
      minStrokeNumber: "",
      maxStrokeNumber: "",
      radicals: "",
    });
    setResults([]);
  }

  // function that handle the click on the result button
  const handleResultClick = (event, result) => {
    event.preventDefault();
    props.onQuickSearchClick(event, result);
  };

  /* Render */
  return (
    <Popup
      trigger={(open) => (
        <div style={styleTriggerButton}>
          <button className="translationAreaButtons"> Quick search </button>
        </div>
      )}
      position="center center"
      modal
      closeOnDocumentClick
    >
      {(close) => (
        <div style={quickSearchPopUpStyle}>
          <div style={headerStyle}>
            <button className="close" onClick={close}>
              &times;
            </button>
            <h2 className="QuickSearchTitle">Quick search</h2>
          </div>

          <div style={contentStyle}>
            <CustomSelect
              id="typeSelectSearch"
              label="Type"
              onChange={handleTypeSelectSearchChange}
              name="typeSelectSearch"
              value={typeSelectSearch}
              listOfValues={typeSelectSearchListOfValue}
            />

            <CriteriaForm
              criteria={criteria}
              errors={errors}
              typeSelectSearch={typeSelectSearch}
              onChange={handleCriteriaChange}
              onClick={handleClick}
              onSubmit={handleSubmit}
              onReset={handleClearSearch}
            />
            {results && results.length > 0 && (
              <div>
                <ResultList
                  results={results}
                  typeSelectSearch={typeSelectSearch}
                  close={close}
                  onClick={handleResultClick}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </Popup>
  );
};

QuickSearchPopUp.propTypes = {
  onQuickSearchClick: PropTypes.func.isRequired,
};

export default QuickSearchPopUp;
