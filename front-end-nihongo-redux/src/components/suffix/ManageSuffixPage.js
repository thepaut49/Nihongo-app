import React, { useState, useEffect } from "react";
import SuffixForm from "./SuffixForm";
import { toast } from "react-toastify";
import { Prompt } from "react-router-dom";
import { translateRomajiToKana } from "../common/TranslateRomajiToKana";
import { newPronunciationNumber } from "../common/meaningUtils";
import { connect } from "react-redux";
import { loadSuffixs, saveSuffix } from "../../redux/actions/suffixActions";
import PropTypes from "prop-types";
import Spinner from "../common/spinner/Spinner";

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
    event.preventDefault();
    const newPronunciation = {
      id: null,
      pronunciationNumber: newPronunciationNumber(suffix.pronunciations),
      pronunciation: "",
      version: 0,
    };
    setSuffix({
      ...suffix,
      pronunciations: [...suffix.pronunciations, newPronunciation],
    });
    setModified(true);
  }

  function handlePronunciationChange(event, index) {
    event.preventDefault();
    const newPronunciation = {
      id: suffix.pronunciations[index].id,
      pronunciationNumber: suffix.pronunciations[index].pronunciationNumber,
      pronunciation: event.target.value,
      version: suffix.pronunciations[index].version,
    };
    setSuffix({
      ...suffix,
      pronunciations: suffix.pronunciations.map((pronunciation) => {
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
    const proToDelete = suffix.pronunciations[index];
    setSuffix({
      ...suffix,
      pronunciations: suffix.pronunciations.filter((pronunciation) => {
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
      id: suffix.pronunciations[index].id,
      pronunciationNumber: suffix.pronunciations[index].pronunciationNumber,
      pronunciation: input.value,
      version: suffix.pronunciations[index].version,
    };
    setSuffix({
      ...suffix,
      pronunciations: suffix.pronunciations.map((pronunciation) => {
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
      id: suffix.pronunciations[index].id,
      pronunciationNumber: suffix.pronunciations[index].pronunciationNumber,
      pronunciation: input.value,
      version: suffix.pronunciations[index].version,
    };
    setSuffix({
      ...suffix,
      pronunciations: suffix.pronunciations.map((pronunciation) => {
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
