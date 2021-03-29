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

const styleTriggerButton = {
  display: "grid",
  grid: "/ 1fr",
  padding: "0.4em",
};

const quickSearchPopUpStyle = {
  backgroundColor: "blue",
  width: "80em",
  height: "50em",
  borderRadius: "10px",
  overflow: "scroll",
};

const headerStyle = {
  width: "100%",
  textAlign: "center",
  padding: "0.3em",
};

const contentStyle = {
  display: "grid",
  grid: "min-content 1fr / 1fr",
};

const QuickSearchPopUp = (props) => {
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

  const handleTypeSelectSearchChange = (event) => {
    setTypeSelectSearch(event.target.value);
  };

  // fonction for criteria form
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

  const handleResultClick = (event, result) => {
    event.preventDefault();
    debugger;
    props.onQuickSearchClick(event, result);
  };

  return (
    <Popup
      trigger={(open) => (
        <div style={styleTriggerButton}>
          <button className="btn btn-primary"> Open Modal </button>
        </div>
      )}
      position="center center"
      modal
      closeOnDocumentClick
    >
      {(close) => (
        <div style={quickSearchPopUpStyle}>
          <button className="close" onClick={close}>
            &times;
          </button>
          <div style={headerStyle}>
            <h4>Quick search</h4>
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

export default QuickSearchPopUp;
