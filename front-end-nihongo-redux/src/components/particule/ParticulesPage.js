import React, { useState, useEffect } from "react";
import ParticuleList from "./ParticuleList";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as particuleActions from "../../redux/actions/particuleActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import Spinner from "../common/spinner/Spinner";
import { toast } from "react-toastify";
import { isConnected } from "../../utils/userUtils";
import ParticuleCriteriaForm from "./ParticuleCriteriaForm";
import { translateRomajiToKana } from "../common/TranslateRomajiToKana";

const ParticulesPage = (props) => {
  const [particuleCriteria, setParticuleCriteria] = useState({
    kanjisCriteria: "",
  });
  const [particulesList, setParticulesList] = useState([]);

  const filterParticules = (particules, particuleCriteria) => {
    const results = particules.filter((particule) =>
      particule.kanjis.includes(particuleCriteria.kanjisCriteria)
    );
    return results;
  };

  useEffect(() => {
    const { particules, actions } = props;
    if (particules.length === 0) {
      actions
        .loadParticules()
        .then(
          setParticulesList(filterParticules(particules, particuleCriteria))
        )
        .catch((error) => {
          alert("Loading particles failed" + error);
        });
    } else {
      setParticulesList(filterParticules(particules, particuleCriteria));
    }
  }, [props.particules.length, particulesList.length]);
  // le second arg [] empeche de relancer en boucle l'appel à l'api

  const handleDeleteParticule = async (particule) => {
    toast.success("Particule deleted");
    try {
      await props.actions.deleteParticule(particule);
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  };

  function handleChange(event) {
    let newValue = translateRomajiToKana(event.target.value);
    let input = document.getElementById("kanjisCriteria");
    input.value = newValue;
    setParticuleCriteria({
      ...particuleCriteria,
      [event.target.name]: newValue,
    });
  }

  function handleReset(event) {
    event.preventDefault();
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );

    setParticuleCriteria({
      kanjisCriteria: "",
    });
    setParticulesList(
      filterParticules(props.particules, {
        kanjisCriteria: "",
      })
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    setParticulesList(filterParticules(props.particules, particuleCriteria));
  }

  return (
    <section className="particulePage">
      <h2>Particules</h2>
      {props.loading ? (
        <Spinner />
      ) : (
        <>
          <ParticuleCriteriaForm
            particuleCriteria={particuleCriteria}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onReset={handleReset}
          />
          {isConnected() && (
            <Link className="btn btn-primary" to="/particule/create">
              Add Particule
            </Link>
          )}

          {particulesList && particulesList.length > 0 && (
            <ParticuleList
              particules={particulesList}
              deleteParticule={handleDeleteParticule}
            />
          )}
        </>
      )}
    </section>
  );
};

ParticulesPage.propTypes = {
  particules: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    particules: state.particules.map((particule) => {
      return {
        ...particule,
      };
    }),
    loading: state.apiCallsInProgress > 0,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadParticules: bindActionCreators(
        particuleActions.loadParticules,
        dispatch
      ),
      deleteParticule: bindActionCreators(
        particuleActions.deleteParticule,
        dispatch
      ),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ParticulesPage);
