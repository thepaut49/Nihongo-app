import React from "react";
import "./CountersPage.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const styleLink = {
  margin: "0.5em",
};

function CounterList(props) {
  return (
    <table>
      <tbody>
        {props.counters.map((counter) => {
          return (
            <tr key={counter.id}>
              <td>
                <div className="grid-container-counter">
                  <Link
                    to={"/counter/visualize/" + counter.kanjis}
                    className="counter"
                  >
                    The {counter.kanjis} counter
                  </Link>
                  <div className="counterPronunciation">
                    <label>Pronunciations : </label>
                    <div>
                      {counter.pronunciations.map((pro, index) => {
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
                  <label>Summary : </label>
                  <div className="use">{counter.summary}</div>
                  <div className="buttonCounter">
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => {
                        props.deleteCounter(counter.id);
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
      pronunciation: PropTypes.arrayOf.isRequired,
      use: PropTypes.string.isRequired,
      numberOfUse: PropTypes.number,
      version: PropTypes.number,
    })
  ).isRequired,
};

export default CounterList;
