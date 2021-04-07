import React, { useState, useEffect } from "react";
import CounterForm from "./CounterForm";
import { toast } from "react-toastify";
import counterStore from "../../stores/counterStore";
import { Prompt } from "react-router-dom";
import * as counterActions from "../../actions/counterActions";
import { translateRomajiToKana } from "../common/TranslateRomajiToKana";

const ManageCounterPage = (props) => {
  const [modified, setModified] = useState(false);
  const [errors, setErrors] = useState({});
  const [counter, setCounter] = useState({
    id: null,
    kanjis: "",
    pronunciation: "",
    use: "",
    summary: "",
    numberOfUse: null,
    version: null,
  });

  const onMiddlePointClick = (event) => {
    event.preventDefault();
    let input = document.getElementById("pronunciation");
    input.value = input.value + event.target.innerText;
    setCounter({
      ...counter,
      pronunciation: counter.pronunciation + event.target.innerText,
    });
  };

  const handleTranslateClick = (event) => {
    event.preventDefault();
    let input = document.getElementById("pronunciation");
    const newValue = translateRomajiToKana(input.value);
    input.value = newValue;
    setCounter({
      ...counter,
      pronunciation: newValue,
    });
  };

  useEffect(() => {
    const kanjis = props.match.params.kanjis; // from the path /counters/:counter
    if (kanjis) {
      // on récupère le counter du store et on le transforme pour qu'il corresponde au formulaire
      let tempCounter = counterStore.getCounterByKanjis(kanjis);
      let newPronunciation = tempCounter.pronunciation[0];
      if (tempCounter.pronunciation.length > 1) {
        for (let i = 1; i < tempCounter.pronunciation.length; i++) {
          newPronunciation =
            newPronunciation + "・" + tempCounter.pronunciation[i];
        }
      }
      const counterForm = {
        ...tempCounter,
        pronunciation: newPronunciation,
      };
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
    if (!counter.pronunciation)
      _errors.pronunciation = "Pronunciation is required";
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
    // on transforme les chaine de caractères en liste de chaines
    let newPronunciation = [];
    if (counter.pronunciation.includes("・")) {
      newPronunciation = counter.pronunciation.split("・");
      for (let i = 0; i < newPronunciation.length; i++) {
        newPronunciation[i] = newPronunciation[i].replace("・", "");
      }
    } else {
      newPronunciation = [counter.pronunciation];
    }
    const savedCounter = {
      ...counter,
      pronunciation: newPronunciation,
    };
    counterActions.saveCounter(savedCounter).then(() => {
      props.history.push("/counters");
      toast.success("Counter saved.");
    });
  }

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
      />
    </>
  );
};

export default ManageCounterPage;
