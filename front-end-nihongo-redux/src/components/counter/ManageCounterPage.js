import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { loadCounters, saveCounter } from "../../redux/actions/counterActions";
import PropTypes from "prop-types";
import CounterForm from "./CounterForm";
import Spinner from "../common/spinner/Spinner";
import { toast } from "react-toastify";
import { Prompt } from "react-router-dom";
import { translateRomajiToKana } from "../common/TranslateRomajiToKana";
import { newPronunciationNumber } from "../common/meaningUtils";

const newCounter = {
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
};

const ManageCounterPage = ({
  counters,
  loadCounters,
  saveCounter,
  history,
  ...props
}) => {
  const [modified, setModified] = useState(false);
  const [errors, setErrors] = useState({});
  const [counter, setCounter] = useState({ ...props.counter });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (counters.length === 0) {
      loadCounters().catch((error) => {
        alert("Loading counters failed" + error);
      });
    } else {
      setCounter({ ...props.counter });
    }
  }, [props.counter]);

  function handleChange(event) {
    const { name, value } = event.target;
    setCounter((prevCounter) => ({
      ...prevCounter,
      [name]: value,
    }));
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
    setSaving(true);
    saveCounter(counter)
      .then(() => {
        toast.success("Counter saved.");
        history.push("/counters");
      })
      .catch((error) => {
        setSaving(false);
        setErrors({ onSubmit: error.message });
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
      {counters.length === 0 ? (
        <Spinner />
      ) : (
        <>
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
            saving={saving}
          />
        </>
      )}
    </>
  );
};

ManageCounterPage.propTypes = {
  counter: PropTypes.object.isRequired,
  counters: PropTypes.array.isRequired,
  loadCounters: PropTypes.func.isRequired,
  saveCounter: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export function getCounterByKanjis(counters, kanjis) {
  return counters.find((counter) => counter.kanjis === kanjis) || null;
}

function mapStateToProps(state, ownProps) {
  const kanjis = ownProps.match.params.kanjis;
  const counter =
    kanjis && state.counters.length > 0
      ? getCounterByKanjis(state.counters, kanjis)
      : newCounter;
  return {
    counter,
    counters: state.counters,
  };
}

const mapDispatchToProps = {
  loadCounters,
  saveCounter,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCounterPage);
