import React, { useState, useEffect } from "react";
import VerbForm from "./VerbForm";
import { toast } from "react-toastify";
import { Prompt } from "react-router-dom";
import { translateRomajiToKana } from "../common/TranslateRomajiToKana";
import {
  newMeaningNumber,
  newPronunciationNumber,
} from "../common/meaningUtils";
import { connect } from "react-redux";
import { loadVerbs, saveVerb } from "../../redux/actions/verbActions";
import PropTypes from "prop-types";
import Spinner from "../common/spinner/Spinner";
import { verbConstants } from "../common/verbConstants";

const newVerb = {
  id: null,
  neutralForm: "",
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
  groupe: verbConstants.ICHIDAN_GROUPE,
  numberOfUse: null,
  version: null,
};

const ManageVerbPage = ({ verbs, loadVerbs, saveVerb, history, ...props }) => {
  const [modified, setModified] = useState(false);
  const [errors, setErrors] = useState({});
  const [verb, setVerb] = useState({ ...props.verb });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (verbs.length === 0) {
      loadVerbs().catch((error) => {
        alert("Loading verbs failed" + error);
      });
    } else {
      setVerb({ ...props.verb });
    }
  }, [props.verb]);

  function handleChange(event) {
    const { name, value } = event.target;
    setVerb((prevVerb) => ({
      ...prevVerb,
      [name]: value,
    }));
    setModified(true);
  }

  function formIsValid() {
    const _errors = {};
    if (!verb.neutralForm)
      _errors.neutralForm = "Neutral form of the verb is required";
    if (!verb.groupe) _errors.groupe = "Group is required";

    setErrors(_errors);
    // form is valid if the erros object has no properties
    return Object.keys(_errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setModified(false);
    setSaving(true);
    saveVerb(verb)
      .then(() => {
        toast.success("Verb saved.");
        history.push("/verbs");
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
      meaningNumber: newMeaningNumber(verb.meanings),
      meaning: "",
      version: 0,
    };
    setVerb({
      ...verb,
      meanings: [...verb.meanings, newMeaning],
    });
    setModified(true);
  }

  function handleMeaningChange(event, index) {
    event.preventDefault();
    const newMeaning = {
      id: verb.meanings[index].id,
      meaningNumber: verb.meanings[index].meaningNumber,
      meaning: event.target.value,
      version: verb.meanings[index].version,
    };
    setVerb({
      ...verb,
      meanings: verb.meanings.map((meaning) => {
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
    const meanToDelete = verb.meanings[index];
    setVerb({
      ...verb,
      meanings: verb.meanings.filter((meaning) => {
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
      pronunciationNumber: newPronunciationNumber(verb.pronunciations),
      pronunciation: "",
      version: 0,
    };
    setVerb({
      ...verb,
      pronunciations: [...verb.pronunciations, newPronunciation],
    });
    setModified(true);
  }

  function handlePronunciationChange(event, index) {
    event.preventDefault();
    const newPronunciation = {
      id: verb.pronunciations[index].id,
      pronunciationNumber: verb.pronunciations[index].pronunciationNumber,
      pronunciation: event.target.value,
      version: verb.pronunciations[index].version,
    };
    setVerb({
      ...verb,
      pronunciations: verb.pronunciations.map((pronunciation) => {
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
    const proToDelete = verb.pronunciations[index];
    setVerb({
      ...verb,
      pronunciations: verb.pronunciations.filter((pronunciation) => {
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
      id: verb.pronunciations[index].id,
      pronunciationNumber: verb.pronunciations[index].pronunciationNumber,
      pronunciation: input.value,
      version: verb.pronunciations[index].version,
    };
    setVerb({
      ...verb,
      pronunciations: verb.pronunciations.map((pronunciation) => {
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
      id: verb.pronunciations[index].id,
      pronunciationNumber: verb.pronunciations[index].pronunciationNumber,
      pronunciation: input.value,
      version: verb.pronunciations[index].version,
    };
    setVerb({
      ...verb,
      pronunciations: verb.pronunciations.map((pronunciation) => {
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
      {verbs.length === 0 ? (
        <Spinner />
      ) : (
        <>
          <Prompt when={modified} message="Are you sure you want to leave ?" />
          <VerbForm
            errors={errors}
            verb={verb}
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

ManageVerbPage.propTypes = {
  verb: PropTypes.object.isRequired,
  verbs: PropTypes.array.isRequired,
  loadVerbs: PropTypes.func.isRequired,
  saveVerb: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export function getVerbByNeutralForm(verbs, neutralForm) {
  return verbs.find((verb) => verb.neutralForm === neutralForm) || null;
}

function mapStateToProps(state, ownProps) {
  const neutralForm = ownProps.match.params.neutralForm;
  const verb =
    neutralForm && state.verbs.length > 0
      ? getVerbByNeutralForm(state.verbs, neutralForm)
      : newVerb;
  return {
    verb,
    verbs: state.verbs,
  };
}

const mapDispatchToProps = {
  loadVerbs,
  saveVerb,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageVerbPage);
