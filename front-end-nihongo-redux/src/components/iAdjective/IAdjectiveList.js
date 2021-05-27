import React from "react";
import "./IAdjectivesPage.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const styleLink = {
  margin: "0.5em",
};

function IAdjectiveList(props) {
  return (
    <table>
      <tbody>
        {props.iAdjectives.map((iAdjective) => {
          return (
            <tr key={iAdjective.id}>
              <td>
                <div className="grid-container-iAdjective">
                  <div className="iAdjective">
                    <Link to={"/iAdjective/visualize/" + iAdjective.kanjis}>
                      {iAdjective.kanjis}
                    </Link>
                  </div>
                  <div className="pronunciation">
                    {iAdjective.pronunciations.map((pro, index) => {
                      return (
                        <span key={index} className="onemeaning">
                          {pro.pronunciation}
                        </span>
                      );
                    })}
                  </div>
                  <div className="meaning">
                    {iAdjective.meanings.map((mean, index) => {
                      return (
                        <span key={index} className="onemeaning">
                          {mean.meaning}
                        </span>
                      );
                    })}
                  </div>
                  <div>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => {
                        props.deleteIAdjective(iAdjective.id);
                      }}
                    >
                      Delete
                    </button>
                    <Link
                      to={"/iAdjective/modify/" + iAdjective.kanjis}
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

IAdjectiveList.propTypes = {
  deleteIAdjective: PropTypes.func.isRequired,
  iAdjectives: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      kanjis: PropTypes.string.isRequired,
      pronunciations: PropTypes.arrayOf.isRequired,
      meanings: PropTypes.arrayOf.isRequired,
      numberOfUse: PropTypes.number,
      version: PropTypes.number,
    })
  ).isRequired,
};

export default IAdjectiveList;
