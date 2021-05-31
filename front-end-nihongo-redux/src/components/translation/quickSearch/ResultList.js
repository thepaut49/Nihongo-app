import React from "react";
import PropTypes from "prop-types";
import translationConstants from "../../common/translationConstants";

const objectStyle = {
  display: "grid",
  grid: "1fr 1fr / 1fr 1fr 1fr",
  borderRadius: "10px",
  backgroundColor: "rgba(38, 113, 22, 0.48)",
  gap: "1em",
  margin: "0.5em",
  padding: "0.5em",
};

const kanjisStyle = {
  gridRowStart: "span 2",
};

const resultButtonStyle = {
  fontWeight: "bold",
  fontSize: "xxx-large",
};

const pronunciationStyle = {
  gridColumnStart: "span 2",
};

const ResultList = (props) => {
  /*************/
  /* variables */
  /*************/
  const typeSelectSearch = props.typeSelectSearch;

  /*************/
  /* functions */
  /*************/
  const handleClick = (event, result) => {
    event.preventDefault();
    props.onClick(event, result);
    props.close();
  };

  /*************/
  /*   render  */
  /*************/
  return (
    <div>
      {props.results.map((result, index) => {
        return (
          <div style={objectStyle} key={index}>
            <div style={kanjisStyle}>
              <button
                onClick={(event) => handleClick(event, result)}
                className="btn btn-success"
                style={resultButtonStyle}
              >
                {typeSelectSearch === translationConstants.TYPE_KANJI
                  ? result.kanji
                  : result.typeWord === translationConstants.TYPE_VERB
                  ? result.neutralForm
                  : result.kanjis}
              </button>
            </div>
            <div style={pronunciationStyle}>
              {result.pronunciation.map((pro, index) => {
                return (
                  <span key={index} className="onemeaning">
                    {pro}
                  </span>
                );
              })}
            </div>
            <div style={pronunciationStyle}>
              {result.meaning.map((mean, index) => {
                return (
                  <span key={index} className="onemeaning">
                    {mean.meaning}
                  </span>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

ResultList.propTypes = {
  results: PropTypes.arrayOf(Object).isRequired,
  typeSelectSearch: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ResultList;
