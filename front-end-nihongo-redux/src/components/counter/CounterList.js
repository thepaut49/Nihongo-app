import React from "react";
import "./CountersPage.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { isConnected } from "../../utils/userUtils";

const styleLink = {
  margin: "0.5em",
};

function CounterList(props) {
  const orderPronunciation = (a, b) => {
    return a.pronunciationNumber - b.pronunciationNumber;
  };

  const counters = props.counters;

  return (
    <table>
      <tbody>
        {counters.map((counter) => {
          return (
            <tr key={counter.id}>
              <td>
                <div className="grid-container-counter">
                  <Link
                    to={"/counter/visualize/" + counter.kanjis}
                    className="counter visualizationObjectLink"
                  >
                    The {counter.kanjis} counter
                  </Link>
                  <div>
                    <h2>Pronunciations</h2>
                    <div>
                      {counter.pronunciations
                        .sort(orderPronunciation)
                        .map((pro, index) => {
                          return (
                            <span key={index} className="onemeaning">
                              {pro.pronunciation}
                            </span>
                          );
                        })}
                    </div>
                  </div>

                  <h2>Use</h2>
                  <div className="use">{counter.use}</div>
                  <div>
                    <h2>Summary</h2>
                    {counter.summary}
                  </div>
                  {isConnected() && (
                    <div className="buttonCounter">
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => {
                          props.deleteCounter(counter);
                        }}
                      >
                        Delete
                      </button>
                      <Link
                        to={"/counter/modify/" + counter.kanjis}
                        style={styleLink}
                        className="btn btn-primary"
                      >
                        Modify
                      </Link>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

CounterList.propTypes = {
  deleteCounter: PropTypes.func.isRequired,
  counters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      kanjis: PropTypes.string.isRequired,
      pronunciations: PropTypes.arrayOf.isRequired,
      use: PropTypes.string.isRequired,
      numberOfUse: PropTypes.number,
      version: PropTypes.number,
    })
  ).isRequired,
};

export default CounterList;
