import React from "react";
import PropTypes from "prop-types";
import translationConstants from "../../common/translationConstants";

const objectStyle = {
  display: "grid",
  grid: "1fr 1fr / 1fr 1fr 1fr",
  borderRadius: "10px",
  backgroundColor: "var(--fourth-bg-color)",
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

  const hasResult = props.results && props.results.length > 0;

  const orderPronunciation = (a, b) => {
    return a.pronunciationNumber - b.pronunciationNumber;
  };

  const orderMeaning = (a, b) => {
    return a.meaningNumber - b.meaningNumber;
  };

  /*************/
  /*   render  */
  /*************/
  return (
    <div>
      {hasResult &&
        props.results.map((result, index) => {
          return (
            <div style={objectStyle} key={index + 3000}>
              <div style={kanjisStyle}>
                <button
                  onClick={(event) => handleClick(event, result)}
                  className="resultButtons"
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
                {result.pronunciations
                  .slice()
                  .sort(orderPronunciation)
                  .map((pro, index) => {
                    return (
                      <span key={index + 5000} className="onemeaning">
                        {pro.pronunciation}
                      </span>
                    );
                  })}
              </div>
              <div style={pronunciationStyle}>
                {result.meanings
                  .slice()
                  .sort(orderMeaning)
                  .map((mean, index) => {
                    return (
                      <span key={index + 10000} className="onemeaning">
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
