import React, { useState, useEffect } from "react";
import Word from "./Word";
import KanjiList from "../common/listComponent/KanjiList";
import { loadKanjis } from "../../redux/actions/kanjiActions";
import { loadWords } from "../../redux/actions/wordActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/spinner/Spinner";

const newWord = {
  id: null,
  kanjis: "",
  pronunciations: [
    {
      id: null,
      pronunciationNumber: 0,
      pronunciation: "",
      version: null,
    },
  ],
  meanings: [
    {
      id: null,
      meaningNumber: 0,
      meaning: "",
      version: null,
    },
  ],
  numberOfUse: null,
  version: null,
};

const VisualizeWordPage = ({
  words,
  loadWords,
  kanjis,
  loadKanjis,
  ...props
}) => {
  const [word, setWord] = useState({ ...props.word });

  // read all the list of object and see if the word is contained in the attribute words of object
  const searchKanjisLinkedToWord = (word, list) => {
    let listOfVerbLinkToWord = [];
    if (word && word.kanjis) {
      list.forEach((element) => {
        if (word.kanjis.includes(element.kanji)) {
          listOfVerbLinkToWord.push(element);
        }
      });
    }
    return listOfVerbLinkToWord;
  };

  const [kanjisLinkedToWord, setKanjisLinkedToWord] = useState(
    searchKanjisLinkedToWord(word, kanjis)
  );

  useEffect(() => {
    if (words.length === 0) {
      loadWords().catch((error) => {
        alert("Loading words failed" + error);
      });
    } else {
      setWord({ ...props.word });
    }

    if (kanjis.length === 0) {
      loadKanjis()
        .then(setKanjisLinkedToWord(searchKanjisLinkedToWord(word, kanjis)))
        .catch((error) => {
          alert("Loading kanjis failed" + error);
        });
    } else {
      setKanjisLinkedToWord(searchKanjisLinkedToWord(word, kanjis));
    }
  }, [props.word, kanjis.length, words.length]);

  const allEntitiesLoaded = () => {
    if (words.length === 0) return false;
    if (kanjis.length === 0) return false;
    return true;
  };

  return (
    <>
      {!allEntitiesLoaded() ? (
        <Spinner />
      ) : (
        <>
          <h2>Word</h2>
          {word && (
            <div>
              <Word word={word} />

              {kanjisLinkedToWord && kanjisLinkedToWord.length > 0 && (
                <KanjiList kanjis={kanjisLinkedToWord} />
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};

VisualizeWordPage.propTypes = {
  word: PropTypes.object.isRequired,
  words: PropTypes.array.isRequired,
  loadWords: PropTypes.func.isRequired,
  kanjis: PropTypes.array.isRequired,
  loadKanjis: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export function getWordByKanjis(words, kanjis) {
  return words.find((word) => word.kanjis === kanjis) || null;
}

function mapStateToProps(state, ownProps) {
  const kanjis = ownProps.match.params.kanjis;
  const word =
    kanjis && state.words.length > 0
      ? getWordByKanjis(state.words, kanjis)
      : newWord;
  return {
    word,
    words: state.words,
    kanjis: state.kanjis,
  };
}

const mapDispatchToProps = {
  loadWords,
  loadKanjis,
};

export default connect(mapStateToProps, mapDispatchToProps)(VisualizeWordPage);
