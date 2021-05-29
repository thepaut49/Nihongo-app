import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { loadNames, saveName } from "../../redux/actions/nameActions";
import PropTypes from "prop-types";
import Spinner from "../common/spinner/Spinner";
import NameForm from "./NameForm";
import { toast } from "react-toastify";
import { Prompt } from "react-router-dom";
import { translateRomajiToKana } from "../common/TranslateRomajiToKana";
import {
  newMeaningNumber,
  newPronunciationNumber,
} from "../common/meaningUtils";

const newName = {
  id: null,
  kanjis: "",
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
      version: null,
    },
  ],
  numberOfUse: null,
  version: null,
};

const ManageNamePage = ({ names, loadNames, saveName, history, ...props }) => {
  const [modified, setModified] = useState(false);
  const [errors, setErrors] = useState({});
  const [name, setName] = useState({ ...props.name });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (names.length === 0) {
      loadNames().catch((error) => {
        alert("Loading names failed" + error);
      });
    } else {
      setName({ ...props.name });
    }
  }, [props.name]);

  function handleChange(event) {
    const { name, value } = event.target;
    setName((prevName) => ({
      ...prevName,
      [name]: value,
    }));
    setModified(true);
  }

  function formIsValid() {
    const _errors = {};
    if (!name.kanjis) _errors.kanjis = "Kanjis of the name is required";
    setErrors(_errors);
    // form is valid if the erros object has no properties
    return Object.keys(_errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setModified(false);
    setSaving(true);
    saveName(name)
      .then(() => {
        toast.success("Name saved.");
        history.push("/names");
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
      meaningNumber: newMeaningNumber(name.meanings),
      meaning: "",
      version: 0,
    };
    setName({
      ...name,
      meanings: [...name.meanings, newMeaning],
    });
    setModified(true);
  }

  function handleMeaningChange(event, index) {
    event.preventDefault();
    const newMeaning = {
      id: name.meanings[index].id,
      meaningNumber: name.meanings[index].meaningNumber,
      meaning: event.target.value,
      version: name.meanings[index].version,
    };
    setName({
      ...name,
      meanings: name.meanings.map((meaning) => {
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
    const meanToDelete = name.meanings[index];
    setName({
      ...name,
      meanings: name.meanings.filter((meaning) => {
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
      pronunciationNumber: newPronunciationNumber(name.pronunciations),
      pronunciation: "",
      version: 0,
    };
    setName({
      ...name,
      pronunciations: [...name.pronunciations, newPronunciation],
    });
    setModified(true);
  }

  function handlePronunciationChange(event, index) {
    event.preventDefault();
    const newPronunciation = {
      id: name.pronunciations[index].id,
      pronunciationNumber: name.pronunciations[index].pronunciationNumber,
      pronunciation: event.target.value,
      version: name.pronunciations[index].version,
    };
    setName({
      ...name,
      pronunciations: name.pronunciations.map((pronunciation) => {
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
    const proToDelete = name.pronunciations[index];
    setName({
      ...name,
      pronunciations: name.pronunciations.filter((pronunciation) => {
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
      id: name.pronunciations[index].id,
      pronunciationNumber: name.pronunciations[index].pronunciationNumber,
      pronunciation: input.value,
      version: name.pronunciations[index].version,
    };
    setName({
      ...name,
      pronunciations: name.pronunciations.map((pronunciation) => {
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
      id: name.pronunciations[index].id,
      pronunciationNumber: name.pronunciations[index].pronunciationNumber,
      pronunciation: input.value,
      version: name.pronunciations[index].version,
    };
    setName({
      ...name,
      pronunciations: name.pronunciations.map((pronunciation) => {
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
      {names.length === 0 ? (
        <Spinner />
      ) : (
        <>
          <Prompt when={modified} message="Are you sure you want to leave ?" />
          <NameForm
            errors={errors}
            name={name}
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

ManageNamePage.propTypes = {
  name: PropTypes.object.isRequired,
  names: PropTypes.array.isRequired,
  loadNames: PropTypes.func.isRequired,
  saveName: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export function getNameByKanjis(names, kanjis) {
  return names.find((name) => name.kanjis === kanjis) || null;
}

function mapStateToProps(state, ownProps) {
  const kanjis = ownProps.match.params.kanjis;
  const name =
    kanjis && state.names.length > 0
      ? getNameByKanjis(state.names, kanjis)
      : newName;
  return {
    name,
    names: state.names,
  };
}

const mapDispatchToProps = {
  loadNames,
  saveName,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageNamePage);
