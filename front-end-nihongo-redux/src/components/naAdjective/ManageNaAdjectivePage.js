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
import * as manageEntityUtils from "../common/manageEntityUtils";

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

  function handleAddPronunciation(event) {
    manageEntityUtils.handleAddPronunciation(
      event,
      naAdjective,
      setNaAdjective,
      setModified
    );
  }

  function handlePronunciationChange(event, index) {
    manageEntityUtils.handlePronunciationChange(
      event,
      index,
      naAdjective,
      setNaAdjective,
      setModified
    );
  }

  function handleDeletePronunciation(event, index) {
    manageEntityUtils.handleDeletePronunciation(
      event,
      index,
      naAdjective,
      setNaAdjective,
      setModified
    );
  }

  const onMiddlePointClick = (event, index) => {
    manageEntityUtils.onMiddlePointClick(
      event,
      index,
      naAdjective,
      setNaAdjective,
      setModified
    );
  };

  const handleTranslateClick = (event, index) => {
    manageEntityUtils.handleTranslateClick(
      event,
      index,
      naAdjective,
      setNaAdjective,
      setModified
    );
  };

  function handleAddMeaning(event) {
    manageEntityUtils.handleAddMeaning(
      event,
      naAdjective,
      setNaAdjective,
      setModified
    );
  }

  function handleMeaningChange(event, index) {
    manageEntityUtils.handleMeaningChange(
      event,
      index,
      naAdjective,
      setNaAdjective,
      setModified
    );
  }

  function handleDeleteMeaning(event, index) {
    manageEntityUtils.handleDeleteMeaning(
      event,
      index,
      naAdjective,
      setNaAdjective,
      setModified
    );
  }

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
