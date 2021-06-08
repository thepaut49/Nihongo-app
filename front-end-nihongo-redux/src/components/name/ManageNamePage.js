import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { loadNames, saveName } from "../../redux/actions/nameActions";
import PropTypes from "prop-types";
import Spinner from "../common/spinner/Spinner";
import NameForm from "./NameForm";
import { toast } from "react-toastify";
import { Prompt } from "react-router-dom";
import * as manageEntityUtils from "../common/manageEntityUtils";

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

  function handleAddPronunciation(event) {
    manageEntityUtils.handleAddPronunciation(event, name, setName, setModified);
  }

  function handlePronunciationChange(event, index) {
    manageEntityUtils.handlePronunciationChange(
      event,
      index,
      name,
      setName,
      setModified
    );
  }

  function handleDeletePronunciation(event, index) {
    manageEntityUtils.handleDeletePronunciation(
      event,
      index,
      name,
      setName,
      setModified
    );
  }

  const onMiddlePointClick = (event, index) => {
    manageEntityUtils.onMiddlePointClick(
      event,
      index,
      name,
      setName,
      setModified
    );
  };

  const handleTranslateClick = (event, index) => {
    manageEntityUtils.handleTranslateClick(
      event,
      index,
      name,
      setName,
      setModified
    );
  };

  function handleAddMeaning(event) {
    manageEntityUtils.handleAddMeaning(event, name, setName, setModified);
  }

  function handleMeaningChange(event, index) {
    manageEntityUtils.handleMeaningChange(
      event,
      index,
      name,
      setName,
      setModified
    );
  }

  function handleDeleteMeaning(event, index) {
    manageEntityUtils.handleDeleteMeaning(
      event,
      index,
      name,
      setName,
      setModified
    );
  }

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
