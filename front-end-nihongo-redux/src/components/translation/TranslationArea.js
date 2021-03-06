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
  const buttonGroupStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1em",
    marginTop: "1em",
  };

  return (
    <>
      <div id="translationArea">
        <form>
          <CustomTextArea
            id="textToTranslate"
            label="Sentence to Translate"
            name="textToTranslate"
            cols={30}
            rows={5}
            value={sentence}
            onChange={onSentenceChange}
            onKanaClick={onKanaClick}
          />
          <QuickSearchPopUp onQuickSearchClick={onQuickSearchClick} />
          <div style={buttonGroupStyle}>
            <button
              className="translationAreaButtons"
              onClick={onTranslateClick}
            >
              Translate
            </button>
            <button className="translationAreaButtons" onClick={onClearClick}>
              Clear
            </button>
          </div>
        </form>
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
