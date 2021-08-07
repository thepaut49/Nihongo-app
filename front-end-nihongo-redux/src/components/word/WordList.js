import React from "react";
import "./WordsPage.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { isConnected } from "../../utils/userUtils";

const styleLink = {
  margin: "0.5em",
};

function WordList(props) {
  const orderPronunciation = (a, b) => {
    return a.pronunciationNumber - b.pronunciationNumber;
  };

  const orderMeaning = (a, b) => {
    return a.meaningNumber - b.meaningNumber;
  };

  const words = props.words;

  return (
    <table>
      <tbody>
        {words.map((word) => {
          return (
            <tr key={word.id}>
              <td>
                <div className="grid-container-word">
                  <div className="word">
                    <Link
                      to={"/word/visualize/" + word.kanjis}
                      className="visualizationObjectLink"
                    >
                      {word.kanjis}
                    </Link>
                  </div>
                  <div className="pronunciationWord">
                    {word.pronunciations
                      .slice()
                      .sort(orderPronunciation)
                      .map((pronunciation, index) => {
                        return (
                          <span key={index} className="onemeaning">
                            {pronunciation.pronunciation}
                          </span>
                        );
                      })}
                  </div>
                  <div className="meaningWord">
                    {word.meanings
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
