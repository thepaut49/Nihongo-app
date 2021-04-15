import React, { useState, useEffect } from "react";
import NameForm from "./NameForm";
import { toast } from "react-toastify";
import nameStore from "../../stores/nameStore";
import { Prompt } from "react-router-dom";
import * as nameActions from "../../actions/nameActions";
import { translateRomajiToKana } from "../common/TranslateRomajiToKana";
import {
  newMeaningNumber,
  newPronunciationNumber,
} from "../common/meaningUtils";

const ManageNamePage = (props) => {
  const [modified, setModified] = useState(false);
  const [errors, setErrors] = useState({});
  const [name, setName] = useState({
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
        version: null,
      },
    ],
    numberOfUse: null,
    version: null,
  });

  useEffect(() => {
    const kanjis = props.match.params.kanjis; // from the path /names/:name
    if (kanjis) {
      // on récupère le name du store et on le transforme pour qu'il corresponde au formulaire
      const nameForm = nameStore.getNameByKanjis(kanjis);
      setName(nameForm);
    }
  }, [props.match.params.kanjis]);

  function handleChange(event) {
    setName({ ...name, [event.target.name]: event.target.value });
    setModified(true);
  }

  function formIsValid() {
    const _errors = {};
    if (!name.kanjis) _errors.kanjis = "Kanjis of the name is required";
    setErrors(_errors);
    // form is valid if the erros object has no properties
    return Object.keys(_errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setModified(false);
    nameActions.saveName(name).then(() => {
      props.history.push("/names");
      toast.success("Name saved.");
    });
  }

  function handleAddMeaning(event) {
    event.preventDefault();
    let newMeanings = name.meanings;
    newMeanings.push({
      id: null,
      meaningNumber: newMeaningNumber(name.meanings),
      meaning: "",
      version: 0,
    });
    setName({
      ...name,
      meanings: newMeanings,
    });
  }

  function handleMeaningChange(event, index) {
    event.preventDefault();
    let newMeanings = name.meanings;
    newMeanings[index].meaning = event.target.value;
    setName({ ...name, meanings: newMeanings });
    setModified(true);
  }

  function handleDeleteMeaning(event, index) {
    event.preventDefault();
    let newMeanings = name.meanings;
    newMeanings.splice(index, 1);
    setName({ ...name, meanings: newMeanings });
    setModified(true);
  }

  function handleAddPronunciation(event) {
    event.preventDefault();
    let pronunciations = name.pronunciations;
    pronunciations.push({
      id: null,
      pronunciationNumber: newPronunciationNumber(name.pronunciations),
      pronunciation: "",
      version: 0,
    });
    setName({
      ...name,
      pronunciations: pronunciations,
    });
  }

  function handlePronunciationChange(event, index) {
    event.preventDefault();
    let newPronunciations = name.pronunciations;
    newPronunciations[index].pronunciation = event.target.value;
    setName({ ...name, pronunciations: newPronunciations });
    setModified(true);
  }

  function handleDeletePronunciation(event, index) {
    event.preventDefault();
    let newPronunciations = name.pronunciations;
    newPronunciations.splice(index, 1);
    setName({ ...name, pronunciations: newPronunciations });
    setModified(true);
  }

  const onMiddlePointClick = (event, index) => {
    event.preventDefault();
    let input = document.getElementById("pronunciation" + index);
    input.value = input.value + event.target.innerText;
    let newPronunciations = name.pronunciations;
    newPronunciations[index].pronunciation =
      newPronunciations[index].pronunciation + event.target.innerText;
    setName({
      ...name,
      pronunciations: newPronunciations,
    });
  };

  const handleTranslateClick = (event, index) => {
    event.preventDefault();
    let input = document.getElementById("pronunciation" + index);
    const newValue = translateRomajiToKana(input.value);
    input.value = newValue;
    let newPronunciations = name.pronunciations;
    newPronunciations[index].pronunciation = newValue;
    setName({
      ...name,
      pronunciations: newPronunciations,
    });
  };

  return (
    <>
      <h2>Manage Name</h2>
      <Prompt when={modified} message="Are you sure you want to leave ?" />
      <NameForm
        errors={errors}
        name={name}
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

export default ManageNamePage;
