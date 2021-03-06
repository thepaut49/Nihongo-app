import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import "./SplitPopup.css";
import translationConstants from "../common/translationConstants";
import PropTypes from "prop-types";

const SplitPopup = (props) => {
  const oldPart = props.oldPart;
  const [firstPart, setFirstPart] = useState({
    type: translationConstants.TYPE_UNKNOWN,
    kanjis: "",
    selectedPronunciation: "?",
    selectedMeaning: "?",
    pronunciations: ["?"],
    meanings: ["?"],
    unknown: true,
    length: 0,
    currentIndex: 0,
    listOfValues: [],
  });
  const [secondPart, setSecondPart] = useState({
    type: translationConstants.TYPE_UNKNOWN,
    kanjis: "",
    selectedPronunciation: "?",
    selectedMeaning: "?",
    pronunciations: ["?"],
    meanings: ["?"],
    unknown: true,
    length: 0,
    currentIndex: 0,
    listOfValues: [],
  });

  useEffect(() => {
    setFirstPart({
      type: translationConstants.TYPE_UNKNOWN,
      kanjis: oldPart.kanjis.substr(0, oldPart.kanjis.length - 1),
      selectedPronunciation: "?",
      selectedMeaning: "?",
      pronunciations: ["?"],
      meanings: ["?"],
      unknown: true,
      length: oldPart.kanjis.length - 1,
      currentIndex: oldPart.currentIndex,
      listOfValues: [],
    });
    setSecondPart({
      type: translationConstants.TYPE_UNKNOWN,
      kanjis: oldPart.kanjis.substr(oldPart.kanjis.length - 1),
      selectedPronunciation: "?",
      selectedMeaning: "?",
      pronunciations: ["?"],
      meanings: ["?"],
      unknown: true,
      length: 1,
      currentIndex: oldPart.currentIndex + oldPart.kanjis.length - 1,
      listOfValues: [],
    });
  }, [oldPart]);

  const addLetterToFirstPart = (event) => {
    event.preventDefault();
    let _firstPart = {
      ...firstPart,
      kanjis: firstPart.kanjis + secondPart.kanjis[0],
      length: firstPart.length + 1,
    };
    let _secondPart = {
      ...secondPart,
      kanjis: secondPart.kanjis.substr(1),
      length: secondPart.length - 1,
      currentIndex: secondPart.currentIndex + 1,
    };

    setFirstPart(_firstPart);
    setSecondPart(_secondPart);
  };

  const addLetterToSecondPart = (event) => {
    event.preventDefault();
    let _secondPart = {
      ...secondPart,
      kanjis: firstPart.kanjis[firstPart.length - 1] + secondPart.kanjis,
      length: secondPart.length + 1,
      currentIndex: secondPart.currentIndex - 1,
    };
    let _firstPart = {
      ...firstPart,
      kanjis: firstPart.kanjis.substr(0, firstPart.length - 1),
      length: firstPart.length - 1,
    };

    setFirstPart(_firstPart);
    setSecondPart(_secondPart);
  };

  const validateSplit = (event) => {
    event.preventDefault();
    props.onSplitPart(oldPart, firstPart, secondPart);
  };

  return (
    <Popup
      trigger={(open) => <button className="btn btn-primary">Split</button>}
      position="center center"
      modal
      closeOnDocumentClick
    >
      {(close) => (
        <div className="splitPopup">
          <div className="header">
            <button className="close" onClick={close}>
              &times;
            </button>
            <h2 className="splitPopUpTitle">Split part</h2>
          </div>

          <div className="content">
            <div>
              <div className="part">{firstPart.kanjis}</div>
            </div>
            <div>
              <div className="part">{secondPart.kanjis}</div>
            </div>
            <div className="partButtons">
              <button
                className="splitButtons"
                onClick={addLetterToFirstPart}
                disabled={secondPart.kanjis.length === 1}
              >
                Move character to the left
              </button>
              <button
                className="splitButtons"
                onClick={addLetterToSecondPart}
                disabled={firstPart.kanjis.length === 1}
              >
                Move character to the right
              </button>
            </div>
          </div>

          <div className="footer">
            <button
              className="btn btn-primary"
              onClick={(event) => {
                validateSplit(event);
                close();
              }}
            >
              Validate
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                console.log("modal closed ");
                close();
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
};

SplitPopup.propTypes = {
  onSplitPart: PropTypes.func.isRequired,
  oldPart: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      kanjis: PropTypes.string.isRequired,
      selectedPronunciation: PropTypes.string.isRequired,
      selectedMeaning: PropTypes.string.isRequired,
      pronunciations: PropTypes.array.isRequired,
      meanings: PropTypes.array.isRequired,
      unknown: PropTypes.bool.isRequired,
      length: PropTypes.number.isRequired,
      currentIndex: PropTypes.number.isRequired,
      listOfValues: PropTypes.array.isRequired,
    })
  ).isRequired,
};

export default SplitPopup;
