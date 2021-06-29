import React from "react";
import "./SentencesPage.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { isConnected } from "../../utils/userUtils";

const styleLink = {
  margin: "0.5em",
};

function SentenceList(props) {
  return (
    <table>
      <tbody>
        {props.sentences.map((sentence) => {
          return (
            <tr key={sentence.id}>
              <td>
                <div className="grid-container-sentence">
                  <div className="sentence">
                    <Link to={"/sentence/visualize/" + sentence.kanjis}>
                      {sentence.kanjis}
                    </Link>
                  </div>
                  <div>
                    <span className="onemeaning">{sentence.pronunciation}</span>
                  </div>
                  <div>
                    <span className="onemeaning">{sentence.meaning}</span>
                  </div>
                  <div>
                    <label>Topic :</label>
                    {sentence.topic}
                  </div>
                  {isConnected() && (
                    <div className="delete">
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => {
                          props.deleteSentence(sentence);
                        }}
                      >
                        Delete
                      </button>
                      <Link
                        to={"/sentence/modify/" + sentence.kanjis}
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

SentenceList.propTypes = {
  deleteSentence: PropTypes.func.isRequired,
  sentences: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      kanjis: PropTypes.string.isRequired,
      pronunciation: PropTypes.arrayOf.isRequired,
      meaning: PropTypes.arrayOf.isRequired,
      version: PropTypes.number,
    })
  ).isRequired,
};

export default SentenceList;
