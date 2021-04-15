import React, { useState, useEffect } from "react";
import CounterForm from "./CounterForm";
import { toast } from "react-toastify";
import counterStore from "../../stores/counterStore";
import { Prompt } from "react-router-dom";
import * as counterActions from "../../actions/counterActions";
import { translateRomajiToKana } from "../common/TranslateRomajiToKana";
import { newPronunciationNumber } from "../common/meaningUtils";

const ManageCounterPage = (props) => {
  const [modified, setModified] = useState(false);
  const [errors, setErrors] = useState({});
  const [counter, setCounter] = useState({
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
    numberOfUse: null,
    version: null,
  });

  useEffect(() => {
    const kanjis = props.match.params.kanjis; // from the path /counters/:counter
    if (kanjis) {
      // on récupère le counter du store et on le transforme pour qu'il corresponde au formulaire
      const counterForm = counterStore.getCounterByKanjis(kanjis);
      setCounter(counterForm);
    }
  }, [props.match.params.kanjis]);

  function handleChange(event) {
    setCounter({ ...counter, [event.target.name]: event.target.value });
    setModified(true);
  }

  function formIsValid() {
    const _errors = {};
    if (!counter.kanjis) _errors.kanjis = "Kanjis of the counter is required";
    if (!counter.use) _errors.use = "Use is required";
    if (!counter.summary) _errors.summary = "Summary is required";
    setErrors(_errors);
    // form is valid if the erros object has no properties
    return Object.keys(_errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setModified(false);
    counterActions.saveCounter(counter).then(() => {
      props.history.push("/counters");
      toast.success("Counter saved.");
    });
  }

  function handleAddPronunciation(event) {
    event.preventDefault();
    let pronunciations = counter.pronunciations;
    pronunciations.push({
      id: null,
      pronunciationNumber: newPronunciationNumber(counter.pronunciations),
      pronunciation: "",
      version: 0,
    });
    setCounter({
      ...counter,
      pronunciations: pronunciations,
    });
  }

  function handlePronunciationChange(event, index) {
    event.preventDefault();
    let newPronunciations = counter.pronunciations;
    newPronunciations[index].pronunciation = event.target.value;
    setCounter({ ...counter, pronunciations: newPronunciations });
    setModified(true);
  }

  function handleDeletePronunciation(event, index) {
    event.preventDefault();
    let newPronunciations = counter.pronunciations;
    newPronunciations.splice(index, 1);
    setCounter({ ...counter, pronunciations: newPronunciations });
    setModified(true);
  }

  const onMiddlePointClick = (event, index) => {
    event.preventDefault();
    let input = document.getElementById("pronunciation" + index);
    input.value = input.value + event.target.innerText;
    let newPronunciations = counter.pronunciations;
    newPronunciations[index].pronunciation =
      newPronunciations[index].pronunciation + event.target.innerText;
    setCounter({
      ...counter,
      pronunciations: newPronunciations,
    });
  };

  const handleTranslateClick = (event, index) => {
    event.preventDefault();
    let input = document.getElementById("pronunciation" + index);
    const newValue = translateRomajiToKana(input.value);
    input.value = newValue;
    let newPronunciations = counter.pronunciations;
    newPronunciations[index].pronunciation = newValue;
    setCounter({
      ...counter,
      pronunciations: newPronunciations,
    });
  };

  return (
    <>
      <h2>Manage Counter</h2>
      <Prompt when={modified} message="Are you sure you want to leave ?" />
      <CounterForm
        errors={errors}
        counter={counter}
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

export default ManageCounterPage;
