import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  loadIAdjectives,
  saveIAdjective,
} from "../../redux/actions/iAdjectiveActions";
import PropTypes from "prop-types";
import Spinner from "../common/spinner/Spinner";
import IAdjectiveForm from "./IAdjectiveForm";
import { toast } from "react-toastify";
import { Prompt } from "react-router-dom";
import { translateRomajiToKana } from "../common/TranslateRomajiToKana";
import {
  newMeaningNumber,
  newPronunciationNumber,
} from "../common/meaningUtils";

const newIAdjective = {
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

const ManageIAdjectivePage = ({
  iAdjectives,
  loadIAdjectives,
  saveIAdjective,
  history,
  ...props
}) => {
  const [modified, setModified] = useState(false);
  const [errors, setErrors] = useState({});
  const [iAdjective, setIAdjective] = useState({ ...props.iAdjective });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (iAdjectives.length === 0) {
      loadIAdjectives().catch((error) => {
        alert("Loading iAdjectives failed" + error);
      });
    } else {
      setIAdjective({ ...props.iAdjective });
    }
  }, [props.iAdjective]);

  function handleChange(event) {
    const { name, value } = event.target;
    setIAdjective((prevIAdjective) => ({
      ...prevIAdjective,
      [name]: value,
    }));
    setModified(true);
  }

  function formIsValid() {
    const _errors = {};
    if (!iAdjective.kanjis)
      _errors.kanjis = "Kanjis of the iAdjective is required";
    setErrors(_errors);
    // form is valid if the erros object has no properties
    return Object.keys(_errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setModified(false);
    setSaving(true);
    saveIAdjective(iAdjective)
      .then(() => {
        toast.success("I-Adjective saved.");
        history.push("/iAdjectives");
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
      meaningNumber: newMeaningNumber(iAdjective.meanings),
      meaning: "",
      version: 0,
    };
    setIAdjective({
      ...iAdjective,
      meanings: [...iAdjective.meanings, newMeaning],
    });
    setModified(true);
  }

  function handleMeaningChange(event, index) {
    event.preventDefault();
    const newMeaning = {
      id: iAdjective.meanings[index].id,
      meaningNumber: iAdjective.meanings[index].meaningNumber,
      meaning: event.target.value,
      version: iAdjective.meanings[index].version,
    };
    setIAdjective({
      ...iAdjective,
      meanings: iAdjective.meanings.map((meaning) => {
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
    const meanToDelete = iAdjective.meanings[index];
    setIAdjective({
      ...iAdjective,
      meanings: iAdjective.meanings.filter((meaning) => {
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
      pronunciationNumber: newPronunciationNumber(iAdjective.pronunciations),
      pronunciation: "",
      version: 0,
    };
    setIAdjective({
      ...iAdjective,
      pronunciations: [...iAdjective.pronunciations, newPronunciation],
    });
    setModified(true);
  }

  function handlePronunciationChange(event, index) {
    event.preventDefault();
    const newPronunciation = {
      id: iAdjective.pronunciations[index].id,
      pronunciationNumber: iAdjective.pronunciations[index].pronunciationNumber,
      pronunciation: event.target.value,
      version: iAdjective.pronunciations[index].version,
    };
    setIAdjective({
      ...iAdjective,
      pronunciations: iAdjective.pronunciations.map((pronunciation) => {
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
    const proToDelete = iAdjective.pronunciations[index];
    setIAdjective({
      ...iAdjective,
      pronunciations: iAdjective.pronunciations.filter((pronunciation) => {
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
      id: iAdjective.pronunciations[index].id,
      pronunciationNumber: iAdjective.pronunciations[index].pronunciationNumber,
      pronunciation: input.value,
      version: iAdjective.pronunciations[index].version,
    };
    setIAdjective({
      ...iAdjective,
      pronunciations: iAdjective.pronunciations.map((pronunciation) => {
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
      id: iAdjective.pronunciations[index].id,
      pronunciationNumber: iAdjective.pronunciations[index].pronunciationNumber,
      pronunciation: input.value,
      version: iAdjective.pronunciations[index].version,
    };
    setIAdjective({
      ...iAdjective,
      pronunciations: iAdjective.pronunciations.map((pronunciation) => {
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
      {iAdjectives.length === 0 ? (
        <Spinner />
      ) : (
        <>
          <Prompt when={modified} message="Are you sure you want to leave ?" />
          <IAdjectiveForm
            errors={errors}
            iAdjective={iAdjective}
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

ManageIAdjectivePage.propTypes = {
  iAdjective: PropTypes.object.isRequired,
  iAdjectives: PropTypes.array.isRequired,
  loadIAdjectives: PropTypes.func.isRequired,
  saveIAdjective: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export function getIAdjectiveByKanjis(iAdjectives, kanjis) {
  return iAdjectives.find((iAdjective) => iAdjective.kanjis === kanjis) || null;
}

function mapStateToProps(state, ownProps) {
  const kanjis = ownProps.match.params.kanjis;
  const iAdjective =
    kanjis && state.iAdjectives.length > 0
      ? getIAdjectiveByKanjis(state.iAdjectives, kanjis)
      : newIAdjective;
  return {
    iAdjective,
    iAdjectives: state.iAdjectives,
  };
}

const mapDispatchToProps = {
  loadIAdjectives,
  saveIAdjective,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageIAdjectivePage);
