import React from "react";
import "./SentencesPage.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

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
                    <Link to={"/sentence/" + sentence.kanjis}>
                      {sentence.kanjis}
                    </Link>
                  </div>
                  <div>
                    {sentence.pronunciation.map((pronunciation, index) => {
                      return (
                        <span key={index} className="onemeaning">
                          {pronunciation}
                        </span>
                      );
                    })}
                  </div>
                  <div>
                    {sentence.meaning.map((mean, index) => {
                      return (
                        <span key={index} className="onemeaning">
                          {mean}
                        </span>
                      );
                    })}
                  </div>
                  <div>
                    <label>Topic :</label>
                    {sentence.topic}
                  </div>
                  <div className="delete">
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => {
                        props.deleteSentence(sentence.id);
                      }}
                    >
                      Delete
                    </button>
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
