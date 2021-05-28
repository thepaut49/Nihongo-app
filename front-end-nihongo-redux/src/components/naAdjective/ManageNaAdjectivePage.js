import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  loadNaAdjectives,
  saveNaAdjective,
} from "../../redux/actions/naAdjectiveActions";
import PropTypes from "prop-types";
import Spinner from "../common/spinner/Spinner";
import NaAdjectiveForm from "./NaAdjectiveForm";
import { toast } from "react-toastify";
import { Prompt } from "react-router-dom";
import { translateRomajiToKana } from "../common/TranslateRomajiToKana";
import {
  newMeaningNumber,
  newPronunciationNumber,
} from "../common/meaningUtils";

const newNaAdjective = {
  id: null,
  kanjis: "",
  pronunciations: [
    {
      id: null,
      pronunciationNumber: 0,
      pronunciation: "",
      version: null,
    },
  ],
  meanings: [
    {
      id: null,
      meaningNumber: 0,
      meaning: "",
      version: null,
    },
  ],
  numberOfUse: null,
  version: null,
};

const ManageNaAdjectivePage = ({
  naAdjectives,
  loadNaAdjectives,
  saveNaAdjective,
  history,
  ...props
}) => {
  const [modified, setModified] = useState(false);
  const [errors, setErrors] = useState({});
  const [naAdjective, setNaAdjective] = useState({ ...props.naAdjective });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (naAdjectives.length === 0) {
      loadNaAdjectives().catch((error) => {
        alert("Loading naAdjectives failed" + error);
      });
    } else {
      setNaAdjective({ ...props.naAdjective });
    }
  }, [props.naAdjective]);

  function handleChange(event) {
    const { name, value } = event.target;
    setNaAdjective((prevNaAdjective) => ({
      ...prevNaAdjective,
      [name]: value,
    }));
    setModified(true);
  }

  function formIsValid() {
    const _errors = {};
    if (!naAdjective.kanjis)
      _errors.kanjis = "Kanjis of the naAdjective is required";
    setErrors(_errors);
    // form is valid if the erros object has no properties
    return Object.keys(_errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setModified(false);
    setSaving(true);
    saveNaAdjective(naAdjective)
      .then(() => {
        toast.success("Na-Adjective saved.");
        history.push("/naAdjectives");
      })
      .catch((error) => {
        setSaving(false);
        setErrors({ onSubmit: error.message });
      });
  }

  function handleAddMeaning(event) {
    event.preventDefault();
    const newMeaning = {
      id: null,
      meaningNumber: newMeaningNumber(naAdjective.meanings),
      meaning: "",
      version: 0,
    };
    setNaAdjective({
      ...naAdjective,
      meanings: [...naAdjective.meanings, newMeaning],
    });
    setModified(true);
  }

  function handleMeaningChange(event, index) {
    event.preventDefault();
    const newMeaning = {
      id: naAdjective.meanings[index].id,
      meaningNumber: naAdjective.meanings[index].meaningNumber,
      meaning: event.target.value,
      version: naAdjective.meanings[index].version,
    };
    setNaAdjective({
      ...naAdjective,
      meanings: naAdjective.meanings.map((meaning) => {
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
    const meanToDelete = naAdjective.meanings[index];
    setNaAdjective({
      ...naAdjective,
      meanings: naAdjective.meanings.filter((meaning) => {
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
      pronunciationNumber: newPronunciationNumber(naAdjective.pronunciations),
      pronunciation: "",
      version: 0,
    };
    setNaAdjective({
      ...naAdjective,
      pronunciations: [...naAdjective.pronunciations, newPronunciation],
    });
    setModified(true);
  }

  function handlePronunciationChange(event, index) {
    event.preventDefault();
    const newPronunciation = {
      id: naAdjective.pronunciations[index].id,
      pronunciationNumber:
        naAdjective.pronunciations[index].pronunciationNumber,
      pronunciation: event.target.value,
      version: naAdjective.pronunciations[index].version,
    };
    setNaAdjective({
      ...naAdjective,
      pronunciations: naAdjective.pronunciations.map((pronunciation) => {
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
    const proToDelete = naAdjective.pronunciations[index];
    setNaAdjective({
      ...naAdjective,
      pronunciations: naAdjective.pronunciations.filter((pronunciation) => {
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
      id: naAdjective.pronunciations[index].id,
      pronunciationNumber:
        naAdjective.pronunciations[index].pronunciationNumber,
      pronunciation: input.value,
      version: naAdjective.pronunciations[index].version,
    };
    setNaAdjective({
      ...naAdjective,
      pronunciations: naAdjective.pronunciations.map((pronunciation) => {
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
      id: naAdjective.pronunciations[index].id,
      pronunciationNumber:
        naAdjective.pronunciations[index].pronunciationNumber,
      pronunciation: input.value,
      version: naAdjective.pronunciations[index].version,
    };
    setNaAdjective({
      ...naAdjective,
      pronunciations: naAdjective.pronunciations.map((pronunciation) => {
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
      {naAdjectives.length === 0 ? (
        <Spinner />
      ) : (
        <>
          <Prompt when={modified} message="Are you sure you want to leave ?" />
          <NaAdjectiveForm
            errors={errors}
            naAdjective={naAdjective}
            onChange={handleChange}
            onSubmit={handleSubmit}
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

ManageNaAdjectivePage.propTypes = {
  naAdjective: PropTypes.object.isRequired,
  naAdjectives: PropTypes.array.isRequired,
  loadNaAdjectives: PropTypes.func.isRequired,
  saveNaAdjective: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export function getNaAdjectiveByKanjis(naAdjectives, kanjis) {
  return (
    naAdjectives.find((naAdjective) => naAdjective.kanjis === kanjis) || null
  );
}

function mapStateToProps(state, ownProps) {
  const kanjis = ownProps.match.params.kanjis;
  const naAdjective =
    kanjis && state.naAdjectives.length > 0
      ? getNaAdjectiveByKanjis(state.naAdjectives, kanjis)
      : newNaAdjective;
  return {
    naAdjective,
    naAdjectives: state.naAdjectives,
  };
}

const mapDispatchToProps = {
  loadNaAdjectives,
  saveNaAdjective,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageNaAdjectivePage);
