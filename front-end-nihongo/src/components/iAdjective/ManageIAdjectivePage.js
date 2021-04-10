import React, { useState, useEffect } from "react";
import IAdjectiveForm from "./IAdjectiveForm";
import { toast } from "react-toastify";
import iAdjectiveStore from "../../stores/iAdjectiveStore";
import { Prompt } from "react-router-dom";
import * as iAdjectiveActions from "../../actions/iAdjectiveActions";
import { translateRomajiToKana } from "../common/TranslateRomajiToKana";
import {
  newMeaningNumber,
  newPronunciationNumber,
} from "../common/meaningUtils";

const ManageIAdjectivePage = (props) => {
  const [modified, setModified] = useState(false);
  const [errors, setErrors] = useState({});
  const [iAdjective, setIAdjective] = useState({
    id: null,
    kanjis: "",
    pronunciations: [
      {
        iiAdjectiveId: null,
        pronunciationNumber: 0,
        pronunciation: "",
        version: null,
      },
    ],
    meanings: [
      {
        iiAdjectiveId: null,
        meaningNumber: 0,
        meaning: "",
        version: null,
      },
    ],
    numberOfUse: null,
    version: null,
  });

  useEffect(() => {
    const kanjis = props.match.params.kanjis; // from the path /iAdjectives/:iAdjective
    if (kanjis) {
      // on récupère le iAdjective du store et on le transforme pour qu'il corresponde au formulaire
      const iAdjectiveForm = iAdjectiveStore.getIAdjectiveByKanjis(kanjis);
      setIAdjective(iAdjectiveForm);
    }
  }, [props.match.params.kanjis]);

  function handleChange(event) {
    setIAdjective({ ...iAdjective, [event.target.name]: event.target.value });
    setModified(true);
  }

  function formIsValid() {
    const _errors = {};
    if (!iAdjective.kanjis)
      _errors.kanjis = "Kanjis of the iAdjective is required";
    setErrors(_errors);
    // form is valid if the erros object has no properties
    return Object.keys(_errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setModified(false);
    iAdjectiveActions.saveIAdjective(iAdjective).then(() => {
      props.history.push("/iAdjectives");
      toast.success("IAdjective saved.");
    });
  }

  function handleAddMeaning(event) {
    event.preventDefault();
    let newMeanings = iAdjective.meanings;
    newMeanings.push({
      iiAdjectiveId: iAdjective.id,
      meaningNumber: newMeaningNumber(iAdjective.meanings),
      meaning: "",
      version: 0,
    });
    setIAdjective({
      ...iAdjective,
      meanings: newMeanings,
    });
  }

  function handleMeaningChange(event, index) {
    event.preventDefault();
    let newMeanings = iAdjective.meanings;
    newMeanings[index].meaning = event.target.value;
    setIAdjective({ ...iAdjective, meanings: newMeanings });
    setModified(true);
  }

  function handleDeleteMeaning(event, index) {
    event.preventDefault();
    let newMeanings = iAdjective.meanings;
    newMeanings.splice(index, 1);
    setIAdjective({ ...iAdjective, meanings: newMeanings });
    setModified(true);
  }

  function handleAddPronunciation(event) {
    event.preventDefault();
    let pronunciations = iAdjective.pronunciations;
    pronunciations.push({
      iiAdjectiveId: iAdjective.id,
      pronunciationNumber: newPronunciationNumber(iAdjective.pronunciations),
      pronunciation: "",
      version: 0,
    });
    setIAdjective({
      ...iAdjective,
      pronunciations: pronunciations,
    });
  }

  function handlePronunciationChange(event, index) {
    event.preventDefault();
    let newPronunciations = iAdjective.pronunciations;
    newPronunciations[index].pronunciation = event.target.value;
    setIAdjective({ ...iAdjective, pronunciations: newPronunciations });
    setModified(true);
  }

  function handleDeletePronunciation(event, index) {
    event.preventDefault();
    let newPronunciations = iAdjective.pronunciations;
    newPronunciations.splice(index, 1);
    setIAdjective({ ...iAdjective, pronunciations: newPronunciations });
    setModified(true);
  }

  const onMiddlePointClick = (event, index) => {
    event.preventDefault();
    let input = document.getElementById("pronunciation" + index);
    input.value = input.value + event.target.innerText;
    let newPronunciations = iAdjective.pronunciations;
    newPronunciations[index].pronunciation =
      newPronunciations[index].pronunciation + event.target.innerText;
    setIAdjective({
      ...iAdjective,
      pronunciations: newPronunciations,
    });
  };

  const handleTranslateClick = (event, index) => {
    event.preventDefault();
    let input = document.getElementById("pronunciation" + index);
    const newValue = translateRomajiToKana(input.value);
    input.value = newValue;
    let newPronunciations = iAdjective.pronunciations;
    newPronunciations[index].pronunciation = newValue;
    setIAdjective({
      ...iAdjective,
      pronunciations: newPronunciations,
    });
  };

  return (
    <>
      <h2>Manage IAdjective</h2>
      <Prompt when={modified} message="Are you sure you want to leave ?" />
      <IAdjectiveForm
        errors={errors}
        iAdjective={iAdjective}
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

export default ManageIAdjectivePage;
