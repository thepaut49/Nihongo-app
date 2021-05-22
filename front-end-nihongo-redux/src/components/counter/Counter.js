import React from "react";
import PropTypes from "prop-types";

function Counter(props) {
  const counter = props.counter;

  return (
    <div className="grid-container-counter">
      <h1>The {counter.kanjis} counter</h1>
      <div>
        <h2>Pronunciations</h2>
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
      <h2>Summary</h2>
      <div className="use">{counter.summary}</div>
    </div>
  );
}

Counter.propTypes = {
  counter: PropTypes.object.isRequired,
};

export default Counter;
