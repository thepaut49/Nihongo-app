import React, { useState, useEffect } from "react";
import NameForm from "./NameForm";
import { toast } from "react-toastify";
import nameStore from "../../stores/nameStore";
import { Prompt } from "react-router-dom";
import * as nameActions from "../../actions/nameActions";
import { translateRomajiToKana } from "../common/TranslateRomajiToKana";

const ManageNamePage = (props) => {
  const [modified, setModified] = useState(false);
  const [errors, setErrors] = useState({});
  const [name, setName] = useState({
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
    setName({
      ...name,
      pronunciation: name.pronunciation + event.target.innerText,
    });
  };

  const handleTranslateClick = (event) => {
    event.preventDefault();
    let input = document.getElementById("pronunciation");
    const newValue = translateRomajiToKana(input.value);
    input.value = newValue;
    setName({
      ...name,
      pronunciation: newValue,
    });
  };

  useEffect(() => {
    const kanjis = props.match.params.kanjis; // from the path /names/:name
    if (kanjis) {
      // on récupère le name du store et on le transforme pour qu'il corresponde au formulaire
      let tempName = nameStore.getNameByKanjis(kanjis);
      let newPronunciation = tempName.pronunciation[0];
      for (let i = 1; i < tempName.pronunciation.length; i++) {
        newPronunciation = newPronunciation + "・" + tempName.pronunciation[i];
      }
      const nameForm = {
        ...tempName,
        pronunciation: newPronunciation,
      };
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
    if (!name.pronunciation)
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
    let newPronunciation = name.pronunciation.split("・");
    for (let i = 0; i < newPronunciation.length; i++) {
      newPronunciation[i] = newPronunciation[i].replace("・", "");
    }
    const savedName = {
      ...name,
      pronunciation: newPronunciation,
    };
    nameActions.saveName(savedName).then(() => {
      props.history.push("/names");
      toast.success("Name saved.");
    });
  }

  function handleAddMeaning(event) {
    event.preventDefault();
    let newMeanings = name.meanings;
    newMeanings.push({
      meaningNumber: name.meanings.length,
      meaning: "",
    });
    setName({
      ...name,
      meanings: newMeanings,
    });
  }

  function handleMeaningChange(event, index) {
    let newMeanings = name.meanings;
    newMeanings[index].meaning = event.target.value;
    setName({ ...name, meanings: newMeanings });
    setModified(true);
  }

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
      />
    </>
  );
};

export default ManageNamePage;
