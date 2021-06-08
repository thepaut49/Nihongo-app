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
import * as manageEntityUtils from "../common/manageEntityUtils";

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

  function handleAddPronunciation(event) {
    manageEntityUtils.handleAddPronunciation(
      event,
      iAdjective,
      setIAdjective,
      setModified
    );
  }

  function handlePronunciationChange(event, index) {
    manageEntityUtils.handlePronunciationChange(
      event,
      index,
      iAdjective,
      setIAdjective,
      setModified
    );
  }

  function handleDeletePronunciation(event, index) {
    manageEntityUtils.handleDeletePronunciation(
      event,
      index,
      iAdjective,
      setIAdjective,
      setModified
    );
  }

  const onMiddlePointClick = (event, index) => {
    manageEntityUtils.onMiddlePointClick(
      event,
      index,
      iAdjective,
      setIAdjective,
      setModified
    );
  };

  const handleTranslateClick = (event, index) => {
    manageEntityUtils.handleTranslateClick(
      event,
      index,
      iAdjective,
      setIAdjective,
      setModified
    );
  };

  function handleAddMeaning(event) {
    manageEntityUtils.handleAddMeaning(
      event,
      iAdjective,
      setIAdjective,
      setModified
    );
  }

  function handleMeaningChange(event, index) {
    manageEntityUtils.handleMeaningChange(
      event,
      index,
      iAdjective,
      setIAdjective,
      setModified
    );
  }

  function handleDeleteMeaning(event, index) {
    manageEntityUtils.handleDeleteMeaning(
      event,
      index,
      iAdjective,
      setIAdjective,
      setModified
    );
  }

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
