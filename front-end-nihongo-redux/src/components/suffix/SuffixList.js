import React from "react";
import "./SuffixsPage.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { isConnected } from "../../utils/userUtils";

const styleLink = {
  margin: "0.5em",
};

function SuffixList(props) {
  const orderPronunciation = (a, b) => {
    return a.pronunciationNumber - b.pronunciationNumber;
  };

  const suffixs = props.suffixs;
  return (
    <table>
      <tbody>
        {suffixs.map((suffix) => {
          return (
            <tr key={suffix.id}>
              <td>
                <div className="grid-container-suffix">
                  <Link
                    to={"/suffix/visualize/" + suffix.kanjis}
                    className="suffix visualizationObjectLink"
                  >
                    The {suffix.kanjis} suffix
                  </Link>
                  <div>
                    <h2>Pronunciations</h2>
                    <div>
                      {suffix.pronunciations
                        .slice()
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
                  <div className="use">{suffix.use}</div>
                  <h2>Summary</h2>
                  <div>{suffix.summary}</div>
                  {isConnected() && (
                    <div className="buttonSuffix">
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => props.deleteSuffix(suffix)}
                      >
                        Delete
                      </button>
                      <Link
                        to={"/suffix/modify/" + suffix.kanjis}
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

SuffixList.propTypes = {
  deleteSuffix: PropTypes.func.isRequired,
  suffixs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      kanjis: PropTypes.string.isRequired,
      pronunciations: PropTypes.arrayOf.isRequired,
      use: PropTypes.string.isRequired,
      summary: PropTypes.string.isRequired,
      version: PropTypes.number,
    })
  ).isRequired,
};

export default SuffixList;
