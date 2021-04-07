import React, { useState, useEffect } from "react";
import counterStore from "../../stores/counterStore";
import "./CountersPage.css";
import CounterList from "./CounterList";
import { Link } from "react-router-dom";
import {
  loadCounters,
  deleteCounter,
  filterCounters,
} from "../../actions/counterActions";
import CounterCriteriaForm from "./CounterCriteriaForm";
import { translateRomajiToKana } from "../common/TranslateRomajiToKana";

function CountersPage(props) {
  const [counters, setCounters] = useState(counterStore.getCounters());
  const [counterCriteria, setCounterCriteria] = useState({
    kanjisCriteria: "",
    pronunciationCriteria: "",
    useCriteria: "",
  });

  useEffect(() => {
    counterStore.addChangeListener(onChange);
    if (
      counterStore.getCounters().length === 0 &&
      !counterCriteria.kanjisCriteria &&
      !counterCriteria.pronunciationCriteria &&
      !counterCriteria.useCriteria
    )
      loadCounters();
    return function () {
      counterStore.removeChangeListener(onChange); //cleanup on unmount
    };
  }, [counters.length, counterCriteria]);
  // le second arg [] empeche de relancer en boucle l'appel à l'api

  function onChange() {
    setCounters(counterStore.getCounters());
  }

  // fonction for criteria form

  function handleChange(event) {
    let newValue = event.target.value;
    if (event.target.name === "pronunciationCriteria") {
      newValue = translateRomajiToKana(newValue);
      let input = document.getElementById("pronunciationCriteria");
      input.value = newValue;
    }
    setCounterCriteria({
      ...counterCriteria,
      [event.target.name]: newValue,
    });
  }

  function handleReset(event) {
    // ne marche pas
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
    Array.from(document.querySelectorAll("textarea")).forEach(
      (textarea) => (textarea.value = "")
    );
    setCounterCriteria({
      kanjisCriteria: "",
      pronunciationCriteria: "",
      useCriteria: "",
    });
  }

  function handleClick(event) {
    let input = document.getElementById("pronunciationCriteria");
    input.value = input.value + event.target.innerText;
    setCounterCriteria({
      ...counterCriteria,
      pronunciationCriteria:
        counterCriteria.pronunciationCriteria + event.target.innerText,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const _counter = {
      kanjis: counterCriteria.kanjisCriteria,
      pronunciation: counterCriteria.pronunciationCriteria,
      use: counterCriteria.useCriteria,
    };
    filterCounters(_counter);
  }

  return (
    <div className="countersPage">
      <h2>I-Adjectives</h2>
      <CounterCriteriaForm
        counterCriteria={counterCriteria}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onClick={handleClick}
        onReset={handleReset}
      />
      <Link className="btn btn-primary" to="/counter/create">
        Add Counter
      </Link>
      <CounterList counters={counters} deleteCounter={deleteCounter} />
    </div>
  );
}

export default CountersPage;
