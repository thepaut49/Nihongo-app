import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { loadWords, saveWord } from "../../redux/actions/wordActions";
import PropTypes from "prop-types";
import Spinner from "../common/spinner/Spinner";
import WordForm from "./WordForm";
import { toast } from "react-toastify";
import { Prompt } from "react-router-dom";
import * as manageEntityUtils from "../common/manageEntityUtils";

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

const ManageWordPage = ({ words, loadWords, saveWord, history, ...props }) => {
  const [modified, setModified] = useState(false);
  const [errors, setErrors] = useState({});
  const [word, setWord] = useState({
    ...props.word,
    pronunciations: [...props.word.pronunciations],
    meanings: [...props.word.meanings],
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (words.length === 0) {
      loadWords().catch((error) => {
        alert("Loading words failed" + error);
      });
    } else {
      setWord({
        ...props.word,
        pronunciations: [...props.word.pronunciations],
        meanings: [...props.word.meanings],
      });
    }
  }, [props.word]);

  function handleChange(event) {
    const { name, value } = event.target;
    setWord((prevWord) => ({
      ...prevWord,
      [name]: value,
    }));
    setModified(true);
  }

  function formIsValid() {
    const _errors = {};
    if (!word.kanjis) _errors.kanjis = "Kanjis of the word is required";
    setErrors(_errors);
    // form is valid if the erros object has no properties
    return Object.keys(_errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setModified(false);
    setSaving(true);
    saveWord(word)
      .then(() => {
        toast.success("Word saved.");
        history.push("/words");
      })
      .catch((error) => {
        setSaving(false);
        setErrors({ onSubmit: error.message });
      });
  }

  function handleAddPronunciation(event) {
    manageEntityUtils.handleAddPronunciation(event, word, setWord, setModified);
  }

  function handlePronunciationChange(event, index) {
    manageEntityUtils.handlePronunciationChange(
      event,
      index,
      word,
      setWord,
      setModified
    );
  }

  function handleDeletePronunciation(event, index) {
    manageEntityUtils.handleDeletePronunciation(
      event,
      index,
      word,
      setWord,
      setModified
    );
  }

  const onMiddlePointClick = (event, index) => {
    manageEntityUtils.onMiddlePointClick(
      event,
      index,
      word,
      setWord,
      setModified
    );
  };

  const handleTranslateClick = (event, index) => {
    manageEntityUtils.handleTranslateClick(
      event,
      index,
      word,
      setWord,
      setModified
    );
  };

  function handleAddMeaning(event) {
    manageEntityUtils.handleAddMeaning(event, word, setWord, setModified);
  }

  function handleMeaningChange(event, index) {
    manageEntityUtils.handleMeaningChange(
      event,
      index,
      word,
      setWord,
      setModified
    );
  }

  function handleDeleteMeaning(event, index) {
    manageEntityUtils.handleDeleteMeaning(
      event,
      index,
      word,
      setWord,
      setModified
    );
  }

  return (
    <>
      {words.length === 0 ? (
        <Spinner />
      ) : (
        <>
          <Prompt when={modified} message="Are you sure you want to leave ?" />
          <WordForm
            errors={errors}
            word={word}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onMiddlePointClick={onMiddlePointClick}
            onTranslateClick={handleTranslateClick}
            addMeaning={handleAddMeaning}
            onMeaningChange={handleMeaningChange}
            deleteMeaning={handleDeleteMeaning}
            addPronunciation={handleAddPronunciation}
            onPronunciationChange={handlePronunciationChange}
            deletePronunciation={handleDeletePronunciation}
            saving={saving}
          />
        </>
      )}
    </>
  );
};

ManageWordPage.propTypes = {
  word: PropTypes.object.isRequired,
  words: PropTypes.array.isRequired,
  loadWords: PropTypes.func.isRequired,
  saveWord: PropTypes.func.isRequired,
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
  };
}

const mapDispatchToProps = {
  loadWords,
  saveWord,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageWordPage);
