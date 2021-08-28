import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import CustomInput from "../CustomInput";
import CustomTextArea from "../CustomTextArea";
import { translateRomajiToKana } from "../TranslateRomajiToKana";
import KanjiList from "./KanjiList";
import { bindActionCreators } from "redux";
import Spinner from "../spinner/Spinner";
import * as kanjiActions from "../../../redux/actions/kanjiActions";
import PropTypes from "prop-types";
import "./JapaneseKayboard.css";
import {
  hiraganaToKatakana,
  katakanaToHiragana,
} from "../convertHiraganaToKatakana";

const JapanesKeyboard = (props) => {
  const [text, setText] = useState("");
  const [kanjiPronunciation, setKanjiPronunciation] = useState("");
  const [kanjis, setKanjis] = useState([]);
  const [noResult, setNoResult] = useState(false);

  useEffect(() => {
    const { kanjis, actions } = props;

    if (kanjis.length === 0) {
      actions.loadKanjis().catch((error) => {
        alert("Loading kanjis failed" + error);
      });
    }
  }, [props.kanjis.length]);

  const handleTextChange = (event) => {
    const { value } = event.target;
    setText(translateRomajiToKana(value));
  };

  const handleKanjiPronunciationChange = (event) => {
    const { value } = event.target;
    setKanjiPronunciation(translateRomajiToKana(value));
  };

  const handleButtonClick = (event) => {
    const { innerText } = event.target;
    setText(text + innerText);
  };

  const searchKanjis = (event) => {
    event.preventDefault();
    const propsKanjis = props.kanjis;
    let kanjiList = [];
    for (let index = 0; index < propsKanjis.length; index++) {
      for (let j = 0; j < propsKanjis[index].pronunciations.length; j++) {
        const pro = propsKanjis[index].pronunciations[j].pronunciation;
        const hiraganaPro = katakanaToHiragana(pro);
        const katakanaPro = hiraganaToKatakana(pro);
        if (
          hiraganaPro.includes(kanjiPronunciation) ||
          katakanaPro.includes(kanjiPronunciation)
        ) {
          if (kanjiList.indexOf(propsKanjis[index]) === -1) {
            kanjiList.push(propsKanjis[index]);
          }
        }
      }
    }
    setKanjis(kanjiList);
    setNoResult(kanjiList.length === 0);
  };

  return (
    <section className="japaneseKeyboard">
      <CustomTextArea
        id="textToTranslate"
        label="Japanese Keyboard"
        name="textToTranslate"
        cols={30}
        rows={5}
        value={text}
        onChange={handleTextChange}
        onKanaClick={handleButtonClick}
      />

      <CustomInput
        id="kanjiPronunciation"
        label="Kanji pronunciation"
        onChange={handleKanjiPronunciationChange}
        name="kanjiPronunciation"
        value={kanjiPronunciation}
      />

      <button className="btn btn-primary" onClick={searchKanjis}>
        Search
      </button>

      {props.loading ? (
        <Spinner />
      ) : (
        <>
          <div className="listOfKanjisButtons">
            {kanjis && kanjis.length > 0 && (
              <KanjiList kanjis={kanjis} onListClick={handleButtonClick} />
            )}
          </div>

          {noResult && <p>0 results</p>}

          <span>For these six hiragana and katakana you have to type :</span>
          <ul>
            <li>ん: -n</li>
            <li>ぢ: dji</li>
            <li>づ: dzu</li>
            <li>ン: -N</li>
            <li>ヂ: DJI</li>
            <li>ヅ: DZU</li>
            <li>っ: tsu=</li>
            <li>ッ: TSU=</li>
          </ul>
        </>
      )}
    </section>
  );
};

JapanesKeyboard.propTypes = {
  kanjis: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    kanjis: state.kanjis.map((kanji) => {
      return {
        ...kanji,
      };
    }),
    loading: state.apiCallsInProgress > 0,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadKanjis: bindActionCreators(kanjiActions.loadKanjis, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(JapanesKeyboard);
