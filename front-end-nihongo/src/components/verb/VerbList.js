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
                    {verb.pronunciation.map((pronunciation, index) => {
                      return (
                        <span key={index} className="onemeaning">
                          {pronunciation}
                        </span>
                      );
                    })}
                  </div>
                  <div className="meaning">
                    {verb.meaning.map((mean, index) => {
                      return (
                        <span key={index} className="onemeaning">
                          {mean}
                        </span>
                      );
                    })}
                  </div>
                  <div className="groupe">
                    <label>Group :</label>
                    {verb.groupe}
                  </div>
                  <div className="delete">
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => {
                        props.deleteVerb(verb.id);
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
      pronunciation: PropTypes.string.isRequired,
      meaning: PropTypes.arrayOf.isRequired,
      groupe: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default VerbList;
