import React, { useState, useEffect } from "react";
import NaAdjectiveForm from "./NaAdjectiveForm";
import { toast } from "react-toastify";
import naAdjectiveStore from "../../stores/naAdjectiveStore";
import { Prompt } from "react-router-dom";
import * as naAdjectiveActions from "../../actions/naAdjectiveActions";
import { translateRomajiToKana } from "../common/TranslateRomajiToKana";
import {
  newMeaningNumber,
  newPronunciationNumber,
} from "../common/meaningUtils";

const ManageNaAdjectivePage = (props) => {
  const [modified, setModified] = useState(false);
  const [errors, setErrors] = useState({});
  const [naAdjective, setNaAdjective] = useState({
    id: null,
    kanjis: "",
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
    groupe: "",
    numberOfUse: 0,
    version: 0,
  });

  useEffect(() => {
    const kanjis = props.match.params.kanjis; // from the path /naAdjectives/:naAdjective
    if (kanjis) {
      // on récupère le naAdjective du store et on le transforme pour qu'il corresponde au formulaire
      const naAdjectiveForm = naAdjectiveStore.getNaAdjectiveByKanjis(kanjis);
      setNaAdjective(naAdjectiveForm);
    }
  }, [props.match.params.kanjis]);

  function handleChange(event) {
    setNaAdjective({ ...naAdjective, [event.target.name]: event.target.value });
    setModified(true);
  }

  function formIsValid() {
    const _errors = {};
    if (!naAdjective.kanjis)
      _errors.kanjis = "Kanjis of the naAdjective is required";
    setErrors(_errors);
    // form is valid if the erros object has no properties
    return Object.keys(_errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setModified(false);
    naAdjectiveActions.saveNaAdjective(naAdjective).then(() => {
      props.history.push("/naAdjectives");
      toast.success("NaAdjective saved.");
    });
  }

  function handleAddMeaning(event) {
    event.preventDefault();
    let newMeanings = naAdjective.meanings;
    newMeanings.push({
      naAdjectiveId: naAdjective.id,
      meaningNumber: newMeaningNumber(naAdjective.meanings),
      meaning: "",
      version: 0,
    });
    setNaAdjective({
      ...naAdjective,
      meanings: newMeanings,
    });
  }

  function handleMeaningChange(event, index) {
    event.preventDefault();
    let newMeanings = naAdjective.meanings;
    newMeanings[index].meaning = event.target.value;
    setNaAdjective({ ...naAdjective, meanings: newMeanings });
    setModified(true);
  }

  function handleDeleteMeaning(event, index) {
    event.preventDefault();
    let newMeanings = naAdjective.meanings;
    newMeanings.splice(index, 1);
    setNaAdjective({ ...naAdjective, meanings: newMeanings });
    setModified(true);
  }

  function handleAddPronunciation(event) {
    event.preventDefault();
    let pronunciations = naAdjective.pronunciations;
    pronunciations.push({
      naAdjectiveId: naAdjective.id,
      pronunciationNumber: newPronunciationNumber(naAdjective.pronunciations),
      pronunciation: "",
      version: 0,
    });
    setNaAdjective({
      ...naAdjective,
      pronunciations: pronunciations,
    });
  }

  function handlePronunciationChange(event, index) {
    event.preventDefault();
    let newPronunciations = naAdjective.pronunciations;
    newPronunciations[index].pronunciation = event.target.value;
    setNaAdjective({ ...naAdjective, pronunciations: newPronunciations });
    setModified(true);
  }

  function handleDeletePronunciation(event, index) {
    event.preventDefault();
    let newPronunciations = naAdjective.pronunciations;
    newPronunciations.splice(index, 1);
    setNaAdjective({ ...naAdjective, pronunciations: newPronunciations });
    setModified(true);
  }

  const onMiddlePointClick = (event, index) => {
    event.preventDefault();
    let input = document.getElementById("pronunciation" + index);
    input.value = input.value + event.target.innerText;
    let newPronunciations = naAdjective.pronunciations;
    newPronunciations[index].pronunciation =
      newPronunciations[index].pronunciation + event.target.innerText;
    setNaAdjective({
      ...naAdjective,
      pronunciations: newPronunciations,
    });
  };

  const handleTranslateClick = (event, index) => {
    event.preventDefault();
    let input = document.getElementById("pronunciation" + index);
    const newValue = translateRomajiToKana(input.value);
    input.value = newValue;
    let newPronunciations = naAdjective.pronunciations;
    newPronunciations[index].pronunciation = newValue;
    setNaAdjective({
      ...naAdjective,
      pronunciations: newPronunciations,
    });
  };

  return (
    <>
      <h2>Manage NaAdjective</h2>
      <Prompt when={modified} message="Are you sure you want to leave ?" />
      <NaAdjectiveForm
        errors={errors}
        naAdjective={naAdjective}
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

export default ManageNaAdjectivePage;
