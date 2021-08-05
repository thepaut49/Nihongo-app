import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as iAdjectiveActions from "../../redux/actions/iAdjectiveActions";
import "./IAdjectivesPage.css";
import IAdjectiveList from "./IAdjectiveList";
import { Link } from "react-router-dom";
import IAdjectiveCriteriaForm from "./IAdjectiveCriteriaForm";
import { translateRomajiToKana } from "../common/TranslateRomajiToKana";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import Spinner from "../common/spinner/Spinner";
import { toast } from "react-toastify";
import { isConnected } from "../../utils/userUtils";
import { filterIAdjectives } from "./filterIAdjectives";

function IAdjectivesPage(props) {
  const [iAdjectiveCriteria, setIAdjectiveCriteria] = useState({
    kanjisCriteria: "",
    pronunciationCriteria: "",
    meaningCriteria: "",
  });
  const [iAdjectivesList, setIAdjectivesList] = useState([]);

  useEffect(() => {
    const { iAdjectives, actions } = props;
    if (iAdjectives.length === 0) {
      actions
        .loadIAdjectives()
        .then(
          setIAdjectivesList(filterIAdjectives(iAdjectives, iAdjectiveCriteria))
        )
        .catch((error) => {
          alert("Loading iadjectives failed" + error);
        });
    } else {
      setIAdjectivesList(filterIAdjectives(iAdjectives, iAdjectiveCriteria));
    }
  }, []);
  // le second arg [] empeche de relancer en boucle l'appel à l'api

  // fonction for criteria form

  function handleChange(event) {
    let newValue = event.target.value;
    if (event.target.name === "pronunciationCriteria") {
      newValue = translateRomajiToKana(newValue);
      let input = document.getElementById("pronunciationCriteria");
      input.value = newValue;
    }
    setIAdjectiveCriteria({
      ...iAdjectiveCriteria,
      [event.target.name]: newValue,
    });
  }

  function handleReset(event) {
    event.preventDefault();
    // ne marche pas
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
    setIAdjectiveCriteria({
      kanjisCriteria: "",
      pronunciationCriteria: "",
      meaningCriteria: "",
    });
    setIAdjectivesList(filterIAdjectives(props.iAdjectives, null));
  }

  function handleClick(event) {
    let input = document.getElementById("pronunciationCriteria");
    input.value = input.value + event.target.innerText;
    setIAdjectiveCriteria({
      ...iAdjectiveCriteria,
      pronunciationCriteria:
        iAdjectiveCriteria.pronunciationCriteria + event.target.innerText,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setIAdjectivesList(
      filterIAdjectives(props.iAdjectives, iAdjectiveCriteria)
    );
  }

  const handleDeleteIAdjective = async (iAdjective) => {
    toast.success("IAdjective deleted");
    try {
      await props.actions.deleteIAdjective(iAdjective);
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  };

  return (
    <div className="iAdjectivesPage">
      <h2>I-Adjectives</h2>
      {props.loading ? (
        <Spinner />
      ) : (
        <>
          <IAdjectiveCriteriaForm
            iAdjectiveCriteria={iAdjectiveCriteria}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onClick={handleClick}
            onReset={handleReset}
          />
          {isConnected() && (
            <Link className="btn btn-primary" to="/iAdjective/create">
              Add IAdjective
            </Link>
          )}

          <IAdjectiveList
            iAdjectives={iAdjectivesList}
            deleteIAdjective={handleDeleteIAdjective}
          />
        </>
      )}
    </div>
  );
}

IAdjectivesPage.propTypes = {
  iAdjectives: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    iAdjectives: state.iAdjectives.map((iAdjective) => {
      return {
        ...iAdjective,
      };
    }),
    loading: state.apiCallsInProgress > 0,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadIAdjectives: bindActionCreators(
        iAdjectiveActions.loadIAdjectives,
        dispatch
      ),
      deleteIAdjective: bindActionCreators(
        iAdjectiveActions.deleteIAdjective,
        dispatch
      ),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(IAdjectivesPage);
