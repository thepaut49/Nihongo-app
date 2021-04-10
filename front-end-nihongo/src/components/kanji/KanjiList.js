import React from "react";
import "./KanjisPage.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const styleLink = {
  margin: "0.5em",
};

function KanjiList(props) {
  return (
    <table>
      <tbody>
        {props.kanjis.map((kanji) => {
          return (
            <tr key={kanji.id}>
              <td>
                <div className="grid-container">
                  <div className="kanji">
                    <Link to={"/kanji/visualize/" + kanji.kanji}>
                      {kanji.kanji}
                    </Link>
                  </div>
                  <div className="pronunciation">
                    {kanji.pronunciations &&
                      kanji.pronunciations.length > 0 &&
                      kanji.pronunciations.map((pro, index) => {
                        return (
                          <span key={index} className="onemeaning">
                            {pro.pronunciation}
                          </span>
                        );
                      })}
                  </div>
                  <div className="meaning">
                    {kanji.meanings &&
                      kanji.meanings.length > 0 &&
                      kanji.meanings.map((mean, index) => {
                        return (
                          <span key={index} className="onemeaning">
                            {mean.meaning}
                          </span>
                        );
                      })}
                  </div>
                  <div className="strokes">
                    <span>
                      <label>Strokes : </label>
                      {kanji.strokeNumber}
                    </span>
                    <span>
                      <label>Radicals : </label>
                      {kanji.radicals}
                    </span>
                  </div>
                  <div>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => {
                        props.deleteKanji(kanji.id);
                      }}
                    >
                      Delete
                    </button>
                    <Link
                      to={"/kanji/modify/" + kanji.kanji}
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

KanjiList.propTypes = {
  deleteKanji: PropTypes.func.isRequired,
  kanjis: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      kanji: PropTypes.string.isRequired,
      pronunciations: PropTypes.arrayOf.isRequired,
      meanings: PropTypes.arrayOf.isRequired,
      strokeNumber: PropTypes.number.isRequired,
      radicals: PropTypes.string,
      version: PropTypes.number.isRequired,
      numberOfUse: PropTypes.number,
    })
  ).isRequired,
};

export default KanjiList;
