import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as wordActions from "../../redux/actions/wordActions";
import "./WordsPage.css";
import WordList from "./WordList";
import { Link } from "react-router-dom";
import WordCriteriaForm from "./WordCriteriaForm";
import { translateRomajiToKana } from "../common/TranslateRomajiToKana";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import Spinner from "../common/spinner/Spinner";
import { toast } from "react-toastify";
import { isConnected } from "../../utils/userUtils";
import { filterWords } from "./filterWords";

function WordsPage(props) {
  const [wordCriteria, setWordCriteria] = useState({
    kanjisCriteria: "",
    pronunciationCriteria: "",
    meaningCriteria: "",
  });
  const [wordsList, setWordsList] = useState([]);

  useEffect(() => {
    const { words, actions } = props;
    if (words.length === 0) {
      actions.loadWords().catch((error) => {
        alert("Loading words failed" + error);
      });
    }
    setWordsList(filterWords(words, wordCriteria));
  }, [wordsList.length]);
  // le second arg [] empeche de relancer en boucle l'appel à l'api

  // fonction for criteria form

  function handleChange(event) {
    let newValue = event.target.value;
    if (event.target.name === "pronunciationCriteria") {
      newValue = translateRomajiToKana(newValue);
      let input = document.getElementById("pronunciationCriteria");
      input.value = newValue;
    }
    setWordCriteria({
      ...wordCriteria,
      [event.target.name]: newValue,
    });
  }

  function handleReset(event) {
    event.preventDefault();
    // ne marche pas
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
    setWordCriteria({
      kanjisCriteria: "",
      pronunciationCriteria: "",
      meaningCriteria: "",
    });
    setWordsList(filterWords(props.words, null));
  }

  function handleClick(event) {
    let input = document.getElementById("pronunciationCriteria");
    input.value = input.value + event.target.innerText;
    setWordCriteria({
      ...wordCriteria,
      pronunciationCriteria:
        wordCriteria.pronunciationCriteria + event.target.innerText,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setWordsList(filterWords(props.words, wordCriteria));
  }

  const handleDeleteWord = async (word) => {
    toast.success("Word deleted");
    try {
      await props.actions.deleteWord(word);
      setWordsList(wordsList.filter((_word) => _word.id !== word.id));
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  };

  return (
    <div className="wordsPage">
      <h2>Words</h2>
      {props.loading ? (
        <Spinner />
      ) : (
        <>
          <WordCriteriaForm
            wordCriteria={wordCriteria}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onClick={handleClick}
            onReset={handleReset}
          />
          {isConnected() && (
            <Link className="btn btn-primary" to="/word/create">
              Add Word
            </Link>
          )}

          <WordList words={wordsList} deleteWord={handleDeleteWord} />
        </>
      )}
    </div>
  );
}

WordsPage.propTypes = {
  words: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    words: state.words.map((word) => {
      return {
        ...word,
      };
    }),
    loading: state.apiCallsInProgress > 0,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadWords: bindActionCreators(wordActions.loadWords, dispatch),
      deleteWord: bindActionCreators(wordActions.deleteWord, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WordsPage);
