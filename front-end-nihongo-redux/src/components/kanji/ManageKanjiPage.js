import React, { useState, useEffect } from "react";
import KanjiForm from "./KanjiForm";
import { toast } from "react-toastify";
import { radicals as radicalsList } from "../common/Radicals";
import { Prompt } from "react-router-dom";
import { translateRomajiToKana } from "../common/TranslateRomajiToKana";
import {
  newMeaningNumber,
  newPronunciationNumber,
} from "../common/meaningUtils";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/spinner/Spinner";
import { loadKanjis, saveKanji } from "../../redux/actions/kanjiActions";

const newKanji = {
  id: null,
  kanji: "",
  pronunciations: [
    {
      id: null,
      pronunciationNumber: 0,
      pronunciation: "",
      version: 0,
    },
  ],
  meanings: [
    {
      id: null,
      meaningNumber: 0,
      meaning: "",
      version: 0,
    },
  ],
  radicals: "",
  strokeNumber: 0,
  numberOfUse: null,
  version: null,
};

const ManageKanjiPage = ({
  kanjis,
  loadKanjis,
  saveKanji,
  history,
  ...props
}) => {
  const [modified, setModified] = useState(false);
  const [errors, setErrors] = useState({});
  const [kanji, setKanji] = useState({ ...props.kanji });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (kanjis.length === 0) {
      loadKanjis().catch((error) => {
        alert("Loading kanjis failed" + error);
      });
    } else {
      setKanji({ ...props.kanji });
    }
  }, [props.kanji]);

  function handleChange(event) {
    const { name, value } = event.target;
    setKanji((prevKanji) => ({
      ...prevKanji,
      [name]: name === "strokeNumber" ? parseInt(value, 10) : value,
    }));
    setModified(true);
  }

  function formIsValid() {
    const _errors = {};
    if (!kanji.kanji) _errors.kanji = "Kanji is required";
    if (kanji.radicals.length > 0) {
      for (let i = 0; i < kanji.radicals.length; i++) {
        if (radicalsList.indexOf(kanji.radicals[i]) === -1) {
          _errors.radicals = "Some of the characters are not radicals.";
          break;
        }
      }
    }

    setErrors(_errors);
    // form is valid if the erros object has no properties
    return Object.keys(_errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setModified(false);
    setSaving(true);
    saveKanji(kanji)
      .then(() => {
        toast.success("Kanji saved.");
        history.push("/kanjis");
      })
      .catch((error) => {
        setSaving(false);
        setErrors({ onSubmit: error.message });
      });
  }

  function handleClick(event) {
    event.preventDefault();
    if (kanji.radicals.indexOf(event.target.innerText) > -1)
      setKanji({
        ...kanji,
        radicals: kanji.radicals.replace(event.target.innerText, ""),
      });
    else {
      setKanji({
        ...kanji,
        radicals: kanji.radicals + event.target.innerText,
      });
    }
  }

  function handleAddMeaning(event) {
    event.preventDefault();
    let newMeanings = kanji.meanings;
    newMeanings.push({
      id: null,
      meaningNumber: newMeaningNumber(kanji.meanings),
      meaning: "",
      verison: 0,
    });
    setKanji({
      ...kanji,
      meanings: newMeanings,
    });
  }

  function handleMeaningChange(event, index) {
    event.preventDefault();
    let newMeanings = kanji.meanings;
    newMeanings[index].meaning = event.target.value;
    setKanji({ ...kanji, meanings: newMeanings });
    setModified(true);
  }

  function handleDeleteMeaning(event, index) {
    event.preventDefault();
    let newMeanings = kanji.meanings;
    newMeanings.splice(index, 1);
    setKanji({ ...kanji, meanings: newMeanings });
    setModified(true);
  }

  function handleAddPronunciation(event) {
    event.preventDefault();
    let pronunciations = kanji.pronunciations;
    pronunciations.push({
      id: null,
      pronunciationNumber: newPronunciationNumber(kanji.pronunciations),
      pronunciation: "",
      version: 0,
    });
    setKanji({
      ...kanji,
      pronunciations: pronunciations,
    });
  }

  function handlePronunciationChange(event, index) {
    event.preventDefault();
    let newPronunciations = kanji.pronunciations;
    newPronunciations[index].pronunciation = event.target.value;
    setKanji({ ...kanji, pronunciations: newPronunciations });
    setModified(true);
  }

  function handleDeletePronunciation(event, index) {
    event.preventDefault();
    let newPronunciations = kanji.pronunciations;
    newPronunciations.splice(index, 1);
    setKanji({ ...kanji, pronunciations: newPronunciations });
    setModified(true);
  }

  const onMiddlePointClick = (event, index) => {
    event.preventDefault();
    let input = document.getElementById("pronunciation" + index);
    input.value = input.value + event.target.innerText;
    let newPronunciations = kanji.pronunciations;
    newPronunciations[index].pronunciation =
      newPronunciations[index].pronunciation + event.target.innerText;
    setKanji({
      ...kanji,
      pronunciations: newPronunciations,
    });
  };

  const handleTranslateClick = (event, index) => {
    event.preventDefault();
    let input = document.getElementById("pronunciation" + index);
    const newValue = translateRomajiToKana(input.value);
    input.value = newValue;
    let newPronunciations = kanji.pronunciations;
    newPronunciations[index].pronunciation = newValue;
    setKanji({
      ...kanji,
      pronunciations: newPronunciations,
    });
  };

  return (
    <>
      {kanjis.length === 0 ? (
        <Spinner />
      ) : (
        <>
          <Prompt when={modified} message="Are you sure you want to leave ?" />
          <KanjiForm
            errors={errors}
            kanji={kanji}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onClick={handleClick}
            onMiddlePointClick={onMiddlePointClick}
            onTranslateClick={handleTranslateClick}
            addMeaning={handleAddMeaning}
            onMeaningChange={handleMeaningChange}
            deleteMeaning={handleDeleteMeaning}
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

ManageKanjiPage.propTypes = {
  kanji: PropTypes.object.isRequired,
  kanjis: PropTypes.array.isRequired,
  loadKanjis: PropTypes.func.isRequired,
  saveKanji: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export function getKanjiByKanji(kanjis, char) {
  return kanjis.find((kanji) => kanji.kanji === char) || null;
}

function mapStateToProps(state, ownProps) {
  const char = ownProps.match.params.kanji;
  const kanji =
    char && state.kanjis.length > 0
      ? getKanjiByKanji(state.kanjis, char)
      : newKanji;
  return {
    kanji,
    kanjis: state.kanjis,
  };
}

const mapDispatchToProps = {
  loadKanjis,
  saveKanji,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageKanjiPage);
