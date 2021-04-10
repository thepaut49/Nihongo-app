import React, { useState, useEffect } from "react";
import WordForm from "./WordForm";
import { toast } from "react-toastify";
import wordStore from "../../stores/wordStore";
import { Prompt } from "react-router-dom";
import * as wordActions from "../../actions/wordActions";
import { translateRomajiToKana } from "../common/TranslateRomajiToKana";
import {
  newMeaningNumber,
  newPronunciationNumber,
} from "../common/meaningUtils";

const ManageWordPage = (props) => {
  const [modified, setModified] = useState(false);
  const [errors, setErrors] = useState({});
  const [word, setWord] = useState({
    id: null,
    kanjis: "",
    pronunciations: [
      {
        wordId: null,
        pronunciationNumber: 0,
        pronunciation: "",
        version: 0,
      },
    ],
    meanings: [
      {
        wordId: null,
        meaningNumber: 0,
        meaning: "",
        version: 0,
      },
    ],
    numberOfUse: null,
    version: null,
  });

  useEffect(() => {
    const kanjis = props.match.params.kanjis; // from the path /words/:word
    if (kanjis) {
      // on récupère le word du store et on le transforme pour qu'il corresponde au formulaire
      const wordForm = wordStore.getWordByKanjis(kanjis);
      setWord(wordForm);
    }
  }, [props.match.params.kanjis]);

  function handleChange(event) {
    setWord({ ...word, [event.target.name]: event.target.value });
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
    wordActions.saveWord(word).then(() => {
      props.history.push("/words");
      toast.success("Word saved.");
    });
  }

  function handleAddMeaning(event) {
    event.preventDefault();
    let newMeanings = word.meanings;
    newMeanings.push({
      wordId: word.id,
      meaningNumber: newMeaningNumber(word.meanings),
      meaning: "",
      version: 0,
    });
    setWord({
      ...word,
      meanings: newMeanings,
    });
  }

  function handleMeaningChange(event, index) {
    event.preventDefault();
    let newMeanings = word.meanings;
    newMeanings[index].meaning = event.target.value;
    setWord({ ...word, meanings: newMeanings });
    setModified(true);
  }

  function handleDeleteMeaning(event, index) {
    event.preventDefault();
    let newMeanings = word.meanings;
    newMeanings.splice(index, 1);
    setWord({ ...word, meanings: newMeanings });
    setModified(true);
  }

  function handleAddPronunciation(event) {
    event.preventDefault();
    let pronunciations = word.pronunciations;
    pronunciations.push({
      wordId: word.id,
      pronunciationNumber: newPronunciationNumber(word.pronunciations),
      pronunciation: "",
      version: 0,
    });
    setWord({
      ...word,
      pronunciations: pronunciations,
    });
  }

  function handlePronunciationChange(event, index) {
    event.preventDefault();
    let newPronunciations = word.pronunciations;
    newPronunciations[index].pronunciation = event.target.value;
    setWord({ ...word, pronunciations: newPronunciations });
    setModified(true);
  }

  function handleDeletePronunciation(event, index) {
    event.preventDefault();
    let newPronunciations = word.pronunciations;
    newPronunciations.splice(index, 1);
    setWord({ ...word, pronunciations: newPronunciations });
    setModified(true);
  }

  const onMiddlePointClick = (event, index) => {
    event.preventDefault();
    let input = document.getElementById("pronunciation" + index);
    input.value = input.value + event.target.innerText;
    let newPronunciations = word.pronunciations;
    newPronunciations[index].pronunciation =
      newPronunciations[index].pronunciation + event.target.innerText;
    setWord({
      ...word,
      pronunciations: newPronunciations,
    });
  };

  const handleTranslateClick = (event, index) => {
    event.preventDefault();
    let input = document.getElementById("pronunciation" + index);
    const newValue = translateRomajiToKana(input.value);
    input.value = newValue;
    let newPronunciations = word.pronunciations;
    newPronunciations[index].pronunciation = newValue;
    setWord({
      ...word,
      pronunciations: newPronunciations,
    });
  };

  return (
    <>
      <h2>Manage Word</h2>
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
      />
    </>
  );
};

export default ManageWordPage;
