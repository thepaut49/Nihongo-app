import React, { useState, useEffect } from "react";
import SuffixForm from "./SuffixForm";
import { toast } from "react-toastify";
import suffixStore from "../../stores/suffixStore";
import { Prompt } from "react-router-dom";
import * as suffixActions from "../../actions/suffixActions";
import { translateRomajiToKana } from "../common/TranslateRomajiToKana";
import { newPronunciationNumber } from "../common/meaningUtils";

const ManageSuffixPage = (props) => {
  const [modified, setModified] = useState(false);
  const [errors, setErrors] = useState({});
  const [suffix, setSuffix] = useState({
    id: null,
    kanjis: "",
    pronunciations: [
      {
        id: null,
        pronunciation: "",
        pronunciationNumber: 0,
        version: 0,
      },
    ],
    use: "",
    summary: "",
    version: null,
  });

  useEffect(() => {
    const kanjis = props.match.params.kanjis; // from the path /suffixs/:suffix
    if (kanjis) {
      // on récupère le suffix du store et on le transforme pour qu'il corresponde au formulaire
      const suffixForm = suffixStore.getSuffixByKanjis(kanjis);
      setSuffix(suffixForm);
    }
  }, [props.match.params.kanjis]);

  function handleChange(event) {
    setSuffix({ ...suffix, [event.target.name]: event.target.value });
    setModified(true);
  }

  function formIsValid() {
    const _errors = {};
    if (!suffix.kanjis) _errors.kanjis = "Kanjis of the suffix is required";
    if (!suffix.pronunciations)
      _errors.pronunciations = "Pronunciation is required";
    if (!suffix.use) _errors.use = "Use is required";
    if (!suffix.summary) _errors.summary = "Summary is required";
    setErrors(_errors);
    // form is valid if the erros object has no properties
    return Object.keys(_errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setModified(false);
    suffixActions.saveSuffix(suffix).then(() => {
      props.history.push("/suffixs");
      toast.success("Suffix saved.");
    });
  }

  function handleAddPronunciation(event) {
    event.preventDefault();
    let pronunciations = suffix.pronunciations;
    pronunciations.push({
      id: null,
      pronunciationNumber: newPronunciationNumber(suffix.pronunciations),
      pronunciation: "",
      version: 0,
    });
    setSuffix({
      ...suffix,
      pronunciations: pronunciations,
    });
  }

  function handlePronunciationChange(event, index) {
    event.preventDefault();
    let newPronunciations = suffix.pronunciations;
    newPronunciations[index].pronunciation = event.target.value;
    setSuffix({ ...suffix, pronunciations: newPronunciations });
    setModified(true);
  }

  function handleDeletePronunciation(event, index) {
    event.preventDefault();
    let newPronunciations = suffix.pronunciations;
    newPronunciations.splice(index, 1);
    setSuffix({ ...suffix, pronunciations: newPronunciations });
    setModified(true);
  }

  const onMiddlePointClick = (event, index) => {
    event.preventDefault();
    let input = document.getElementById("pronunciation" + index);
    input.value = input.value + event.target.innerText;
    let newPronunciations = suffix.pronunciations;
    newPronunciations[index].pronunciation =
      newPronunciations[index].pronunciation + event.target.innerText;
    setSuffix({
      ...suffix,
      pronunciations: newPronunciations,
    });
  };

  const handleTranslateClick = (event, index) => {
    event.preventDefault();
    let input = document.getElementById("pronunciation" + index);
    const newValue = translateRomajiToKana(input.value);
    input.value = newValue;
    let newPronunciations = suffix.pronunciations;
    newPronunciations[index].pronunciation = newValue;
    setSuffix({
      ...suffix,
      pronunciations: newPronunciations,
    });
  };

  return (
    <>
      <h2>Manage Suffix</h2>
      <Prompt when={modified} message="Are you sure you want to leave ?" />
      <SuffixForm
        errors={errors}
        suffix={suffix}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onMiddlePointClick={onMiddlePointClick}
        onTranslateClick={handleTranslateClick}
        addPronunciation={handleAddPronunciation}
        onPronunciationChange={handlePronunciationChange}
        deletePronunciation={handleDeletePronunciation}
      />
    </>
  );
};

export default ManageSuffixPage;
