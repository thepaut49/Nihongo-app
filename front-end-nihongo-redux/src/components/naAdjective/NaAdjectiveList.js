import React from "react";
import "./NaAdjectivesPage.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { isConnected } from "../../utils/userUtils";

const styleLink = {
  margin: "0.5em",
};

function NaAdjectiveList(props) {
  const orderPronunciation = (a, b) => {
    return a.pronunciationNumber - b.pronunciationNumber;
  };

  const orderMeaning = (a, b) => {
    return a.meaningNumber - b.meaningNumber;
  };

  const naAdjectives = props.naAdjectives;

  return (
    <table>
      <tbody>
        {naAdjectives.map((naAdjective) => {
          return (
            <tr key={naAdjective.id}>
              <td>
                <div className="grid-container-naAdjective">
                  <div className="naAdjective">
                    <Link
                      to={"/naAdjective/visualize/" + naAdjective.kanjis}
                      className="visualizationObjectLink"
                    >
                      {naAdjective.kanjis}
                    </Link>
                  </div>
                  <div className="pronunciation">
                    {naAdjective.pronunciations
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
                  <div className="meaning">
                    {naAdjective.meanings
                      .slice()
                      .sort(orderMeaning)
                      .map((mean, index) => {
                        return (
                          <span key={index} className="onemeaning">
                            {mean.meaning}
                          </span>
                        );
                      })}
                  </div>
                  {isConnected() && (
                    <div className="iAdjButtons">
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => {
                          props.deleteNaAdjective(naAdjective);
                        }}
                      >
                        Delete
                      </button>
                      <Link
                        to={"/naAdjective/modify/" + naAdjective.kanjis}
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

NaAdjectiveList.propTypes = {
  deleteNaAdjective: PropTypes.func.isRequired,
  naAdjectives: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      kanjis: PropTypes.string.isRequired,
      pronunciations: PropTypes.arrayOf.isRequired,
      meaning: PropTypes.arrayOf.isRequired,
      numberOfUse: PropTypes.number,
      version: PropTypes.number,
    })
  ).isRequired,
};

export default NaAdjectiveList;
