import React, { useState, useEffect } from "react";
import Particule from "./Particule";
import { loadParticules } from "../../redux/actions/particuleActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/spinner/Spinner";

const newParticule = {
  id: 0,
  kanjis: "",
  summary: "",
  function: "",
  howToUse: "",
  examples: "",
  version: 0,
};

const VisualizeParticulePage = ({ particules, loadParticules, ...props }) => {
  const [particule, setParticule] = useState({ ...props.particule });

  useEffect(() => {
    if (particules.length === 0) {
      loadParticules().catch((error) => {
        alert("Loading particules failed" + error);
      });
    } else {
      setParticule({ ...props.particule });
    }
  }, [props.particule]);

  return (
    <>
      {" "}
      {particules.length === 0 ? (
        <Spinner />
      ) : (
        <>{particule && <Particule particule={particule} />}</>
      )}
    </>
  );
};

VisualizeParticulePage.propTypes = {
  particule: PropTypes.object.isRequired,
  particules: PropTypes.array.isRequired,
  loadParticules: PropTypes.func.isRequired,
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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VisualizeParticulePage);
