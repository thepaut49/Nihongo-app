import React from "react";
import "./NamesPage.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const styleLink = {
  margin: "0.5em",
};

function NameList(props) {
  return (
    <table>
      <tbody>
        {props.names.map((name) => {
          return (
            <tr key={name.id}>
              <td>
                <div className="grid-container-name">
                  <div className="name">
                    <Link to={"/name/visualize/" + name.kanjis}>
                      {name.kanjis}
                    </Link>
                  </div>
                  <div className="pronunciation">
                    {name.pronunciations.map((pronunciation, index) => {
                      return (
                        <span key={index} className="onemeaning">
                          {pronunciation.pronunciation}
                        </span>
                      );
                    })}
                  </div>
                  <div className="meaning">
                    {name.meanings.map((mean, index) => {
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
                        props.deleteName(name.id);
                      }}
                    >
                      Delete
                    </button>
                    <Link
                      to={"/name/modify/" + name.kanjis}
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

NameList.propTypes = {
  deleteName: PropTypes.func.isRequired,
  names: PropTypes.arrayOf(
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

export default NameList;
