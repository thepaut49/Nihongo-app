import React from "react";
import PropTypes from "prop-types";

function Sentence(props) {
  const sentence = props.sentence;

  return (
    <div className="grid-container-sentence">
      <div className="sentence">
        <h2>{sentence.kanjis}</h2>
      </div>
      <div>
        {sentence.pronunciation.map((pronunciation, index) => {
          return (
            <span key={index} className="onemeaning">
              {pronunciation}
            </span>
          );
        })}
      </div>
      <div>
        {sentence.meaning.map((mean, index) => {
          return (
            <span key={index} className="onemeaning">
              {mean}
            </span>
          );
        })}
      </div>
      <div>
        <label>Topic :</label>
        {sentence.topic}
      </div>
    </div>
  );
}

Sentence.propTypes = {
  sentence: PropTypes.object.isRequired,
};

export default Sentence;
