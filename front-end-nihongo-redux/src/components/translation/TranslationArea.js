import React from "react";
import CustomTextArea from "../common/CustomTextArea";
import PropTypes from "prop-types";
import QuickSearchPopUp from "./quickSearch/QuickSearchPopUp";

const TranslationArea = ({
  sentence,
  onSentenceChange,
  onKanaClick,
  onTranslateClick,
  onClearClick,
  onQuickSearchClick,
}) => {
  const styleTranslationArea = {
    width: "100%",
    padding: "0.4em",
  };

  const buttonGroupStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1em",
    marginTop: "1em",
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
            value={sentence}
            onChange={onSentenceChange}
            onKanaClick={onKanaClick}
          />
          <div style={buttonGroupStyle}>
            <button className="btn btn-primary" onClick={onTranslateClick}>
              Translate
            </button>
            <button className="btn btn-primary" onClick={onClearClick}>
              Clear
            </button>
          </div>
        </form>
        <QuickSearchPopUp onQuickSearchClick={onQuickSearchClick} />
      </div>
    </>
  );
};

TranslationArea.propTypes = {
  sentence: PropTypes.string.isRequired,
  onSentenceChange: PropTypes.func.isRequired,
  onKanaClick: PropTypes.func.isRequired,
  onTranslateClick: PropTypes.func.isRequired,
  onClearClick: PropTypes.func.isRequired,
  onQuickSearchClick: PropTypes.func.isRequired,
};

export default TranslationArea;
