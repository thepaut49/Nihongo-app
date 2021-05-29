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
        <span className="onemeaning">{sentence.pronunciation}</span>
      </div>
      <div>
        <span className="onemeaning">{sentence.meaning}</span>
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
