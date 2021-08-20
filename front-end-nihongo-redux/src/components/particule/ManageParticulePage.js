import React, { useState, useEffect } from "react";
import ParticuleForm from "./ParticuleForm";
import { toast } from "react-toastify";
import { Prompt } from "react-router-dom";
import { connect } from "react-redux";
import {
  loadParticules,
  saveParticule,
} from "../../redux/actions/particuleActions";
import PropTypes from "prop-types";
import Spinner from "../common/spinner/Spinner";

const newParticule = {
  id: 0,
  kanjis: "",
  summary: "",
  htmlPage: "",
  version: 0,
};

const ManageParticulePage = ({
  particules,
  loadParticules,
  saveParticule,
  history,
  ...props
}) => {
  const [modified, setModified] = useState(false);
  const [errors, setErrors] = useState({});
  const [particule, setParticule] = useState({ ...props.particule });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (particules.length === 0) {
      loadParticules().catch((error) => {
        alert("Loading particules failed" + error);
      });
    } else {
      setParticule({ ...props.particule });
    }
  }, [props.particule]);

  function handleChange(event) {
    const { name, value } = event.target;
    setParticule((prevParticule) => ({
      ...prevParticule,
      [name]: value,
    }));
    setModified(true);
  }

  function formIsValid() {
    const _errors = {};
    if (!particule.kanjis)
      _errors.kanjis = "Kanjis of the particule is required";
    if (!particule.summary)
      _errors.summary = "Summary of the particule is required";
    if (!particule.htmlPage)
      _errors.htmlPage = "description of the particule is required";

    setErrors(_errors);
    // form is valid if the erros object has no properties
    return Object.keys(_errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setModified(false);
    setSaving(true);
    saveParticule(particule)
      .then(() => {
        toast.success("Particule saved.");
        history.push("/particules");
      })
      .catch((error) => {
        setSaving(false);
        setErrors({ onSubmit: error.message });
      });
  }

  return (
    <>
      {particules.length === 0 ? (
        <Spinner />
      ) : (
        <>
          <Prompt when={modified} message="Are you sure you want to leave ?" />
          <ParticuleForm
            errors={errors}
            particule={particule}
            onChange={handleChange}
            onSubmit={handleSubmit}
            saving={saving}
          />
        </>
      )}
    </>
  );
};

ManageParticulePage.propTypes = {
  particule: PropTypes.object.isRequired,
  particules: PropTypes.array.isRequired,
  loadParticules: PropTypes.func.isRequired,
  saveParticule: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export function getParticuleByKanjis(particules, kanjis) {
  return particules.find((particule) => particule.kanjis === kanjis) || null;
}

function mapStateToProps(state, ownProps) {
  const kanjis = ownProps.match.params.kanjis;
  const particule =
    kanjis && state.particules.length > 0
      ? getParticuleByKanjis(state.particules, kanjis)
      : newParticule;
  return {
    particule,
    particules: state.particules,
  };
}

const mapDispatchToProps = {
  loadParticules,
  saveParticule,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageParticulePage);
