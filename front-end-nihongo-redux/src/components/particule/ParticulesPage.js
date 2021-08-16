import React, { useEffect } from "react";
import ParticuleList from "./ParticuleList";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as particuleActions from "../../redux/actions/particuleActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import Spinner from "../common/spinner/Spinner";
import { toast } from "react-toastify";
import { isConnected } from "../../utils/userUtils";

const ParticulesPage = (props) => {
  useEffect(() => {
    const { particules, actions } = props;
    if (particules.length === 0) {
      actions.loadParticules().catch((error) => {
        alert("Loading iadjectives failed" + error);
      });
    }
  }, []);
  // le second arg [] empeche de relancer en boucle l'appel à l'api

  const handleDeleteParticule = async (particule) => {
    toast.success("Particule deleted");
    try {
      await props.actions.deleteParticule(particule);
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  };

  return (
    <section className="pageSection">
      <h2>Particules</h2>
      {props.loading ? (
        <Spinner />
      ) : (
        <>
          {isConnected() && (
            <Link className="btn btn-primary" to="/particule/create">
              Add Particule
            </Link>
          )}

          {props.particules && props.particules.length > 0 && (
            <ParticuleList
              particules={props.particules}
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
