import React, { useState, useEffect } from "react";
import SuffixForm from "./SuffixForm";
import { toast } from "react-toastify";
import { Prompt } from "react-router-dom";
import { connect } from "react-redux";
import { loadSuffixs, saveSuffix } from "../../redux/actions/suffixActions";
import PropTypes from "prop-types";
import Spinner from "../common/spinner/Spinner";
import * as manageEntityUtils from "../common/manageEntityUtils";

const newSuffix = {
  id: null,
  kanjis: "",
  pronunciations: [
    {
      id: null,
      pronunciation: "",
      pronunciationNumber: 0,
      version: 0,
    },
  ],
  use: "",
  summary: "",
  version: null,
};

const ManageSuffixPage = ({
  suffixs,
  loadSuffixs,
  saveSuffix,
  history,
  ...props
}) => {
  const [modified, setModified] = useState(false);
  const [errors, setErrors] = useState({});
  const [suffix, setSuffix] = useState({ ...props.suffix });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (suffixs.length === 0) {
      loadSuffixs().catch((error) => {
        alert("Loading suffixs failed" + error);
      });
    } else {
      setSuffix({ ...props.suffix });
    }
  }, [props.suffix]);

  function handleChange(event) {
    const { name, value } = event.target;
    setSuffix((prevSuffix) => ({
      ...prevSuffix,
      [name]: value,
    }));
    setModified(true);
  }

  function formIsValid() {
    const _errors = {};
    if (!suffix.kanjis) _errors.kanjis = "Kanjis of the suffix is required";
    if (!suffix.pronunciations)
      _errors.pronunciations = "Pronunciation is required";
    if (!suffix.use) _errors.use = "Use is required";
    if (!suffix.summary) _errors.summary = "Summary is required";
    setErrors(_errors);
    // form is valid if the erros object has no properties
    return Object.keys(_errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setModified(false);
    setSaving(true);
    saveSuffix(suffix)
      .then(() => {
        toast.success("Suffix saved.");
        history.push("/suffixs");
      })
      .catch((error) => {
        setSaving(false);
        setErrors({ onSubmit: error.message });
      });
  }

  function handleAddPronunciation(event) {
    manageEntityUtils.handleAddPronunciation(
      event,
      suffix,
      setSuffix,
      setModified
    );
  }

  function handlePronunciationChange(event, index) {
    manageEntityUtils.handlePronunciationChange(
      event,
      index,
      suffix,
      setSuffix,
      setModified
    );
  }

  function handleDeletePronunciation(event, index) {
    manageEntityUtils.handleDeletePronunciation(
      event,
      index,
      suffix,
      setSuffix,
      setModified
    );
  }

  const onMiddlePointClick = (event, index) => {
    manageEntityUtils.onMiddlePointClick(
      event,
      index,
      suffix,
      setSuffix,
      setModified
    );
  };

  const handleTranslateClick = (event, index) => {
    manageEntityUtils.handleTranslateClick(
      event,
      index,
      suffix,
      setSuffix,
      setModified
    );
  };

  return (
    <>
      {suffixs.length === 0 ? (
        <Spinner />
      ) : (
        <>
          <Prompt when={modified} message="Are you sure you want to leave ?" />
          <SuffixForm
            errors={errors}
            suffix={suffix}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onMiddlePointClick={onMiddlePointClick}
            onTranslateClick={handleTranslateClick}
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

ManageSuffixPage.propTypes = {
  suffix: PropTypes.object.isRequired,
  suffixs: PropTypes.array.isRequired,
  loadSuffixs: PropTypes.func.isRequired,
  saveSuffix: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export function getSuffixByKanjis(suffixs, kanjis) {
  return suffixs.find((suffix) => suffix.kanjis === kanjis) || null;
}

function mapStateToProps(state, ownProps) {
  const kanjis = ownProps.match.params.kanjis;
  const suffix =
    kanjis && state.suffixs.length > 0
      ? getSuffixByKanjis(state.suffixs, kanjis)
      : newSuffix;
  return {
    suffix,
    suffixs: state.suffixs,
  };
}

const mapDispatchToProps = {
  loadSuffixs,
  saveSuffix,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSuffixPage);
