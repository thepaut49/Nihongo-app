import React, { useState, useEffect } from "react";
import SentenceForm from "./SentenceForm";
import { toast } from "react-toastify";
import { Prompt } from "react-router-dom";
import { translateRomajiToKana } from "../common/TranslateRomajiToKana";
import { connect } from "react-redux";
import {
  loadSentences,
  saveSentence,
} from "../../redux/actions/sentenceActions";
import PropTypes from "prop-types";
import Spinner from "../common/spinner/Spinner";

const newSentence = {
  id: null,
  kanjis: "",
  pronunciation: "",
  meaning: "",
  topic: "",
  version: null,
};

const ManageSentencePage = ({
  sentences,
  loadSentences,
  saveSentence,
  history,
  ...props
}) => {
  const [modified, setModified] = useState(false);
  const [errors, setErrors] = useState({});
  const [sentence, setSentence] = useState({ ...props.sentence });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (sentences.length === 0) {
      loadSentences().catch((error) => {
        alert("Loading sentences failed" + error);
      });
    } else {
      setSentence({ ...props.sentence });
    }
  }, [props.sentence]);

  function handleChange(event) {
    setSentence({ ...sentence, [event.target.name]: event.target.value });
    setModified(true);
  }

  function formIsValid() {
    const _errors = {};
    if (!sentence.kanjis) _errors.kanjis = "Kanjis of the sentence is required";
    if (!sentence.pronunciation)
      _errors.pronunciation = "Pronunciation is required";
    if (!sentence.meaning) _errors.meaning = "Meaning is required";

    setErrors(_errors);
    // form is valid if the erros object has no properties
    return Object.keys(_errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setModified(false);
    setSaving(true);
    saveSentence(sentence)
      .then(() => {
        toast.success("Sentence saved.");
        history.push("/sentences");
      })
      .catch((error) => {
        setSaving(false);
        setErrors({ onSubmit: error.message });
      });
  }

  const onMiddlePointClick = (event) => {
    event.preventDefault();
    let input = document.getElementById("pronunciation");
    input.value = input.value + event.target.innerText;
    setSentence({
      ...sentence,
      pronunciation: sentence.pronunciation + event.target.innerText,
    });
  };

  const handleTranslateClick = (event) => {
    event.preventDefault();
    let input = document.getElementById("pronunciation");
    const newValue = translateRomajiToKana(input.value);
    input.value = newValue;
    setSentence({
      ...sentence,
      pronunciation: newValue,
    });
  };

  return (
    <>
      {sentences.length === 0 ? (
        <Spinner />
      ) : (
        <>
          <Prompt when={modified} message="Are you sure you want to leave ?" />
          <SentenceForm
            errors={errors}
            sentence={sentence}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onMiddlePointClick={onMiddlePointClick}
            onTranslateClick={handleTranslateClick}
            saving={saving}
          />
        </>
      )}
    </>
  );
};

ManageSentencePage.propTypes = {
  sentence: PropTypes.object.isRequired,
  sentences: PropTypes.array.isRequired,
  loadSentences: PropTypes.func.isRequired,
  saveSentence: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export function getSentenceByKanjis(sentences, kanjis) {
  return sentences.find((sentence) => sentence.kanjis === kanjis) || null;
}

function mapStateToProps(state, ownProps) {
  const kanjis = ownProps.match.params.kanjis;
  const sentence =
    kanjis && state.sentences.length > 0
      ? getSentenceByKanjis(state.sentences, kanjis)
      : newSentence;
  return {
    sentence,
    sentences: state.sentences,
  };
}

const mapDispatchToProps = {
  loadSentences,
  saveSentence,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSentencePage);
