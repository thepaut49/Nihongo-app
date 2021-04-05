import React, { useState, useEffect } from "react";
import WordForm from "./WordForm";
import { toast } from "react-toastify";
import wordStore from "../../stores/wordStore";
import { Prompt } from "react-router-dom";
import * as wordActions from "../../actions/wordActions";
import { translateRomajiToKana } from "../common/TranslateRomajiToKana";
import { newMeaningNumber } from "../common/meaningUtils";

const ManageWordPage = (props) => {
  const [modified, setModified] = useState(false);
  const [errors, setErrors] = useState({});
  const [word, setWord] = useState({
    id: null,
    kanjis: "",
    pronunciation: "",
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
  });

  const onMiddlePointClick = (event) => {
    event.preventDefault();
    let input = document.getElementById("pronunciation");
    input.value = input.value + event.target.innerText;
    setWord({
      ...word,
      pronunciation: word.pronunciation + event.target.innerText,
    });
  };

  const handleTranslateClick = (event) => {
    event.preventDefault();
    let input = document.getElementById("pronunciation");
    const newValue = translateRomajiToKana(input.value);
    input.value = newValue;
    setWord({
      ...word,
      pronunciation: newValue,
    });
  };

  useEffect(() => {
    const kanjis = props.match.params.kanjis; // from the path /words/:word
    if (kanjis) {
      // on récupère le word du store et on le transforme pour qu'il corresponde au formulaire
      let tempWord = wordStore.getWordByKanjis(kanjis);
      let newPronunciation = tempWord.pronunciation[0];
      for (let i = 1; i < tempWord.pronunciation.length; i++) {
        newPronunciation = newPronunciation + "・" + tempWord.pronunciation[i];
      }
      const wordForm = {
        ...tempWord,
        pronunciation: newPronunciation,
      };
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
    if (!word.pronunciation)
      _errors.pronunciation = "Pronunciation is required";

    setErrors(_errors);
    // form is valid if the erros object has no properties
    return Object.keys(_errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setModified(false);
    // on transforme les chaine de caractères en liste de chaines
    let newPronunciation = word.pronunciation.split("・");
    for (let i = 0; i < newPronunciation.length; i++) {
      newPronunciation[i] = newPronunciation[i].replace("・", "");
    }
    const savedWord = {
      ...word,
      pronunciation: newPronunciation,
    };
    wordActions.saveWord(savedWord).then(() => {
      props.history.push("/words");
      toast.success("Word saved.");
    });
  }

  function handleAddMeaning(event) {
    event.preventDefault();
    let newMeanings = word.meanings;
    newMeanings.push({
      meaningNumber: newMeaningNumber(word.meanings),
      meaning: "",
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
      />
    </>
  );
};

export default ManageWordPage;
