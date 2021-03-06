import React, { useState, useEffect } from "react";
import translationConstants from "../common/translationConstants";
import ListOfCandidates from "./ListOfCandidates";
import SplitPopup from "./SplitPopup";
import CustomSelect from "../common/CustomSelect";
import PropTypes from "prop-types";

const partStyle = {
  display: "grid",
  gridTemplateRows: "repeat(6,max-content)",
  borderRadius: "10px",
  backgroundColor: "var(--fourth-bg-color)",
  padding: "0.5em",
  gap: "0.6em",
  height: "min-content",
};

const partStyleUnknown = {
  ...partStyle,
  backgroundColor: "var(--fifth-bg-color)",
};

const kanjiStyle = {
  fontWeight: "bold",
};

const Part = (props) => {
  const [part, setPart] = useState({
    type: translationConstants.TYPE_UNKNOWN,
    kanjis: "",
    selectedPronunciation: "",
    selectedMeaning: "",
    pronunciations: [],
    meanings: [],
    unknown: true,
    length: 0,
    currentIndex: 0,
    listOfValues: [],
  });

  useEffect(() => {
    setPart(props.part);
  }, [props.part]);

  function handleChange(event) {
    let newValue = event.target.value;
    let newPart = {
      ...part,
      [event.target.name]: newValue,
    };
    setPart(newPart);
    if (props.onPronunciationChange) {
      props.onPronunciationChange(newPart);
    }
  }

  const onCandidateClick = (candidate) => {
    setPart(candidate);
    if (props.onPartChange) {
      props.onPartChange(candidate);
    }
  };

  return (
    <div style={part.unknown ? partStyleUnknown : partStyle}>
      <div style={kanjiStyle}>{part.kanjis}</div>
      <CustomSelect
        id="selectedPronunciation"
        name="selectedPronunciation"
        label="Pronunciation"
        value={part.selectedPronunciation}
        listOfValues={part.pronunciations}
        onChange={handleChange}
        emptyOption={false}
      />
      <CustomSelect
        id="selectedMeaning"
        name="selectedMeaning"
        label="Meaning"
        value={part.selectedMeaning}
        listOfValues={part.meanings}
        onChange={handleChange}
        emptyOption={false}
      />
      <div>
        <label>Type : </label>
        {part.type}
      </div>
      {process.env.NODE_ENV !== "development" && (
        <>
          <div>
            <label>Current Index : </label>
            {part.currentIndex}
          </div>
          <div>
            <label>Length : </label>
            {part.length}
          </div>
        </>
      )}

      {translationConstants.TYPE_UNKNOWN === part.type && (
        <>
          {part.length > 1 && (
            <SplitPopup oldPart={part} onSplitPart={props.onSplitPart} />
          )}

          {part.listOfValues.length > 0 && (
            <ListOfCandidates
              candidatesList={part.listOfValues}
              onCandidateClick={onCandidateClick}
            />
          )}
        </>
      )}
      {part && translationConstants.TYPE_UNKNOWN !== part.type && (
        <>
          <button
            className="btn btn-primary"
            onClick={(event) => props.onUnknownTransform(event, part)}
          >
            Unknown
          </button>
        </>
      )}
    </div>
  );
};

Part.propTypes = {
  part: PropTypes.object.isRequired,
  onPartChange: PropTypes.func.isRequired,
  onPronunciationChange: PropTypes.func.isRequired,
  onUnknownTransform: PropTypes.func.isRequired,
  onSplitPart: PropTypes.func.isRequired,
};

export default Part;
