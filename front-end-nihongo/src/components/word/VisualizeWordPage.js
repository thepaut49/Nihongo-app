import React, { useState, useEffect } from "react";
import Word from "./Word";
import KanjiList from "../common/listComponent/KanjiList";
import wordStore from "../../stores/wordStore";
import kanjiStore from "../../stores/kanjiStore";
import { loadKanjis } from "../../actions/kanjiActions";
import { loadWords } from "../../actions/wordActions";

const VisualizeWordPage = (props) => {
  const word = wordStore.getWordByKanjis(props.match.params.kanjis);

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
    searchKanjisLinkedToWord(word, kanjiStore.getKanjis())
  );

  const [kanjis, setKanjis] = useState(kanjiStore.getKanjis());
  const [words, setWords] = useState(wordStore.getWords());

  useEffect(() => {
    kanjiStore.addChangeListener(onChangeKanjis);
    wordStore.addChangeListener(onChangeWords);

    if (kanjiStore.getKanjis().length === 0) loadKanjis();
    if (wordStore.getWords().length === 0) loadWords();

    if (word) {
      if (kanjiStore.getKanjis().length > 0)
        setKanjisLinkedToWord(
          searchKanjisLinkedToWord(word, kanjiStore.getKanjis())
        );
    }

    return function () {
      kanjiStore.removeChangeListener(onChangeKanjis);
      wordStore.removeChangeListener(onChangeWords);
    };
  }, [word, kanjis.length, words.length]);

  function onChangeKanjis() {
    setKanjis(kanjiStore.getKanjis());
  }

  function onChangeWords() {
    setWords(wordStore.getWords());
  }

  return (
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
  );
};

export default VisualizeWordPage;
