import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { loadWords, saveWord } from "../../redux/actions/wordActions";
import PropTypes from "prop-types";
import Spinner from "../common/spinner/Spinner";
import WordForm from "./WordForm";
import { toast } from "react-toastify";
import { Prompt } from "react-router-dom";
import { translateRomajiToKana } from "../common/TranslateRomajiToKana";
import {
  newMeaningNumber,
  newPronunciationNumber,
} from "../common/meaningUtils";

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
  const [word, setWord] = useState({ ...props.word });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (words.length === 0) {
      loadWords().catch((error) => {
        alert("Loading words failed" + error);
      });
    } else {
      setWord({ ...props.word });
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

  function handleAddMeaning(event) {
    event.preventDefault();
    const newMeaning = {
      id: null,
      meaningNumber: newMeaningNumber(word.meanings),
      meaning: "",
      version: 0,
    };
    setWord({
      ...word,
      meanings: [...word.meanings, newMeaning],
    });
    setModified(true);
  }

  function handleMeaningChange(event, index) {
    event.preventDefault();
    const newMeaning = {
      id: word.meanings[index].id,
      meaningNumber: word.meanings[index].meaningNumber,
      meaning: event.target.value,
      version: word.meanings[index].version,
    };
    setWord({
      ...word,
      meanings: word.meanings.map((meaning) => {
        if (meaning.meaningNumber === newMeaning.meaningNumber) {
          return newMeaning;
        } else {
          return meaning;
        }
      }),
    });
    setModified(true);
  }

  function handleDeleteMeaning(event, index) {
    event.preventDefault();
    const meanToDelete = word.meanings[index];
    setWord({
      ...word,
      meanings: word.meanings.filter((meaning) => {
        if (meaning === meanToDelete) {
          return false;
        } else {
          return true;
        }
      }),
    });
    setModified(true);
  }

  function handleAddPronunciation(event) {
    event.preventDefault();
    const newPronunciation = {
      id: null,
      pronunciationNumber: newPronunciationNumber(word.pronunciations),
      pronunciation: "",
      version: 0,
    };
    setWord({
      ...word,
      pronunciations: [...word.pronunciations, newPronunciation],
    });
    setModified(true);
  }

  function handlePronunciationChange(event, index) {
    event.preventDefault();
    const newPronunciation = {
      id: word.pronunciations[index].id,
      pronunciationNumber: word.pronunciations[index].pronunciationNumber,
      pronunciation: event.target.value,
      version: word.pronunciations[index].version,
    };
    setWord({
      ...word,
      pronunciations: word.pronunciations.map((pronunciation) => {
        if (
          pronunciation.pronunciationNumber ===
          newPronunciation.pronunciationNumber
        ) {
          return newPronunciation;
        } else {
          return pronunciation;
        }
      }),
    });
    setModified(true);
  }

  function handleDeletePronunciation(event, index) {
    event.preventDefault();
    const proToDelete = word.pronunciations[index];
    setWord({
      ...word,
      pronunciations: word.pronunciations.filter((pronunciation) => {
        if (pronunciation === proToDelete) {
          return false;
        } else {
          return true;
        }
      }),
    });
    setModified(true);
  }

  const onMiddlePointClick = (event, index) => {
    event.preventDefault();
    let input = document.getElementById("pronunciation" + index);
    input.value = input.value + event.target.innerText;
    const newPronunciation = {
      id: word.pronunciations[index].id,
      pronunciationNumber: word.pronunciations[index].pronunciationNumber,
      pronunciation: input.value,
      version: word.pronunciations[index].version,
    };
    setWord({
      ...word,
      pronunciations: word.pronunciations.map((pronunciation) => {
        if (
          pronunciation.pronunciationNumber ===
          newPronunciation.pronunciationNumber
        ) {
          return newPronunciation;
        } else {
          return pronunciation;
        }
      }),
    });
    setModified(true);
  };

  const handleTranslateClick = (event, index) => {
    event.preventDefault();
    let input = document.getElementById("pronunciation" + index);
    const newValue = translateRomajiToKana(input.value);
    input.value = newValue;
    const newPronunciation = {
      id: word.pronunciations[index].id,
      pronunciationNumber: word.pronunciations[index].pronunciationNumber,
      pronunciation: input.value,
      version: word.pronunciations[index].version,
    };
    setWord({
      ...word,
      pronunciations: word.pronunciations.map((pronunciation) => {
        if (
          pronunciation.pronunciationNumber ===
          newPronunciation.pronunciationNumber
        ) {
          return newPronunciation;
        } else {
          return pronunciation;
        }
      }),
    });
    setModified(true);
  };

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
