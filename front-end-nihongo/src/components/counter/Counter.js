import React from "react";
import PropTypes from "prop-types";

function Counter(props) {
  const counter = props.counter;

  return (
    <div className="grid-container-counter">
      <h1>The {counter.kanjis} counter</h1>
      <div className="counterPronunciation">
        <label>Pronunciations : </label>
        <div>
          {counter.pronunciations.map((pro, index) => {
            return (
              <span key={index + 1000} className="onemeaning">
                {pro.pronunciation}
              </span>
            );
          })}
        </div>
      </div>

      <h2>Use</h2>
      <div className="use">{counter.use}</div>
      <label>Summary : </label>
      <div className="use">{counter.summary}</div>
    </div>
  );
}

Counter.propTypes = {
  counter: PropTypes.object.isRequired,
};

export default Counter;
