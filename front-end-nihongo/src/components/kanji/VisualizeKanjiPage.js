import React, { useState, useEffect } from "react";
import Kanji from "./Kanji";
import kanjiStore from "../../stores/kanjiStore";
import VerbList from "../common/listComponent/VerbList";
import WordList from "../common/listComponent/WordList";
import NameList from "../common/listComponent/NameList";
import IAdjectiveList from "../common/listComponent/IAdjectiveList";
import NaAdjectiveList from "../common/listComponent/NaAdjectiveList";
import verbStore from "../../stores/verbStore";
import naAdjectiveStore from "../../stores/naAdjectiveStore";
import iAdjectiveStore from "../../stores/iAdjectiveStore";
import nameStore from "../../stores/nameStore";
import wordStore from "../../stores/wordStore";
import { loadKanjis } from "../../actions/kanjiActions";
import { loadVerbs } from "../../actions/verbActions";
import { loadNaAdjectives } from "../../actions/naAdjectiveActions";
import { loadIAdjectives } from "../../actions/iAdjectiveActions";
import { loadNames } from "../../actions/nameActions";
import { loadWords } from "../../actions/wordActions";

const VisualizeKanjiPage = (props) => {
  const kanji = kanjiStore.getKanjiByCharacter(props.match.params.kanji);

  // read all the list of object and see if the kanji is contained in the attribute kanjis of object
  const objectsLinkedToKanji = (kanji, list) => {
    let listOfVerbLinkToKanji = [];
    list.forEach((element) => {
      if (element.kanjis.includes(kanji.kanji)) {
        listOfVerbLinkToKanji.push(element);
      }
    });
    return listOfVerbLinkToKanji;
  };

  const [verbsLinkedToKanji, setVerbsLinkedToKanji] = useState(
    objectsLinkedToKanji(kanji, verbStore.getVerbs())
  );
  const [naAdjectivesLinkedToKanji, setNaAdjectivesLinkedToKanji] = useState(
    objectsLinkedToKanji(kanji, naAdjectiveStore.getNaAdjectives())
  );
  const [iAdjectivesLinkedToKanji, setIAdjectivesLinkedToKanji] = useState(
    objectsLinkedToKanji(kanji, iAdjectiveStore.getIAdjectives())
  );
  const [namesLinkedToKanji, setNamesLinkedToKanji] = useState(
    objectsLinkedToKanji(kanji, iAdjectiveStore.getIAdjectives())
  );
  const [wordsLinkedToKanji, setWordsLinkedToKanji] = useState(
    objectsLinkedToKanji(kanji, iAdjectiveStore.getIAdjectives())
  );

  const [kanjis, setKanjis] = useState(kanjiStore.getKanjis());
  const [verbs, setVerbs] = useState(verbStore.getVerbs());
  const [naAdjectives, setNaAdjectives] = useState(
    naAdjectiveStore.getNaAdjectives()
  );
  const [iAdjectives, setIAdjectives] = useState(
    iAdjectiveStore.getIAdjectives()
  );
  const [names, setNames] = useState(nameStore.getNames());
  const [words, setWords] = useState(wordStore.getWords());

  useEffect(() => {
    kanjiStore.addChangeListener(onChangeKanjis);
    verbStore.addChangeListener(onChangeVerbs);
    naAdjectiveStore.addChangeListener(onChangeNaAdjectives);
    iAdjectiveStore.addChangeListener(onChangeIAdjectives);
    nameStore.addChangeListener(onChangeNames);
    wordStore.addChangeListener(onChangeWords);

    if (kanjiStore.getKanjis().length === 0) loadKanjis();
    if (verbStore.getVerbs().length === 0) loadVerbs();
    if (naAdjectiveStore.getNaAdjectives().length === 0) loadNaAdjectives();
    if (iAdjectiveStore.getIAdjectives().length === 0) loadIAdjectives();
    if (nameStore.getNames().length === 0) loadNames();
    if (wordStore.getWords().length === 0) loadWords();

    if (kanji) {
      if (verbStore.getVerbs() > 0)
        setVerbsLinkedToKanji(
          objectsLinkedToKanji(kanji, verbStore.getVerbs())
        );

      if (naAdjectiveStore.getNaAdjectives().length > 0)
        setNaAdjectivesLinkedToKanji(
          objectsLinkedToKanji(kanji, naAdjectiveStore.getNaAdjectives())
        );

      if (iAdjectiveStore.getIAdjectives().length > 0)
        setIAdjectivesLinkedToKanji(
          objectsLinkedToKanji(kanji, iAdjectiveStore.getIAdjectives())
        );

      if (nameStore.getNames().length > 0)
        setNamesLinkedToKanji(
          objectsLinkedToKanji(kanji, nameStore.getNames())
        );

      if (wordStore.getWords().length > 0)
        setWordsLinkedToKanji(
          objectsLinkedToKanji(kanji, wordStore.getWords())
        );

      return function () {
        kanjiStore.removeChangeListener(onChangeKanjis);
        verbStore.removeChangeListener(onChangeVerbs);
        naAdjectiveStore.removeChangeListener(onChangeNaAdjectives);
        iAdjectiveStore.removeChangeListener(onChangeIAdjectives);
        nameStore.removeChangeListener(onChangeNames);
        wordStore.removeChangeListener(onChangeWords);
      };
    }
  }, [
    kanji,
    kanjis.length,
    iAdjectives.length,
    naAdjectives.length,
    names.length,
    verbs.length,
    words.length,
  ]);

  function onChangeKanjis() {
    setKanjis(kanjiStore.getKanjis());
  }

  function onChangeVerbs() {
    setVerbs(verbStore.getVerbs());
  }

  function onChangeNaAdjectives() {
    setNaAdjectives(naAdjectiveStore.getNaAdjectives());
  }

  function onChangeIAdjectives() {
    setIAdjectives(iAdjectiveStore.getIAdjectives());
  }

  function onChangeNames() {
    setNames(nameStore.getNames());
  }

  function onChangeWords() {
    setWords(wordStore.getWords());
  }

  return (
    <>
      <h2>Kanji</h2>
      {kanji && (
        <div>
          <Kanji kanji={kanji} />

          {verbsLinkedToKanji && verbsLinkedToKanji.length > 0 && (
            <VerbList verbs={verbsLinkedToKanji} />
          )}

          {iAdjectivesLinkedToKanji && iAdjectivesLinkedToKanji.length > 0 && (
            <IAdjectiveList iAdjectives={iAdjectivesLinkedToKanji} />
          )}

          {naAdjectivesLinkedToKanji &&
            naAdjectivesLinkedToKanji.length > 0 && (
              <NaAdjectiveList naAdjectives={naAdjectivesLinkedToKanji} />
            )}

          {namesLinkedToKanji && namesLinkedToKanji.length > 0 && (
            <NameList names={namesLinkedToKanji} />
          )}

          {wordsLinkedToKanji && wordsLinkedToKanji.length > 0 && (
            <WordList words={wordsLinkedToKanji} />
          )}
        </div>
      )}
    </>
  );
};

export default VisualizeKanjiPage;
