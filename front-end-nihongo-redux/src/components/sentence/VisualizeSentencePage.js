import React, { useState, useEffect } from "react";
import Sentence from "./Sentence";
import KanjiList from "../common/listComponent/KanjiList";
import { loadKanjis } from "../../redux/actions/kanjiActions";
import { loadSentences } from "../../redux/actions/sentenceActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/spinner/Spinner";

const newSentence = {
  id: null,
  kanjis: "",
  pronunciation: "",
  meaning: "",
  topic: "",
  version: null,
};

const VisualizeSentencePage = ({
  sentences,
  loadSentences,
  kanjis,
  loadKanjis,
  ...props
}) => {
  const [sentence, setSentence] = useState({ ...props.sentence });

  // read all the list of object and see if the sentence is contained in the attribute sentences of object
  const searchKanjisLinkedToSentence = (sentence, list) => {
    let listOfVerbLinkToSentence = [];
    if (sentence && sentence.kanjis) {
      list.forEach((element) => {
        if (sentence.kanjis.includes(element.kanji)) {
          listOfVerbLinkToSentence.push(element);
        }
      });
    }
    return listOfVerbLinkToSentence;
  };

  const [kanjisLinkedToSentence, setKanjisLinkedToSentence] = useState(
    searchKanjisLinkedToSentence(sentence, kanjis)
  );

  useEffect(() => {
    if (sentences.length === 0) {
      loadSentences().catch((error) => {
        alert("Loading sentences failed" + error);
      });
    } else {
      setSentence({ ...props.sentence });
    }

    if (kanjis.length === 0) {
      loadKanjis()
        .then(
          setKanjisLinkedToSentence(
            searchKanjisLinkedToSentence(sentence, kanjis)
          )
        )
        .catch((error) => {
          alert("Loading kanjis failed" + error);
        });
    } else {
      setKanjisLinkedToSentence(searchKanjisLinkedToSentence(sentence, kanjis));
    }
  }, [props.sentence]);

  const allEntitiesLoaded = () => {
    if (sentences.length === 0) return false;
    if (kanjis.length === 0) return false;
    return true;
  };

  return (
    <>
      {!allEntitiesLoaded() ? (
        <Spinner />
      ) : (
        <>
          <h2>Sentence</h2>
          {sentence && (
            <div>
              <Sentence sentence={sentence} />

              {kanjisLinkedToSentence && kanjisLinkedToSentence.length > 0 && (
                <KanjiList kanjis={kanjisLinkedToSentence} />
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};

VisualizeSentencePage.propTypes = {
  sentence: PropTypes.object.isRequired,
  sentences: PropTypes.array.isRequired,
  loadSentences: PropTypes.func.isRequired,
  kanjis: PropTypes.array.isRequired,
  loadKanjis: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export function getSentenceByKanjis(sentences, kanjis) {
  return sentences.find((sentence) => sentence.kanjis === kanjis) || null;
}

function mapStateToProps(state, ownProps) {
  const kanjis = ownProps.match.params.kanjis;
  const sentence =
    kanjis && state.sentences.length > 0
      ? getSentenceByKanjis(state.sentences, kanjis)
      : newSentence;
  return {
    sentence,
    sentences: state.sentences,
    kanjis: state.kanjis,
  };
}

const mapDispatchToProps = {
  loadSentences,
  loadKanjis,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VisualizeSentencePage);
