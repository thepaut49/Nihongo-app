import React, { useState, useEffect } from "react";
import "./SentencesPage.css";
import SentenceList from "./SentenceList";
import { Link } from "react-router-dom";
import SentenceCriteriaForm from "./SentenceCriteriaForm";
import { translateRomajiToKana } from "../common/TranslateRomajiToKana";
import { connect } from "react-redux";
import * as sentenceActions from "../../redux/actions/sentenceActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import Spinner from "../common/spinner/Spinner";
import { toast } from "react-toastify";
import { isConnected } from "../../utils/userUtils";
import * as sentenceListActions from "../../redux/actions/sentenceListActions";

function SentencesPage(props) {
  const [sentenceCriteria, setSentenceCriteria] = useState({
    kanjisCriteria: "",
    pronunciationCriteria: "",
    meaningCriteria: "",
    topicCriteria: "",
  });

  useEffect(() => {
    const { sentences, actions } = props;
    if (sentences.length === 0) {
      actions.loadSentences().catch((error) => {
        alert("Loading iadjectives failed" + error);
      });
    }
  }, []);
  // le second arg [] empeche de relancer en boucle l'appel à l'api
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
    event.preventDefault();
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
    props.actions.loadSentences().catch((error) => {
      alert("Loading sentences failed" + error);
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
    props.actions.filterSentences(_sentence).catch((error) => {
      alert("Filtering iadjective failed" + error);
    });
  }

  const handleDeleteSentence = async (sentence) => {
    toast.success("Sentence deleted");
    try {
      await props.actions.deleteSentence(sentence);
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  };

  return (
    <div className="sentencesPage">
      <h2>Sentences</h2>
      {props.loading ? (
        <Spinner />
      ) : (
        <>
          <SentenceCriteriaForm
            sentenceCriteria={sentenceCriteria}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onClick={handleClick}
            onReset={handleReset}
          />
          {isConnected() && (
            <Link className="btn btn-primary" to="/sentence/create">
              Add Sentence
            </Link>
          )}

          <SentenceList
            sentences={props.sentencesList}
            deleteSentence={handleDeleteSentence}
          />
        </>
      )}
    </div>
  );
}
SentencesPage.propTypes = {
  sentences: PropTypes.array.isRequired,
  sentencesList: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    sentences: state.sentences.map((sentence) => {
      return {
        ...sentence,
      };
    }),
    sentencesList: state.sentencesList.map((sentence) => {
      return {
        ...sentence,
      };
    }),
    loading: state.apiCallsInProgress > 0,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadSentences: bindActionCreators(
        sentenceActions.loadSentences,
        dispatch
      ),
      deleteSentence: bindActionCreators(
        sentenceActions.deleteSentence,
        dispatch
      ),
      filterSentences: bindActionCreators(
        sentenceListActions.filterSentences,
        dispatch
      ),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SentencesPage);
