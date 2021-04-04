import React, { useState, useEffect } from "react";
import IAdjectiveForm from "./IAdjectiveForm";
import { toast } from "react-toastify";
import iAdjectiveStore from "../../stores/iAdjectiveStore";
import { Prompt } from "react-router-dom";
import * as iAdjectiveActions from "../../actions/iAdjectiveActions";
import { translateRomajiToKana } from "../common/TranslateRomajiToKana";

const ManageIAdjectivePage = (props) => {
  const [modified, setModified] = useState(false);
  const [errors, setErrors] = useState({});
  const [iAdjective, setIAdjective] = useState({
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
    setIAdjective({
      ...iAdjective,
      pronunciation: iAdjective.pronunciation + event.target.innerText,
    });
  };

  const handleTranslateClick = (event) => {
    event.preventDefault();
    let input = document.getElementById("pronunciation");
    const newValue = translateRomajiToKana(input.value);
    input.value = newValue;
    setIAdjective({
      ...iAdjective,
      pronunciation: newValue,
    });
  };

  useEffect(() => {
    const kanjis = props.match.params.kanjis; // from the path /iAdjectives/:iAdjective
    if (kanjis) {
      // on récupère le iAdjective du store et on le transforme pour qu'il corresponde au formulaire
      let tempIAdjective = iAdjectiveStore.getIAdjectiveByKanjis(kanjis);
      let newPronunciation = tempIAdjective.pronunciation[0];
      if (tempIAdjective.pronunciation.length > 1) {
        for (let i = 1; i < tempIAdjective.pronunciation.length; i++) {
          newPronunciation =
            newPronunciation + "・" + tempIAdjective.pronunciation[i];
        }
      }
      const iAdjectiveForm = {
        ...tempIAdjective,
        pronunciation: newPronunciation,
      };
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
    if (!iAdjective.pronunciation)
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
    let newPronunciation = [];
    if (iAdjective.pronunciation.includes("・")) {
      newPronunciation = iAdjective.pronunciation.split("・");
      for (let i = 0; i < newPronunciation.length; i++) {
        newPronunciation[i] = newPronunciation[i].replace("・", "");
      }
    } else {
      newPronunciation = [iAdjective.pronunciation];
    }
    const savedIAdjective = {
      ...iAdjective,
      pronunciation: newPronunciation,
    };
    iAdjectiveActions.saveIAdjective(savedIAdjective).then(() => {
      props.history.push("/iAdjectives");
      toast.success("IAdjective saved.");
    });
  }

  function handleAddMeaning(event) {
    event.preventDefault();
    let newMeanings = iAdjective.meanings;
    newMeanings.push({
      meaningNumber: iAdjective.meanings.length,
      meaning: "",
    });
    setIAdjective({
      ...iAdjective,
      meanings: newMeanings,
    });
  }

  function handleMeaningChange(event, index) {
    let newMeanings = iAdjective.meanings;
    newMeanings[index].meaning = event.target.value;
    setIAdjective({ ...iAdjective, meanings: newMeanings });
    setModified(true);
  }

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
      />
    </>
  );
};

export default ManageIAdjectivePage;
