import React from "react";
import "./KanjisPage.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { isConnected } from "../../utils/userUtils";

const styleLink = {
  margin: "0.5em",
};

function KanjiList({ kanjis, deleteKanji }) {
  const orderPronunciation = (a, b) => {
    return a.pronunciationNumber - b.pronunciationNumber;
  };

  const orderMeaning = (a, b) => {
    return a.meaningNumber - b.meaningNumber;
  };

  return (
    <table>
      <tbody>
        {kanjis.map((kanji) => {
          return (
            <tr key={kanji.id}>
              <td>
                <div className="grid-container-kanji">
                  <div className="kanji">
                    <Link
                      to={"/kanji/visualize/" + kanji.kanji}
                      className="visualizationObjectLink"
                    >
                      {kanji.kanji}
                    </Link>
                  </div>
                  <div className="pronunciation">
                    {kanji.pronunciations &&
                      kanji.pronunciations.length > 0 &&
                      kanji.pronunciations
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
                    {kanji.meanings &&
                      kanji.meanings.length > 0 &&
                      kanji.meanings.sort(orderMeaning).map((mean, index) => {
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
                  {isConnected() && (
                    <div>
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => {
                          deleteKanji(kanji);
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
