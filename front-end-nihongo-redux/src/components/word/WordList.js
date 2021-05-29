import React from "react";
import "./WordsPage.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const styleLink = {
  margin: "0.5em",
};

function WordList(props) {
  return (
    <table>
      <tbody>
        {props.words.map((word) => {
          return (
            <tr key={word.id}>
              <td>
                <div className="grid-container-word">
                  <div className="word">
                    <Link to={"/word/visualize/" + word.kanjis}>
                      {word.kanjis}
                    </Link>
                  </div>
                  <div className="pronunciationWord">
                    {word.pronunciations.map((pronunciation, index) => {
                      return (
                        <span key={index} className="onemeaning">
                          {pronunciation.pronunciation}
                        </span>
                      );
                    })}
                  </div>
                  <div className="meaningWord">
                    {word.meanings.map((mean, index) => {
                      return (
                        <span key={index} className="onemeaning">
                          {mean.meaning}
                        </span>
                      );
                    })}
                  </div>
                  <div className="wordButtons">
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => {
                        props.deleteWord(word);
                      }}
                    >
                      Delete
                    </button>
                    <Link
                      to={"/word/modify/" + word.kanjis}
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

WordList.propTypes = {
  deleteWord: PropTypes.func.isRequired,
  words: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      kanjis: PropTypes.string.isRequired,
      pronunciation: PropTypes.arrayOf.isRequired,
      meanings: PropTypes.arrayOf.isRequired,
      numberOfUse: PropTypes.number,
      version: PropTypes.number,
    })
  ).isRequired,
};

export default WordList;
