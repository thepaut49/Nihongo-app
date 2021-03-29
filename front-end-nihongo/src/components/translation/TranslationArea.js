import React from "react";
import CustomTextArea from "../common/CustomTextArea";
import PropTypes from "prop-types";
import QuickSearchPopUp from "./quickSearch/QuickSearchPopUp";

const TranslationArea = (props) => {
  const styleTranslationArea = {
    width: "100%",
    padding: "0.4em",
  };

  const buttonGroupStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1em",
  };

  const pronunciationStyle = {
    fontWeight: "bold",
    fontSize: "Large",
  };

  return (
    <>
      <div id="translationArea">
        <form style={styleTranslationArea}>
          <CustomTextArea
            id="textToTranslate"
            label="Sentence to Translate :"
            name="textToTranslate"
            cols={35}
            rows={5}
            value={props.sentence}
            onChange={props.onSentenceChange}
            onKanaClick={props.onKanaClick}
          />
          <div style={buttonGroupStyle}>
            <button
              className="btn btn-primary"
              onClick={props.onTranslateClick}
            >
              Translate
            </button>
            <button className="btn btn-primary" onClick={props.onClearClick}>
              Clear
            </button>
          </div>
        </form>
        <QuickSearchPopUp onQuickSearchClick={props.onQuickSearchClick} />
        <h4>Pronunciation :</h4>
        <p style={pronunciationStyle}>{props.pronunciation}</p>
      </div>
    </>
  );
};

TranslationArea.prototypes = {
  sentence: PropTypes.string.isRequired,
  pronunciation: PropTypes.string.isRequired,
  onSentenceChange: PropTypes.func.isRequired,
  onKanaClick: PropTypes.func.isRequired,
  onTranslateClick: PropTypes.func.isRequired,
  onClearClick: PropTypes.func.isRequired,
};

export default TranslationArea;
