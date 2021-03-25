import React, { useState, useEffect } from "react";
import sentenceStore from "../../stores/sentenceStore";
import "./SentencesPage.css";
import SentenceList from "./SentenceList";
import { Link } from "react-router-dom";
import {
  loadSentences,
  deleteSentence,
  filterSentences,
} from "../../actions/sentenceActions";
import SentenceCriteriaForm from "./SentenceCriteriaForm";
import { translateRomajiToKana } from "../common/TranslateRomajiToKana";

function SentencesPage(props) {
  const [sentences, setSentences] = useState(sentenceStore.getSentences());
  const [sentenceCriteria, setSentenceCriteria] = useState({
    kanjisCriteria: "",
    pronunciationCriteria: "",
    meaningCriteria: "",
    topicCriteria: "",
  });

  useEffect(() => {
    sentenceStore.addChangeListener(onChange);
    if (
      sentenceStore.getSentences().length === 0 &&
      !sentenceCriteria.kanjisCriteria &&
      !sentenceCriteria.pronunciationCriteria &&
      !sentenceCriteria.meaningCriteria &&
      !sentenceCriteria.topicCriteria
    )
      loadSentences();
    return function () {
      sentenceStore.removeChangeListener(onChange); //cleanup on unmount
    };
  }, [sentences.length, sentenceCriteria]);
  // le second arg [] empeche de relancer en boucle l'appel à l'api

  function onChange() {
    setSentences(sentenceStore.getSentences());
  }

  // fonction for criteria form

  function handleChange(event) {
    let newValue = event.target.value;
    if (event.target.name === "pronunciationCriteria") {
      newValue = translateRomajiToKana(newValue);
      let input = document.getElementById("pronunciationCriteria");
      input.value = newValue;
    }
    setSentenceCriteria({
      ...sentenceCriteria,
      [event.target.name]: newValue,
    });
  }

  function handleReset(event) {
    // ne marche pas
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );

    Array.from(document.querySelectorAll("select")).forEach(
      (select) => (select.value = "")
    );
    setSentenceCriteria({
      kanjisCriteria: "",
      pronunciationCriteria: "",
      meaningCriteria: "",
      topicCriteria: "",
    });
  }

  function handleClick(event) {
    let input = document.getElementById("pronunciationCriteria");
    input.value = input.value + event.target.innerText;
    setSentenceCriteria({
      ...sentenceCriteria,
      pronunciationCriteria:
        sentenceCriteria.pronunciationCriteria + event.target.innerText,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const _sentence = {
      kanjis: sentenceCriteria.kanjisCriteria,
      pronunciation: sentenceCriteria.pronunciationCriteria,
      meaning: sentenceCriteria.meaningCriteria,
      topic: sentenceCriteria.topicCriteria,
    };
    filterSentences(_sentence);
  }

  return (
    <div className="sentencesPage">
      <h2>Sentences</h2>
      <SentenceCriteriaForm
        sentenceCriteria={sentenceCriteria}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onClick={handleClick}
        onReset={handleReset}
      />
      <Link className="btn btn-primary" to="/sentence/create">
        Add Sentence
      </Link>
      <SentenceList sentences={sentences} deleteSentence={deleteSentence} />
    </div>
  );
}

export default SentencesPage;
