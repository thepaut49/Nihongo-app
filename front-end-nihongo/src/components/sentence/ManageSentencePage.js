import React, { useState, useEffect } from "react";
import SentenceForm from "./SentenceForm";
import { toast } from "react-toastify";
import sentenceStore from "../../stores/sentenceStore";
import { Prompt } from "react-router-dom";
import * as sentenceActions from "../../actions/sentenceActions";
import { translateRomajiToKana } from "../common/TranslateRomajiToKana";

const ManageSentencePage = (props) => {
  const [modified, setModified] = useState(false);
  const [errors, setErrors] = useState({});
  const [sentence, setSentence] = useState({
    id: null,
    kanjis: "",
    pronunciation: "",
    meaning: "",
    topic: "",
    version: null,
  });

  const onMiddlePointClick = (event) => {
    event.preventDefault();
    let input = document.getElementById("pronunciation");
    input.value = input.value + event.target.innerText;
    setSentence({
      ...sentence,
      pronunciation: sentence.pronunciation + event.target.innerText,
    });
  };

  const handleTranslateClick = (event) => {
    event.preventDefault();
    let input = document.getElementById("pronunciation");
    const newValue = translateRomajiToKana(input.value);
    input.value = newValue;
    setSentence({
      ...sentence,
      pronunciation: newValue,
    });
  };

  useEffect(() => {
    const kanjis = props.match.params.kanjis; // from the path /sentences/:sentence
    if (kanjis) {
      // on récupère le sentence du store et on le transforme pour qu'il corresponde au formulaire
      let tempSentence = sentenceStore.getSentenceByKanjis(kanjis);
      let newPronunciation = tempSentence.pronunciation[0];
      for (let i = 1; i < tempSentence.pronunciation.length; i++) {
        newPronunciation =
          newPronunciation + "・" + tempSentence.pronunciation[i];
      }
      let newMeaning = tempSentence.meaning[0];
      for (let i = 1; i < tempSentence.meaning.length; i++) {
        newMeaning = newMeaning + ";" + tempSentence.meaning[i];
      }
      const sentenceForm = {
        ...tempSentence,
        pronunciation: newPronunciation,
        meaning: newMeaning,
      };
      setSentence(sentenceForm);
    }
  }, [props.match.params.kanjis]);

  function handleChange(event) {
    setSentence({ ...sentence, [event.target.name]: event.target.value });
    setModified(true);
  }

  function formIsValid() {
    const _errors = {};
    if (!sentence.kanjis) _errors.kanjis = "Kanjis of the sentence is required";
    if (!sentence.pronunciation)
      _errors.pronunciation = "Pronunciation is required";
    if (!sentence.meaning) _errors.meaning = "Meaning is required";

    setErrors(_errors);
    // form is valid if the erros object has no properties
    return Object.keys(_errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setModified(false);
    // on transforme les chaine de caractères en liste de chaines
    let newPronunciation = sentence.pronunciation.split("・");
    for (let i = 0; i < newPronunciation.length; i++) {
      newPronunciation[i] = newPronunciation[i].replace("・", "");
    }
    let newMeaning = sentence.meaning.split(";");
    for (let j = 0; j < newMeaning.length; j++) {
      newMeaning[j] = newMeaning[j].replace(";", "");
    }
    debugger;
    const savedSentence = {
      ...sentence,
      kanjis: sentence.kanjis,
      pronunciation: newPronunciation,
      meaning: newMeaning,
    };
    sentenceActions.saveSentence(savedSentence).then(() => {
      props.history.push("/sentences");
      toast.success("Sentence saved.");
    });
  }

  return (
    <>
      <h2>Manage Sentence</h2>
      <Prompt when={modified} message="Are you sure you want to leave ?" />
      <SentenceForm
        errors={errors}
        sentence={sentence}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onMiddlePointClick={onMiddlePointClick}
        onTranslateClick={handleTranslateClick}
      />
    </>
  );
};

export default ManageSentencePage;
