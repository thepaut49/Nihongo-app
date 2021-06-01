import React, { useState, useEffect } from "react";
import Kanji from "./Kanji";
import VerbList from "../common/listComponent/VerbList";
import WordList from "../common/listComponent/WordList";
import NameList from "../common/listComponent/NameList";
import IAdjectiveList from "../common/listComponent/IAdjectiveList";
import NaAdjectiveList from "../common/listComponent/NaAdjectiveList";
import { loadKanjis } from "../../redux/actions/kanjiActions";
import { loadVerbs } from "../../redux/actions/verbActions";
import { loadNaAdjectives } from "../../redux/actions/naAdjectiveActions";
import { loadIAdjectives } from "../../redux/actions/iAdjectiveActions";
import { loadNames } from "../../redux/actions/nameActions";
import { loadWords } from "../../redux/actions/wordActions";
import translationConstants from "../common/translationConstants";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/spinner/Spinner";

const newKanji = {
  id: null,
  kanji: "",
  pronunciations: [
    {
      id: null,
      pronunciationNumber: 0,
      pronunciation: "",
      version: 0,
    },
  ],
  meanings: [
    {
      id: null,
      meaningNumber: 0,
      meaning: "",
      version: 0,
    },
  ],
  radicals: "",
  strokeNumber: 0,
  numberOfUse: null,
  version: null,
};

const VisualizeKanjiPage = ({
  kanjis,
  loadKanjis,
  iAdjectives,
  loadIAdjectives,
  naAdjectives,
  loadNaAdjectives,
  names,
  loadNames,
  verbs,
  loadVerbs,
  words,
  loadWords,
  ...props
}) => {
  const [kanji, setKanji] = useState({ ...props.kanji });
  // read all the list of object and see if the kanji is contained in the attribute kanjis of object
  const objectsLinkedToKanji = (kanji, list, typeWord) => {
    let listOfObjectLinkToKanji = [];
    list.forEach((element) => {
      if (typeWord === translationConstants.TYPE_VERB) {
        if (element.neutralForm.includes(kanji.kanji)) {
          listOfObjectLinkToKanji.push(element);
        }
      } else {
        if (element.kanjis.includes(kanji.kanji)) {
          listOfObjectLinkToKanji.push(element);
        }
      }
    });
    return listOfObjectLinkToKanji;
  };

  const [verbsLinkedToKanji, setVerbsLinkedToKanji] = useState(
    objectsLinkedToKanji(
      { ...props.kanji },
      verbs,
      translationConstants.TYPE_VERB
    )
  );
  const [naAdjectivesLinkedToKanji, setNaAdjectivesLinkedToKanji] = useState(
    objectsLinkedToKanji(
      { ...props.kanji },
      naAdjectives,
      translationConstants.TYPE_NA_ADJECTIVE
    )
  );
  const [iAdjectivesLinkedToKanji, setIAdjectivesLinkedToKanji] = useState(
    objectsLinkedToKanji(
      { ...props.kanji },
      iAdjectives,
      translationConstants.TYPE_I_ADJECTIVE
    )
  );
  const [namesLinkedToKanji, setNamesLinkedToKanji] = useState(
    objectsLinkedToKanji(
      { ...props.kanji },
      names,
      translationConstants.TYPE_NAME
    )
  );
  const [wordsLinkedToKanji, setWordsLinkedToKanji] = useState(
    objectsLinkedToKanji(
      { ...props.kanji },
      words,
      translationConstants.TYPE_WORD
    )
  );

  useEffect(() => {
    if (kanjis.length === 0) {
      loadKanjis().catch((error) => {
        alert("Loading kanjis failed" + error);
      });
    } else {
      setKanji({ ...props.kanji });
    }
    if (verbs.length === 0) {
      loadVerbs();
    }
    if (naAdjectives.length === 0) loadNaAdjectives();
    if (iAdjectives.length === 0) loadIAdjectives();
    if (names.length === 0) loadNames();
    if (words.length === 0) loadWords();

    if (verbs.length > 0)
      setVerbsLinkedToKanji(
        objectsLinkedToKanji(
          { ...props.kanji },
          verbs,
          translationConstants.TYPE_VERB
        )
      );

    if (naAdjectives.length > 0)
      setNaAdjectivesLinkedToKanji(
        objectsLinkedToKanji(
          { ...props.kanji },
          naAdjectives,
          translationConstants.TYPE_NA_ADJECTIVE
        )
      );

    if (iAdjectives.length > 0)
      setIAdjectivesLinkedToKanji(
        objectsLinkedToKanji(
          { ...props.kanji },
          iAdjectives,
          translationConstants.TYPE_I_ADJECTIVE
        )
      );

    if (names.length > 0)
      setNamesLinkedToKanji(
        objectsLinkedToKanji(
          { ...props.kanji },
          names,
          translationConstants.TYPE_NAME
        )
      );

    if (words.length > 0)
      setWordsLinkedToKanji(
        objectsLinkedToKanji(
          { ...props.kanji },
          words,
          translationConstants.TYPE_WORD
        )
      );
  }, [props.kanji]);

  return (
    <>
      {kanjis.length === 0 ? (
        <Spinner />
      ) : (
        <>
          <h2>Kanji</h2>
          {kanji && (
            <div>
              <Kanji kanji={kanji} />

              {verbsLinkedToKanji && verbsLinkedToKanji.length > 0 && (
                <VerbList verbs={verbsLinkedToKanji} />
              )}

              {iAdjectivesLinkedToKanji &&
                iAdjectivesLinkedToKanji.length > 0 && (
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
      )}
    </>
  );
};

VisualizeKanjiPage.propTypes = {
  kanji: PropTypes.object.isRequired,
  kanjis: PropTypes.array.isRequired,
  loadKanjis: PropTypes.func.isRequired,
  iAdjectives: PropTypes.array.isRequired,
  loadIAdjectives: PropTypes.func.isRequired,
  naAdjectives: PropTypes.array.isRequired,
  loadNaAdjectives: PropTypes.func.isRequired,
  names: PropTypes.array.isRequired,
  loadNames: PropTypes.func.isRequired,
  verbs: PropTypes.array.isRequired,
  loadVerbs: PropTypes.func.isRequired,
  words: PropTypes.array.isRequired,
  loadWords: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export function getKanjiByKanji(kanjis, char) {
  return kanjis.find((kanji) => kanji.kanji === char) || null;
}

function mapStateToProps(state, ownProps) {
  const char = ownProps.match.params.kanji;
  const kanji =
    char && state.kanjis.length > 0
      ? getKanjiByKanji(state.kanjis, char)
      : newKanji;
  return {
    kanji,
    kanjis: state.kanjis,
    iAdjectives: state.iAdjectives,
    naAdjectives: state.naAdjectives,
    names: state.names,
    verbs: state.verbs,
    words: state.words,
  };
}

const mapDispatchToProps = {
  loadKanjis,
  loadIAdjectives,
  loadNaAdjectives,
  loadNames,
  loadVerbs,
  loadWords,
};

export default connect(mapStateToProps, mapDispatchToProps)(VisualizeKanjiPage);
