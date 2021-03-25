import React, { useState, useEffect } from "react";
import Sentence from "./Sentence";
import KanjiList from "../common/listComponent/KanjiList";
import sentenceStore from "../../stores/sentenceStore";
import kanjiStore from "../../stores/kanjiStore";
import { loadKanjis } from "../../actions/kanjiActions";
import { loadSentences } from "../../actions/sentenceActions";

const VisualizeSentencePage = (props) => {
  const sentence = sentenceStore.getSentenceByKanjis(props.match.params.kanjis);

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
    searchKanjisLinkedToSentence(sentence, kanjiStore.getKanjis())
  );

  const [kanjis, setKanjis] = useState(kanjiStore.getKanjis());
  const [sentences, setSentences] = useState(sentenceStore.getSentences());

  useEffect(() => {
    kanjiStore.addChangeListener(onChangeKanjis);
    sentenceStore.addChangeListener(onChangeSentences);

    if (kanjiStore.getKanjis().length === 0) loadKanjis();
    if (sentenceStore.getSentences().length === 0) loadSentences();

    if (sentence) {
      if (kanjiStore.getKanjis().length > 0)
        setKanjisLinkedToSentence(
          searchKanjisLinkedToSentence(Sentence, kanjiStore.getKanjis())
        );
    }

    return function () {
      kanjiStore.removeChangeListener(onChangeKanjis);
      sentenceStore.removeChangeListener(onChangeSentences);
    };
  }, [sentence, kanjis.length, sentences.length]);

  function onChangeKanjis() {
    setKanjis(kanjiStore.getKanjis());
  }

  function onChangeSentences() {
    setSentences(sentenceStore.getSentences());
  }

  return (
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
  );
};

export default VisualizeSentencePage;
