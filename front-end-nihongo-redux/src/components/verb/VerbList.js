import React from "react";
import "./VerbsPage.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const styleLink = {
  margin: "0.5em",
};

function VerbList(props) {
  return (
    <table>
      <tbody>
        {props.verbs.map((verb) => {
          return (
            <tr key={verb.id}>
              <td>
                <div className="grid-container-verb">
                  <div className="verb">
                    <Link to={"/verb/visualize/" + verb.neutralForm}>
                      {verb.neutralForm}
                    </Link>
                  </div>
                  <div className="pronunciation">
                    {verb.pronunciations.map((pronunciation, index) => {
                      return (
                        <span key={index} className="onemeaning">
                          {pronunciation.pronunciation}
                        </span>
                      );
                    })}
                  </div>
                  <div className="meaning">
                    {verb.meanings.map((mean, index) => {
                      return (
                        <span key={index} className="onemeaning">
                          {mean.meaning}
                        </span>
                      );
                    })}
                  </div>
                  <div className="groupe">
                    <label>Group :</label>
                    {verb.groupe}
                  </div>
                  <div>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => {
                        props.deleteVerb(verb);
                      }}
                    >
                      Delete
                    </button>
                    <Link
                      to={"/verb/modify/" + verb.neutralForm}
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

VerbList.propTypes = {
  deleteVerb: PropTypes.func.isRequired,
  verbs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      neutralForm: PropTypes.string.isRequired,
      pronunciations: PropTypes.arrayOf.isRequired,
      meanings: PropTypes.arrayOf.isRequired,
      groupe: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default VerbList;
