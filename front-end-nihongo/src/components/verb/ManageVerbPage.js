import React, { useState, useEffect } from "react";
import VerbForm from "./VerbForm";
import { toast } from "react-toastify";
import verbStore from "../../stores/verbStore";
import { Prompt } from "react-router-dom";
import * as verbActions from "../../actions/verbActions";
import { translateRomajiToKana } from "../common/TranslateRomajiToKana";
import {
  newMeaningNumber,
  newPronunciationNumber,
} from "../common/meaningUtils";

const ManageVerbPage = (props) => {
  const [modified, setModified] = useState(false);
  const [errors, setErrors] = useState({});
  const [verb, setVerb] = useState({
    id: null,
    neutralForm: "",
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
    numberOfUse: null,
    version: null,
  });

  useEffect(() => {
    const neutralForm = props.match.params.neutralForm; // from the path /verbs/:verb
    if (neutralForm) {
      // on récupère le verb du store et on le transforme pour qu'il corresponde au formulaire
      const verbForm = verbStore.getVerbByNeutralForm(neutralForm);
      setVerb(verbForm);
    }
  }, [props.match.params.neutralForm]);

  function handleChange(event) {
    setVerb({ ...verb, [event.target.name]: event.target.value });
    setModified(true);
  }

  function formIsValid() {
    const _errors = {};
    if (!verb.neutralForm)
      _errors.neutralForm = "Neutral form of the verb is required";
    if (!verb.groupe) _errors.groupe = "Group is required";

    setErrors(_errors);
    // form is valid if the erros object has no properties
    return Object.keys(_errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setModified(false);
    verbActions.saveVerb(verb).then(() => {
      props.history.push("/verbs");
      toast.success("Verb saved.");
    });
  }

  function handleAddMeaning(event) {
    event.preventDefault();
    let newMeanings = verb.meanings;
    newMeanings.push({
      id: null,
      meaningNumber: newMeaningNumber(verb.meanings),
      meaning: "",
      version: 0,
    });
    setVerb({
      ...verb,
      meanings: newMeanings,
    });
  }

  function handleMeaningChange(event, index) {
    event.preventDefault();
    let newMeanings = verb.meanings;
    newMeanings[index].meaning = event.target.value;
    setVerb({ ...verb, meanings: newMeanings });
    setModified(true);
  }

  function handleDeleteMeaning(event, index) {
    event.preventDefault();
    let newMeanings = verb.meanings;
    newMeanings.splice(index, 1);
    setVerb({ ...verb, meanings: newMeanings });
    setModified(true);
  }

  function handleAddPronunciation(event) {
    event.preventDefault();
    let pronunciations = verb.pronunciations;
    pronunciations.push({
      id: null,
      pronunciationNumber: newPronunciationNumber(verb.pronunciations),
      pronunciation: "",
      version: 0,
    });
    setVerb({
      ...verb,
      pronunciations: pronunciations,
    });
  }

  function handlePronunciationChange(event, index) {
    event.preventDefault();
    let newPronunciations = verb.pronunciations;
    newPronunciations[index].pronunciation = event.target.value;
    setVerb({ ...verb, pronunciations: newPronunciations });
    setModified(true);
  }

  function handleDeletePronunciation(event, index) {
    event.preventDefault();
    let newPronunciations = verb.pronunciations;
    newPronunciations.splice(index, 1);
    setVerb({ ...verb, pronunciations: newPronunciations });
    setModified(true);
  }

  const onMiddlePointClick = (event, index) => {
    event.preventDefault();
    let input = document.getElementById("pronunciation" + index);
    input.value = input.value + event.target.innerText;
    let newPronunciations = verb.pronunciations;
    newPronunciations[index].pronunciation =
      newPronunciations[index].pronunciation + event.target.innerText;
    setVerb({
      ...verb,
      pronunciations: newPronunciations,
    });
  };

  const handleTranslateClick = (event, index) => {
    event.preventDefault();
    let input = document.getElementById("pronunciation" + index);
    const newValue = translateRomajiToKana(input.value);
    input.value = newValue;
    let newPronunciations = verb.pronunciations;
    newPronunciations[index].pronunciation = newValue;
    setVerb({
      ...verb,
      pronunciations: newPronunciations,
    });
  };

  return (
    <>
      <h2>Manage Verb</h2>
      <Prompt when={modified} message="Are you sure you want to leave ?" />
      <VerbForm
        errors={errors}
        verb={verb}
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

export default ManageVerbPage;
