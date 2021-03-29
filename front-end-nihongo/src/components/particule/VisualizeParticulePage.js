import React, { useState, useEffect } from "react";
import Particule from "./Particule";
import particuleStore from "../../stores/particuleStore";
import { loadParticules } from "../../actions/particuleActions";

const VisualizeParticulePage = (props) => {
  const particule = particuleStore.getParticuleByKanjis(
    props.match.params.kanjis
  );
  const [particules, setParticules] = useState(particuleStore.getParticules());

  useEffect(() => {
    particuleStore.addChangeListener(onChangeParticules);

    if (particuleStore.getParticules().length === 0) loadParticules();

    return function () {
      particuleStore.removeChangeListener(onChangeParticules);
    };
  }, [particule, particules.length]);

  function onChangeParticules() {
    setParticules(particuleStore.getParticules());
  }

  return <>{particule && <Particule particule={particule} />}</>;
};

export default VisualizeParticulePage;
