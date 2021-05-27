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
    const newMeaning = {
      id: null,
      meaningNumber: newMeaningNumber(kanji.meanings),
      meaning: "",
      version: 0,
    };
    setKanji({
      ...kanji,
      meanings: [...kanji.meanings, newMeaning],
    });
    setModified(true);
  }

  function handleMeaningChange(event, index) {
    event.preventDefault();
    const newMeaning = {
      id: kanji.meanings[index].id,
      meaningNumber: kanji.meanings[index].meaningNumber,
      meaning: event.target.value,
      version: kanji.meanings[index].version,
    };
    setKanji({
      ...kanji,
      meanings: kanji.meanings.map((meaning) => {
        if (meaning.meaningNumber === newMeaning.meaningNumber) {
          return newMeaning;
        } else {
          return meaning;
        }
      }),
    });
    setModified(true);
  }

  function handleDeleteMeaning(event, index) {
    event.preventDefault();
    const meanToDelete = kanji.meanings[index];
    setKanji({
      ...kanji,
      meanings: kanji.meanings.filter((meaning) => {
        if (meaning === meanToDelete) {
          return false;
        } else {
          return true;
        }
      }),
    });
    setModified(true);
  }

  function handleAddPronunciation(event) {
    event.preventDefault();
    const newPronunciation = {
      id: null,
      pronunciationNumber: newPronunciationNumber(kanji.pronunciations),
      pronunciation: "",
      version: 0,
    };
    setKanji({
      ...kanji,
      pronunciations: [...kanji.pronunciations, newPronunciation],
    });
    setModified(true);
  }

  function handlePronunciationChange(event, index) {
    event.preventDefault();
    const newPronunciation = {
      id: kanji.pronunciations[index].id,
      pronunciationNumber: kanji.pronunciations[index].pronunciationNumber,
      pronunciation: event.target.value,
      version: kanji.pronunciations[index].version,
    };
    setKanji({
      ...kanji,
      pronunciations: kanji.pronunciations.map((pronunciation) => {
        if (
          pronunciation.pronunciationNumber ===
          newPronunciation.pronunciationNumber
        ) {
          return newPronunciation;
        } else {
          return pronunciation;
        }
      }),
    });
    setModified(true);
  }

  function handleDeletePronunciation(event, index) {
    event.preventDefault();
    const proToDelete = kanji.pronunciations[index];
    setKanji({
      ...kanji,
      pronunciations: kanji.pronunciations.filter((pronunciation) => {
        if (pronunciation === proToDelete) {
          return false;
        } else {
          return true;
        }
      }),
    });
    setModified(true);
  }

  const onMiddlePointClick = (event, index) => {
    event.preventDefault();
    let input = document.getElementById("pronunciation" + index);
    input.value = input.value + event.target.innerText;
    const newPronunciation = {
      id: kanji.pronunciations[index].id,
      pronunciationNumber: kanji.pronunciations[index].pronunciationNumber,
      pronunciation: input.value,
      version: kanji.pronunciations[index].version,
    };
    setKanji({
      ...kanji,
      pronunciations: kanji.pronunciations.map((pronunciation) => {
        if (
          pronunciation.pronunciationNumber ===
          newPronunciation.pronunciationNumber
        ) {
          return newPronunciation;
        } else {
          return pronunciation;
        }
      }),
    });
    setModified(true);
  };

  const handleTranslateClick = (event, index) => {
    event.preventDefault();
    let input = document.getElementById("pronunciation" + index);
    const newValue = translateRomajiToKana(input.value);
    input.value = newValue;
    const newPronunciation = {
      id: kanji.pronunciations[index].id,
      pronunciationNumber: kanji.pronunciations[index].pronunciationNumber,
      pronunciation: input.value,
      version: kanji.pronunciations[index].version,
    };
    setKanji({
      ...kanji,
      pronunciations: kanji.pronunciations.map((pronunciation) => {
        if (
          pronunciation.pronunciationNumber ===
          newPronunciation.pronunciationNumber
        ) {
          return newPronunciation;
        } else {
          return pronunciation;
        }
      }),
    });
    setModified(true);
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
